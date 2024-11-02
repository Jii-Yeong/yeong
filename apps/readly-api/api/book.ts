import { sql } from '@vercel/postgres';
import express, { Request, Response } from 'express';
import { decodeJwtToken } from '../utils/auth';
import { searchBookList } from '../utils/book';
import { isExistRows } from '../utils/sql';

const bookRouter = express.Router();

bookRouter.post('/search', async (req: Request, res: Response) => {
  const query = req.body?.query || '';
  const display = req.body?.display || 10;
  const start = req.body?.start || 1;
  const sort = req.body?.sort || 'sim';
  const searchResult = await searchBookList({ query, display, start, sort });

  res.json(searchResult);
});

bookRouter.post('/summary/create', async (req: Request, res: Response) => {
  const userToken = req.headers['authorization']?.split(' ')[1];

  if (!userToken) {
    res.status(401).send('You entered via the wrong route.');
    return;
  }

  const decodedInfo = decodeJwtToken(userToken);

  const content = req.body?.content;
  const bookInfo = req.body?.bookInfo;
  const startPage = req.body?.startPage;
  const endPage = req.body?.endPage;

  if (!content || !bookInfo) {
    res.status(401).send('A required parameter is missing.');
    return;
  }

  const { rows } = await sql`
  SELECT nickname, profile_image 
  FROM users 
  WHERE id = ${decodedInfo.id};`;

  const row = rows[0];

  if (!row) {
    res.status(401).send('There is no user information.');
    return;
  }

  await sql`
  INSERT INTO summaries (contents, book_title, book_author, book_publisher, book_pubdate, book_image, book_link, user_id, user_name, user_image, start_page, end_page)
  VALUES (
    ${content},
    ${bookInfo.title},
    ${bookInfo.author},
    ${bookInfo.publisher},
    ${bookInfo.pubdate},
    ${bookInfo.image},
    ${bookInfo.link},
    ${decodedInfo.id},
    ${row.nickname},
    ${row.profile_image},
    ${startPage},
    ${endPage}
    );`;

  res.send('success created');
});

bookRouter.get('/summary', async (req: Request, res: Response) => {
  const id = req.query?.id;

  if (!id) {
    res.status(401).send('A required parameter is missing.');
    return;
  }

  await sql`
  UPDATE summaries
  SET view_count = view_count + 1
  WHERE id = ${String(id)};`;

  const { rows } = await sql`
  SELECT * 
  FROM summaries 
  WHERE id = ${String(id)};`;

  const row = rows[0];

  if (!row) {
    res.status(401).send('Summary does not exist.');
    return;
  }

  res.json(row);
});

bookRouter.delete('/summary/delete', async (req: Request, res: Response) => {
  const id = req.body?.id;

  if (!id) {
    res.status(401).send('A required parameter is missing.');
  }

  const { rowCount } = await sql`
  DELETE 
  FROM summaries 
  WHERE id = ${String(id)};`;

  if (!rowCount || rowCount <= 0) {
    res.status(401).send('Summary does not exist.');
    return;
  }

  res.send('Success deleted.');
});

bookRouter.get('/summary/list', async (req: Request, res: Response) => {
  const { rows, rowCount } = await sql`
  SELECT * 
  FROM summaries`;

  if (!rowCount || rowCount <= 0) {
    res.json([]);
    return;
  }

  res.json(rows);
});

bookRouter.get('/summary/like-count', async (req: Request, res: Response) => {
  const userToken = req.headers['authorization']?.split(' ')[1];

  if (!userToken) {
    res.status(401).send('Login is required.');
    return;
  }

  const decodedInfo = decodeJwtToken(userToken);

  if (!decodedInfo.id) {
    res.status(401).send('Decoding failed.');
    return;
  }

  const id = req.query?.id;

  if (!id) {
    res.status(401).send('A required parameter is missing.');
    return;
  }

  const { rowCount } =
    await sql`SELECT summary_id FROM summary_like_count WHERE summary_id = ${String(id)};`;

  const { rows } = await sql`
    SELECT EXISTS (
      SELECT 1 
      FROM summary_like_count 
      WHERE summary_id = ${String(id)}
      AND user_id = ${decodedInfo.id}
    );`;

  res.json({ like_count: rowCount, is_clicked: isExistRows(rows) });
});

bookRouter.post('/summary/click-like', async (req: Request, res: Response) => {
  const userToken = req.headers['authorization']?.split(' ')[1];

  if (!userToken) {
    res.status(401).send('Login is required.');
    return;
  }

  const decodedInfo = decodeJwtToken(userToken);

  if (!decodedInfo.id) {
    res.status(401).send('Decoding failed.');
    return;
  }

  const id = req.body?.id;

  if (!id) {
    res.status(401).send('A required parameter is missing.');
    return;
  }

  const { rows } = await sql`
  SELECT EXISTS (
    SELECT 1 
    FROM summary_like_count 
    WHERE summary_id = ${id}
    AND user_id = ${decodedInfo.id}
  );`;

  if (isExistRows(rows)) {
    await sql`
    DELETE FROM summary_like_count 
    WHERE summary_id = ${id} 
    AND user_id = ${decodedInfo.id};`;
    res.send('delete like count.');
  } else {
    await sql`
    INSERT INTO summary_like_count (summary_id, user_id) 
    VALUES (${id}, ${decodedInfo.id});`;
    res.send('insert like count.');
  }
});

export default bookRouter;
