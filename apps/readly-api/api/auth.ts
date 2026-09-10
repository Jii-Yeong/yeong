import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import express from 'express';
import {
  generateJwtToken,
  getGoogleTokenByCode,
  getGoogleUserInfo,
} from '../utils/auth';
import { ApiError } from '../utils/api-error';
import { asyncHandler } from '../utils/async-handler';
import { isExistRows } from '../utils/sql';

const authRouter = express.Router();

const parseCredential = (
  value: unknown,
  field: string,
  minLength: number,
  maxLength: number,
  trim = true,
) => {
  if (typeof value !== 'string') {
    throw new ApiError(400, 'INVALID_BODY', `${field} must be a string.`);
  }

  const parsedValue = trim ? value.trim() : value;
  if (parsedValue.length < minLength || parsedValue.length > maxLength) {
    throw new ApiError(
      400,
      'INVALID_BODY',
      `${field} must contain between ${minLength} and ${maxLength} characters.`,
    );
  }
  return parsedValue;
};

authRouter.post(
  '/sign-up',
  asyncHandler(async (req, res) => {
    const userId = parseCredential(req.body?.user_id, 'user_id', 4, 50);
    const password = parseCredential(
      req.body?.password,
      'password',
      8,
      72,
      false,
    );
    const nickname = parseCredential(req.body?.nickname, 'nickname', 1, 30);
    const encryptedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO users (id, nickname, user_id, password)
      VALUES (gen_random_uuid()::TEXT, ${nickname}, ${userId}, ${encryptedPassword});
    `;

    res.status(201).json({ message: 'User created.' });
  }),
);

authRouter.post(
  '/sign-up/id-check',
  asyncHandler(async (req, res) => {
    const userId = parseCredential(req.body?.user_id, 'user_id', 4, 50);
    const { rows } = await sql`
      SELECT EXISTS (
        SELECT 1
        FROM users
        WHERE user_id = ${userId}
      );
    `;

    res.json({
      isExist: isExistRows(rows),
      ...(isExistRows(rows) ? { message: '중복된 아이디입니다.' } : {}),
    });
  }),
);

authRouter.post(
  '/sign-up/nickname-check',
  asyncHandler(async (req, res) => {
    const nickname = parseCredential(req.body?.nickname, 'nickname', 1, 30);
    const { rows } = await sql`
      SELECT EXISTS (
        SELECT 1
        FROM users
        WHERE nickname = ${nickname}
      );
    `;

    res.json({
      isExist: isExistRows(rows),
      ...(isExistRows(rows) ? { message: '중복된 닉네임입니다.' } : {}),
    });
  }),
);

authRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    const userId = parseCredential(req.body?.user_id, 'user_id', 4, 50);
    const password = parseCredential(
      req.body?.password,
      'password',
      8,
      72,
      false,
    );
    const { rows } = await sql`
      SELECT id, password
      FROM users
      WHERE user_id = ${userId};
    `;
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.json({
        isSuccess: false,
        message: '아이디와 비밀번호를 확인해주세요.',
      });
      return;
    }

    res.json({
      isSuccess: true,
      accessToken: generateJwtToken({ id: user.id }),
    });
  }),
);

authRouter.post(
  '/login/google',
  asyncHandler(async (req, res) => {
    const code = parseCredential(req.body?.code, 'code', 1, 4096);
    const token = await getGoogleTokenByCode(code);

    if (!token) {
      throw new ApiError(401, 'GOOGLE_LOGIN_FAILED', 'Google login failed.');
    }

    const userInfo = await getGoogleUserInfo(token.access_token);
    const accessToken = generateJwtToken({ id: userInfo.id });
    const { rows } = await sql`
      SELECT EXISTS (
        SELECT 1
        FROM users
        WHERE id = ${userInfo.id}
      );
    `;

    if (!isExistRows(rows)) {
      await sql`
        INSERT INTO users (id, email, nickname)
        VALUES (${userInfo.id}, ${userInfo.email}, ${userInfo.name});
      `;
    }

    res.json({
      message: isExistRows(rows) ? 'Login succeeded.' : 'User registered.',
      accessToken,
    });
  }),
);

export default authRouter;
