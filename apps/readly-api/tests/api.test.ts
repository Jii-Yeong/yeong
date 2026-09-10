import type { Server } from 'node:http';
import jwt from 'jsonwebtoken';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

const databaseMocks = vi.hoisted(() => {
  const sql = Object.assign(vi.fn(), { query: vi.fn() });
  return { sql };
});

vi.mock('@vercel/postgres', () => ({ sql: databaseMocks.sql }));

let server: Server;
let apiUrl: string;

beforeAll(async () => {
  process.env.CLIENT_URL = 'https://readly.example.com';
  process.env.JWT_SECRET_KEY = 'test-secret-that-is-not-used-in-production';

  const { app } = await import('../api/index');
  await new Promise<void>((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Failed to start the test server.');
  }
  apiUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

afterEach(() => {
  databaseMocks.sql.mockReset();
  databaseMocks.sql.query.mockReset();
});

describe('Readly API safeguards', () => {
  it('exposes a health check', async () => {
    const response = await fetch(`${apiUrl}/health`);
    const body = (await response.json()) as { status: string };

    expect(response.status).toBe(200);
    expect(body.status).toBe('ok');
    expect(response.headers.get('x-request-id')).toBeTruthy();
  });

  it('answers CORS preflight for the configured client', async () => {
    const response = await fetch(`${apiUrl}/user/my-info`, {
      method: 'OPTIONS',
      headers: {
        origin: 'https://readly.example.com',
        'access-control-request-method': 'GET',
        'access-control-request-headers': 'authorization,content-type',
      },
    });

    expect(response.status).toBe(204);
    expect(response.headers.get('access-control-allow-origin')).toBe(
      'https://readly.example.com',
    );
  });

  it('rejects summary deletion without server-verified authentication', async () => {
    const response = await fetch(`${apiUrl}/book/summary/delete?id=1`, {
      method: 'DELETE',
    });
    const body = (await response.json()) as { error: { code: string } };

    expect(response.status).toBe(401);
    expect(body.error.code).toBe('UNAUTHORIZED');
  });

  it('rejects comment deletion without server-verified authentication', async () => {
    const response = await fetch(`${apiUrl}/comment/delete?id=1`, {
      method: 'DELETE',
    });
    const body = (await response.json()) as { error: { code: string } };

    expect(response.status).toBe(401);
    expect(body.error.code).toBe('UNAUTHORIZED');
  });

  it('scopes summary deletion to the authenticated owner', async () => {
    databaseMocks.sql.mockResolvedValueOnce({ rows: [], rowCount: 0 });
    const token = jwt.sign(
      { id: 'owner-id' },
      process.env.JWT_SECRET_KEY as string,
    );
    const response = await fetch(`${apiUrl}/book/summary/delete?id=7`, {
      method: 'DELETE',
      headers: { authorization: `Bearer ${token}` },
    });

    expect(response.status).toBe(404);
    expect(databaseMocks.sql).toHaveBeenCalledOnce();
    expect(databaseMocks.sql.mock.calls[0]?.slice(1)).toEqual([7, 'owner-id']);
  });

  it('scopes summary editing to the authenticated owner', async () => {
    databaseMocks.sql.mockResolvedValueOnce({ rows: [], rowCount: 0 });
    const token = jwt.sign(
      { id: 'owner-id' },
      process.env.JWT_SECRET_KEY as string,
    );
    const response = await fetch(`${apiUrl}/book/summary/edit`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: 7,
        content: 'updated summary',
        category_id: 3,
        startPage: 1,
        endPage: 2,
        bookInfo: {
          title: 'title',
          author: 'author',
          publisher: 'publisher',
          pubdate: '20260910',
          image: 'https://example.com/book.jpg',
          link: 'https://example.com/book',
          isbn: '1234567890',
        },
      }),
    });

    expect(response.status).toBe(404);
    expect(databaseMocks.sql).toHaveBeenCalledOnce();
    expect(databaseMocks.sql.mock.calls[0]?.slice(-2)).toEqual([7, 'owner-id']);
  });

  it('scopes comment deletion to the authenticated owner', async () => {
    databaseMocks.sql.mockResolvedValueOnce({ rows: [], rowCount: 0 });
    const token = jwt.sign(
      { id: 'owner-id' },
      process.env.JWT_SECRET_KEY as string,
    );
    const response = await fetch(`${apiUrl}/comment/delete?id=9`, {
      method: 'DELETE',
      headers: { authorization: `Bearer ${token}` },
    });

    expect(response.status).toBe(404);
    expect(databaseMocks.sql).toHaveBeenCalledOnce();
    expect(databaseMocks.sql.mock.calls[0]?.slice(1)).toEqual([9, 'owner-id']);
  });

  it('passes validated pagination values as query parameters', async () => {
    databaseMocks.sql.query
      .mockResolvedValueOnce({ rows: [], rowCount: 0 })
      .mockResolvedValueOnce({ rows: [{ count: '0' }], rowCount: 1 });
    const response = await fetch(
      `${apiUrl}/book/summary/list?category_id=3&limit=20&offset=40&order=view`,
    );

    expect(response.status).toBe(200);
    expect(databaseMocks.sql.query.mock.calls[0]?.[1]).toEqual([
      3,
      null,
      20,
      40,
    ]);
    expect(databaseMocks.sql.query.mock.calls[1]?.[1]).toEqual([3, null]);
  });

  it.each([
    '/book/summary/list?limit=0',
    '/book/summary/list?limit=51',
    '/book/summary/list?offset=-1',
    '/book/summary/list?category_id=not-a-number',
    '/book/summary/list?order=unknown',
  ])(
    'rejects invalid list input before querying the database: %s',
    async (path) => {
      const response = await fetch(`${apiUrl}${path}`);
      const body = (await response.json()) as { error: { code: string } };

      expect(response.status).toBe(400);
      expect(body.error.code).toBe('INVALID_QUERY');
    },
  );
});
