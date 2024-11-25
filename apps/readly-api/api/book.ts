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

  if (!decodedInfo.id) {
    res.status(400).send('Decoding failed.');
    return;
  }

  const content = req.body?.content;
  const categoryId = req.body?.category_id;
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
  INSERT INTO summaries (contents, book_title, book_author, book_publisher, book_pubdate, book_image, book_link, user_id, user_name, user_image, start_page, end_page, category_id)
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
    ${endPage},
    ${categoryId}
    );`;

  res.send('success created');
});

bookRouter.get('/summary', async (req: Request, res: Response) => {
  const userToken = req.headers['authorization']?.split(' ')[1];

  const decodedInfo = decodeJwtToken(String(userToken));

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
  SELECT 
    summaries.*, 
    book_category.name AS category_name,
    users.nickname AS user_name,
    users.profile_image AS user_image
  FROM 
    summaries
  LEFT JOIN 
    users
  ON 
    summaries.user_id = users.id
  LEFT JOIN 
    book_category
  ON 
    summaries.category_id = book_category.id
  WHERE
    summaries.id = ${String(id)};`;

  const row = rows[0];

  if (!row) {
    res.status(401).send('Summary does not exist.');
    return;
  }

  res.json({ ...row, is_my: row.user_id === decodedInfo.id });
});

bookRouter.put('/summary/edit', async (req: Request, res: Response) => {
  const userToken = req.headers['authorization']?.split(' ')[1];

  if (!userToken) {
    res.status(401).send('You entered via the wrong route.');
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
  }

  const content = req.body?.content;
  const bookInfo = req.body?.bookInfo;
  const startPage = req.body?.startPage;
  const endPage = req.body?.endPage;
  const categoryId = req.body?.category_id;

  if (!content || !bookInfo) {
    res.status(401).send('A required parameter is missing.');
    return;
  }

  await sql`
  UPDATE summaries
  SET
    contents = ${content}, 
    book_title = ${bookInfo.title}, 
    book_author = ${bookInfo.author}, 
    book_publisher = ${bookInfo.publisher}, 
    book_pubdate = ${bookInfo.pubdate}, 
    book_image = ${bookInfo.image}, 
    book_link = ${bookInfo.link}, 
    start_page = ${startPage}, 
    end_page = ${endPage}, 
    category_id = ${categoryId}
  WHERE id = ${id} AND user_id = ${decodedInfo.id};`;

  res.send('success edited');
});

bookRouter.delete('/summary/delete', async (req: Request, res: Response) => {
  const id = req.query?.id;

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
  const categoryId = (req.query?.category_id as string) || null;
  const userId = (req.query?.user_id as string) || null;
  const order = (req.query?.order as string) || null;

  const orderByObject = {
    desc: 'ORDER BY summaries.created_at DESC',
    asc: 'ORDER BY summaries.created_at ASC',
    view: 'ORDER BY summaries.view_count DESC',
    like: 'ORDER BY COUNT(summary_like_count.id) DESC',
  };

  const orderByQuery = orderByObject[order || 'desc'];

  let query = `
  SELECT 
    summaries.*,
    book_category.name AS category_name,
    users.nickname AS user_name,
    users.profile_image AS user_image,
    COUNT(summary_comment.id)::INTEGER AS comment_count,
    COUNT(summary_like_count.id)::INTEGER as like_count
  FROM
    summaries
  LEFT JOIN 
    users
  ON
    summaries.user_id = users.id
  LEFT JOIN 
    book_category
  ON 
    summaries.category_id = book_category.id
  LEFT JOIN
    summary_comment
  ON summaries.id = summary_comment.summary_id
  LEFT JOIN
    summary_like_count
  ON summaries.id = summary_like_count.summary_id
  WHERE 
    (summaries.category_id = ${categoryId}::INTEGER OR ${categoryId}::INTEGER IS NULL)
  AND
    (summaries.user_id = ${userId}::VARCHAR OR ${userId}::VARCHAR IS NULL)
  GROUP BY 
    summaries.id, 
    book_category.name, 
    users.nickname, 
    users.profile_image
  `;

  query += orderByQuery;
  query += ';';

  const { rows, rowCount } = await sql.query(query);

  if (!rowCount || rowCount <= 0) {
    res.json([]);
    return;
  }

  res.json(rows);
});

bookRouter.get('/summary/like-count', async (req: Request, res: Response) => {
  const id = req.query?.id;

  if (!id) {
    res.status(401).send('A required parameter is missing.');
    return;
  }

  const { rowCount } =
    await sql`SELECT summary_id FROM summary_like_count WHERE summary_id = ${String(id)};`;

  const userToken = req.headers['authorization']?.split(' ')[1];

  if (!userToken) {
    res.json({ like_count: rowCount, is_clicked: false });
    return;
  }

  const decodedInfo = decodeJwtToken(userToken || null);

  let specUserId = req.ip

  if (decodedInfo.id) {
    specUserId = decodedInfo.id
  }

  const { rows } = await sql`
    SELECT EXISTS (
      SELECT 1 
      FROM summary_like_count 
      WHERE summary_id = ${String(id)}
      AND user_id = ${specUserId}
    );`;

  res.json({ like_count: rowCount, is_clicked: isExistRows(rows) });
});

bookRouter.post('/summary/click-like', async (req: Request, res: Response) => {
  const userToken = req.headers['authorization']?.split(' ')[1];

  let specUserId = req.ip

  const decodedInfo = decodeJwtToken(userToken || null);

  if (decodedInfo.id) {
    specUserId = decodedInfo.id
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
    AND user_id = ${specUserId}
  );`;

  if (isExistRows(rows)) {
    await sql`
    DELETE FROM summary_like_count 
    WHERE summary_id = ${id} 
    AND user_id = ${specUserId};`;
    res.send('delete like count.');
  } else {
    await sql`
    INSERT INTO summary_like_count (summary_id, user_id) 
    VALUES (${id}, ${specUserId});`;
    res.send('insert like count.');
  }
});

bookRouter.get('/category-list', async (req: Request, res: Response) => {
  const { rows } = await sql`
  SELECT 
    book_category.id,
    book_category.name,
    COUNT(summaries.id) AS summary_count
  FROM 
    book_category
  LEFT JOIN 
    summaries
  ON 
    book_category.id = summaries.category_id
  GROUP BY 
    book_category.id, book_category.name
  ORDER BY 
    summary_count DESC;`;

  res.json(rows);
});

export default bookRouter;
