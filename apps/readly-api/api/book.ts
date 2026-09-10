import { sql } from '@vercel/postgres';
import express from 'express';
import { optionalAuth, requireAuth } from '../middleware/auth';
import { ApiError } from '../utils/api-error';
import { asyncHandler } from '../utils/async-handler';
import { searchBookList } from '../utils/book';
import { isExistRows } from '../utils/sql';
import {
  parseCategoryKeyword,
  parseEnum,
  parseInteger,
  parseOptionalText,
  parseSearchText,
} from '../utils/validation';

const bookRouter = express.Router();

const summaryOrderValues = ['desc', 'asc', 'view', 'like'] as const;
const summarySearchTypeValues = ['title', 'author', 'category'] as const;

const orderByQueries: Record<(typeof summaryOrderValues)[number], string> = {
  desc: 'ORDER BY summaries.created_at DESC, summaries.id DESC',
  asc: 'ORDER BY summaries.created_at ASC, summaries.id ASC',
  view: 'ORDER BY summaries.view_count DESC, summaries.id DESC',
  like: 'ORDER BY COALESCE(like_counts.like_count, 0) DESC, summaries.id DESC',
};

const searchWhereQueries: Record<
  (typeof summarySearchTypeValues)[number],
  string
> = {
  title: `WHERE summaries.book_title ILIKE '%' || $1::TEXT || '%'`,
  author: `WHERE summaries.book_author ILIKE '%' || $1::TEXT || '%'`,
  category:
    'WHERE book_category.name = ANY(SELECT jsonb_array_elements_text($1::JSONB))',
};

const parseRequiredBodyText = (
  value: unknown,
  field: string,
  maxLength: number,
) => {
  if (typeof value !== 'string') {
    throw new ApiError(400, 'INVALID_BODY', `${field} must be a string.`);
  }

  const parsedValue = value.trim();
  if (!parsedValue || parsedValue.length > maxLength) {
    throw new ApiError(
      400,
      'INVALID_BODY',
      `${field} must contain between 1 and ${maxLength} characters.`,
    );
  }

  return parsedValue;
};

const parseBookInfo = (value: unknown) => {
  if (!value || typeof value !== 'object') {
    throw new ApiError(400, 'INVALID_BODY', 'bookInfo is required.');
  }

  const bookInfo = value as Record<string, unknown>;
  return {
    title: parseRequiredBodyText(bookInfo.title, 'bookInfo.title', 300),
    author: parseRequiredBodyText(bookInfo.author, 'bookInfo.author', 300),
    publisher: parseRequiredBodyText(
      bookInfo.publisher,
      'bookInfo.publisher',
      200,
    ),
    pubdate: parseRequiredBodyText(bookInfo.pubdate, 'bookInfo.pubdate', 30),
    image: parseRequiredBodyText(bookInfo.image, 'bookInfo.image', 2048),
    link: parseRequiredBodyText(bookInfo.link, 'bookInfo.link', 2048),
    isbn: parseRequiredBodyText(bookInfo.isbn, 'bookInfo.isbn', 32),
  };
};

bookRouter.post(
  '/search',
  asyncHandler(async (req, res) => {
    const query = parseRequiredBodyText(req.body?.query, 'query', 100);
    const display = parseInteger(req.body?.display, 'display', {
      defaultValue: 10,
      min: 1,
      max: 100,
    });
    const start = parseInteger(req.body?.start, 'start', {
      defaultValue: 1,
      min: 1,
      max: 1000,
    });
    const sort = parseEnum(req.body?.sort, 'sort', ['sim', 'date'], 'sim');
    const searchResult = await searchBookList({
      query,
      display: String(display),
      start: String(start),
      sort,
    });

    res.json(searchResult);
  }),
);

bookRouter.get(
  '/recent',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { rows } = await sql`
      SELECT *
      FROM (
        SELECT DISTINCT ON (isbn)
          book_title,
          book_author,
          book_publisher,
          book_pubdate,
          book_image,
          book_link,
          isbn,
          created_at
        FROM summaries
        WHERE user_id = ${req.userId}
      ) recent_summaries
      ORDER BY created_at DESC
      LIMIT 3;
    `;

    res.json(rows);
  }),
);

bookRouter.get(
  '/created-rank',
  asyncHandler(async (_req, res) => {
    const { rows } = await sql`
      SELECT
        MAX(book_title) AS book_title,
        MAX(book_author) AS book_author,
        MAX(book_publisher) AS book_publisher,
        MAX(book_pubdate) AS book_pubdate,
        MAX(book_image) AS book_image,
        MAX(book_link) AS book_link,
        isbn,
        COUNT(*) AS created_count
      FROM summaries
      GROUP BY isbn
      ORDER BY created_count DESC
      LIMIT 3;
    `;

    res.json(rows);
  }),
);

bookRouter.post(
  '/summary/create',
  requireAuth,
  asyncHandler(async (req, res) => {
    const content = parseRequiredBodyText(
      req.body?.content,
      'content',
      100_000,
    );
    const categoryId = parseInteger(req.body?.category_id, 'category_id', {
      min: 1,
      max: 2_147_483_647,
    });
    const bookInfo = parseBookInfo(req.body?.bookInfo);
    const startPage = parseInteger(req.body?.startPage, 'startPage', {
      min: 1,
      max: 1_000_000,
      optional: true,
    });
    const endPage = parseInteger(req.body?.endPage, 'endPage', {
      min: 1,
      max: 1_000_000,
      optional: true,
    });

    if (startPage && endPage && startPage > endPage) {
      throw new ApiError(
        400,
        'INVALID_BODY',
        'startPage cannot be greater than endPage.',
      );
    }

    const { rows } = await sql`
      SELECT nickname, profile_image
      FROM users
      WHERE id = ${req.userId};
    `;
    const user = rows[0];

    if (!user) {
      throw new ApiError(404, 'USER_NOT_FOUND', 'User does not exist.');
    }

    await sql`
      INSERT INTO summaries (
        contents,
        book_title,
        book_author,
        book_publisher,
        book_pubdate,
        book_image,
        book_link,
        isbn,
        user_id,
        user_name,
        user_image,
        start_page,
        end_page,
        category_id
      )
      VALUES (
        ${content},
        ${bookInfo.title},
        ${bookInfo.author},
        ${bookInfo.publisher},
        ${bookInfo.pubdate},
        ${bookInfo.image},
        ${bookInfo.link},
        ${bookInfo.isbn},
        ${req.userId},
        ${user.nickname},
        ${user.profile_image},
        ${startPage},
        ${endPage},
        ${categoryId}
      );
    `;

    res.status(201).json({ message: 'Summary created.' });
  }),
);

bookRouter.get(
  '/summary',
  optionalAuth,
  asyncHandler(async (req, res) => {
    const id = parseInteger(req.query.id, 'id', {
      min: 1,
      max: 2_147_483_647,
    });

    await sql`
      UPDATE summaries
      SET view_count = view_count + 1
      WHERE id = ${id};
    `;

    const { rows } = await sql`
      SELECT
        summaries.*,
        book_category.name AS category_name,
        users.nickname AS user_name,
        users.profile_image AS user_image
      FROM summaries
      LEFT JOIN users ON summaries.user_id = users.id
      LEFT JOIN book_category ON summaries.category_id = book_category.id
      WHERE summaries.id = ${id};
    `;
    const summary = rows[0];

    if (!summary) {
      throw new ApiError(404, 'SUMMARY_NOT_FOUND', 'Summary does not exist.');
    }

    res.json({ ...summary, is_my: summary.user_id === req.userId });
  }),
);

bookRouter.put(
  '/summary/edit',
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = parseInteger(req.body?.id, 'id', {
      min: 1,
      max: 2_147_483_647,
    });
    const content = parseRequiredBodyText(
      req.body?.content,
      'content',
      100_000,
    );
    const categoryId = parseInteger(req.body?.category_id, 'category_id', {
      min: 1,
      max: 2_147_483_647,
    });
    const bookInfo = parseBookInfo(req.body?.bookInfo);
    const startPage = parseInteger(req.body?.startPage, 'startPage', {
      min: 1,
      max: 1_000_000,
      optional: true,
    });
    const endPage = parseInteger(req.body?.endPage, 'endPage', {
      min: 1,
      max: 1_000_000,
      optional: true,
    });

    if (startPage && endPage && startPage > endPage) {
      throw new ApiError(
        400,
        'INVALID_BODY',
        'startPage cannot be greater than endPage.',
      );
    }

    const { rows } = await sql`
      UPDATE summaries
      SET
        contents = ${content},
        book_title = ${bookInfo.title},
        book_author = ${bookInfo.author},
        book_publisher = ${bookInfo.publisher},
        book_pubdate = ${bookInfo.pubdate},
        book_image = ${bookInfo.image},
        book_link = ${bookInfo.link},
        isbn = ${bookInfo.isbn},
        start_page = ${startPage},
        end_page = ${endPage},
        category_id = ${categoryId}
      WHERE id = ${id} AND user_id = ${req.userId}
      RETURNING id;
    `;

    if (!rows[0]) {
      throw new ApiError(
        404,
        'SUMMARY_NOT_FOUND',
        'Summary does not exist or is not owned by the current user.',
      );
    }

    res.json({ message: 'Summary updated.' });
  }),
);

bookRouter.delete(
  '/summary/delete',
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = parseInteger(req.query.id, 'id', {
      min: 1,
      max: 2_147_483_647,
    });
    const { rows } = await sql`
      DELETE FROM summaries
      WHERE id = ${id} AND user_id = ${req.userId}
      RETURNING id;
    `;

    if (!rows[0]) {
      throw new ApiError(
        404,
        'SUMMARY_NOT_FOUND',
        'Summary does not exist or is not owned by the current user.',
      );
    }

    res.status(204).send();
  }),
);

bookRouter.get(
  '/summary/list',
  asyncHandler(async (req, res) => {
    const categoryId = parseInteger(req.query.category_id, 'category_id', {
      min: 1,
      max: 2_147_483_647,
      optional: true,
    });
    const userId = parseOptionalText(req.query.user_id, 'user_id');
    const order = parseEnum(
      req.query.order,
      'order',
      summaryOrderValues,
      'desc',
    );
    const limit = parseInteger(req.query.limit, 'limit', {
      defaultValue: 16,
      min: 1,
      max: 50,
    });
    const offset = parseInteger(req.query.offset, 'offset', {
      defaultValue: 0,
      min: 0,
      max: 1_000_000,
    });

    const listQuery = `
      WITH comment_counts AS (
        SELECT summary_id, COUNT(*) AS comment_count
        FROM summary_comment
        GROUP BY summary_id
      ),
      like_counts AS (
        SELECT summary_id, COUNT(*) AS like_count
        FROM summary_like_count
        GROUP BY summary_id
      )
      SELECT
        summaries.*,
        book_category.name AS category_name,
        users.nickname AS user_name,
        users.profile_image AS user_image,
        COALESCE(comment_counts.comment_count, 0) AS comment_count,
        COALESCE(like_counts.like_count, 0) AS like_count
      FROM summaries
      LEFT JOIN users ON summaries.user_id = users.id
      LEFT JOIN book_category ON summaries.category_id = book_category.id
      LEFT JOIN comment_counts ON summaries.id = comment_counts.summary_id
      LEFT JOIN like_counts ON summaries.id = like_counts.summary_id
      WHERE (summaries.category_id = $1::INTEGER OR $1::INTEGER IS NULL)
        AND (summaries.user_id = $2::TEXT OR $2::TEXT IS NULL)
      GROUP BY
        summaries.id,
        book_category.name,
        users.nickname,
        users.profile_image,
        comment_counts.comment_count,
        like_counts.like_count
      ${orderByQueries[order]}
      LIMIT $3::INTEGER
      OFFSET $4::INTEGER;
    `;

    const countQuery = `
      SELECT COUNT(*)
      FROM summaries
      WHERE (category_id = $1::INTEGER OR $1::INTEGER IS NULL)
        AND (user_id = $2::TEXT OR $2::TEXT IS NULL);
    `;

    const [{ rows }, { rows: totalRows }] = await Promise.all([
      sql.query(listQuery, [categoryId, userId, limit, offset]),
      sql.query<{ count: string }>(countQuery, [categoryId, userId]),
    ]);
    const total = Number(totalRows[0]?.count ?? 0);
    const nextOffset =
      offset + rows.length < total ? offset + rows.length : null;

    res.json({ total, list: rows, nextOffset });
  }),
);

bookRouter.get(
  '/summary/search',
  asyncHandler(async (req, res) => {
    const type = parseEnum(
      req.query.type,
      'type',
      summarySearchTypeValues,
      'title',
    );
    const keyword =
      type === 'category'
        ? parseCategoryKeyword(req.query.keyword)
        : parseSearchText(req.query.keyword);
    const limit = parseInteger(req.query.limit, 'limit', {
      defaultValue: 16,
      min: 1,
      max: 50,
    });
    const offset = parseInteger(req.query.offset, 'offset', {
      defaultValue: 0,
      min: 0,
      max: 1_000_000,
    });
    const whereQuery = searchWhereQueries[type];

    const listQuery = `
      WITH comment_counts AS (
        SELECT summary_id, COUNT(*) AS comment_count
        FROM summary_comment
        GROUP BY summary_id
      ),
      like_counts AS (
        SELECT summary_id, COUNT(*) AS like_count
        FROM summary_like_count
        GROUP BY summary_id
      )
      SELECT
        summaries.*,
        book_category.name AS category_name,
        users.nickname AS user_name,
        users.profile_image AS user_image,
        COALESCE(comment_counts.comment_count, 0) AS comment_count,
        COALESCE(like_counts.like_count, 0) AS like_count
      FROM summaries
      LEFT JOIN users ON summaries.user_id = users.id
      LEFT JOIN book_category ON summaries.category_id = book_category.id
      LEFT JOIN comment_counts ON summaries.id = comment_counts.summary_id
      LEFT JOIN like_counts ON summaries.id = like_counts.summary_id
      ${whereQuery}
      GROUP BY
        summaries.id,
        book_category.name,
        users.nickname,
        users.profile_image,
        comment_counts.comment_count,
        like_counts.like_count
      ORDER BY summaries.created_at DESC, summaries.id DESC
      LIMIT $2::INTEGER
      OFFSET $3::INTEGER;
    `;

    const countQuery = `
      SELECT COUNT(*)
      FROM summaries
      LEFT JOIN book_category ON summaries.category_id = book_category.id
      ${whereQuery};
    `;

    const [{ rows }, { rows: totalRows }] = await Promise.all([
      sql.query(listQuery, [keyword, limit, offset]),
      sql.query<{ count: string }>(countQuery, [keyword]),
    ]);
    const total = Number(totalRows[0]?.count ?? 0);
    const nextOffset =
      offset + rows.length < total ? offset + rows.length : null;

    res.json({ total, list: rows, nextOffset });
  }),
);

bookRouter.get(
  '/summary/like-count',
  optionalAuth,
  asyncHandler(async (req, res) => {
    const id = parseInteger(req.query.id, 'id', {
      min: 1,
      max: 2_147_483_647,
    });
    const { rowCount } = await sql`
      SELECT summary_id
      FROM summary_like_count
      WHERE summary_id = ${id};
    `;
    const userId = req.userId ?? req.ip;
    const { rows } = await sql`
      SELECT EXISTS (
        SELECT 1
        FROM summary_like_count
        WHERE summary_id = ${id} AND user_id = ${userId}
      );
    `;

    res.json({ like_count: rowCount ?? 0, is_clicked: isExistRows(rows) });
  }),
);

bookRouter.post(
  '/summary/click-like',
  optionalAuth,
  asyncHandler(async (req, res) => {
    const id = parseInteger(req.body?.id, 'id', {
      min: 1,
      max: 2_147_483_647,
    });
    const userId = req.userId ?? req.ip;
    const { rows } = await sql`
      SELECT EXISTS (
        SELECT 1
        FROM summary_like_count
        WHERE summary_id = ${id} AND user_id = ${userId}
      );
    `;

    if (isExistRows(rows)) {
      await sql`
        DELETE FROM summary_like_count
        WHERE summary_id = ${id} AND user_id = ${userId};
      `;
      res.json({ isClicked: false });
      return;
    }

    await sql`
      INSERT INTO summary_like_count (summary_id, user_id)
      VALUES (${id}, ${userId});
    `;
    res.status(201).json({ isClicked: true });
  }),
);

bookRouter.get(
  '/category-list',
  asyncHandler(async (_req, res) => {
    const { rows } = await sql`
      SELECT
        book_category.id,
        book_category.name,
        COUNT(summaries.id) AS summary_count
      FROM book_category
      LEFT JOIN summaries ON book_category.id = summaries.category_id
      GROUP BY book_category.id, book_category.name
      ORDER BY summary_count DESC;
    `;

    res.json(rows);
  }),
);

export default bookRouter;
