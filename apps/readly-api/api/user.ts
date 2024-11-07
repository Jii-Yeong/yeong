import { sql } from '@vercel/postgres';
import express, { Request, Response } from 'express';
import { decodeJwtToken } from '../utils/auth';

const userRouter = express.Router();

userRouter.get('/info', async (req: Request, res: Response) => {
  const userToken = req.headers['authorization']?.split(' ')[1];

  if (!userToken) {
    res.json(null);
    return;
  }

  const decodedInfo = decodeJwtToken(userToken);

  const { rows } = await sql`
  SELECT *
  FROM users
  WHERE id = ${decodedInfo.id};`;

  const row = rows[0];

  if (!row) {
    res.json(null);
    return;
  }

  delete row.id;

  res.json(row);
});

export default userRouter;
