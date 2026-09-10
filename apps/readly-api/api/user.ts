import { del, put } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import express from 'express';
import { optionalAuth, requireAuth } from '../middleware/auth';
import { ApiError } from '../utils/api-error';
import { asyncHandler } from '../utils/async-handler';
import { parseOptionalText } from '../utils/validation';

const userRouter = express.Router();
const allowedProfileImageTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

userRouter.get(
  '/my-info',
  optionalAuth,
  asyncHandler(async (req, res) => {
    if (!req.userId) {
      res.json(null);
      return;
    }

    const { rows } = await sql`
      SELECT id, email, nickname, profile_image, created_at
      FROM users
      WHERE id = ${req.userId};
    `;

    res.json(rows[0] ?? null);
  }),
);

userRouter.get(
  '/info',
  optionalAuth,
  asyncHandler(async (req, res) => {
    const userId = parseOptionalText(req.query.user_id, 'user_id');
    if (!userId) {
      throw new ApiError(400, 'INVALID_QUERY', 'user_id is required.');
    }

    const { rows } = await sql`
      SELECT id, email, nickname, profile_image, created_at
      FROM users
      WHERE id = ${userId};
    `;
    const user = rows[0];

    res.json(user ? { ...user, is_my: userId === req.userId } : null);
  }),
);

userRouter.put(
  '/edit/nickname',
  requireAuth,
  asyncHandler(async (req, res) => {
    const nickname = parseOptionalText(req.body?.nickname, 'nickname', 30);
    if (!nickname) {
      throw new ApiError(400, 'INVALID_BODY', 'nickname is required.');
    }

    const { rows } = await sql`
      UPDATE users
      SET nickname = ${nickname}
      WHERE id = ${req.userId}
      RETURNING id;
    `;

    if (!rows[0]) {
      throw new ApiError(404, 'USER_NOT_FOUND', 'User does not exist.');
    }

    res.json({ message: 'Nickname updated.' });
  }),
);

userRouter.post(
  '/edit/profile-image',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { rows } = await sql`
      SELECT profile_image
      FROM users
      WHERE id = ${req.userId};
    `;
    const user = rows[0];

    if (!user) {
      throw new ApiError(404, 'USER_NOT_FOUND', 'User does not exist.');
    }

    let image = req.files?.image;
    if (Array.isArray(image)) image = image[0];

    if (!image || image.truncated) {
      throw new ApiError(
        400,
        'INVALID_FILE',
        'A valid image file is required.',
      );
    }

    if (!allowedProfileImageTypes.has(image.mimetype)) {
      throw new ApiError(
        415,
        'UNSUPPORTED_FILE_TYPE',
        'Only JPEG, PNG, and WebP images are supported.',
      );
    }

    const extension =
      image.mimetype === 'image/jpeg' ? 'jpg' : image.mimetype.split('/')[1];
    const blob = await put(
      `readly/user/profile-image/${req.userId}-${Date.now()}.${extension}`,
      image.data,
      { access: 'public' },
    );

    await sql`
      UPDATE users
      SET profile_image = ${blob.url}
      WHERE id = ${req.userId};
    `;

    if (user.profile_image) {
      try {
        await del(user.profile_image);
      } catch (error) {
        console.warn(
          JSON.stringify({
            timestamp: new Date().toISOString(),
            level: 'warn',
            event: 'old_profile_image_delete_failed',
            requestId: req.requestId,
            error: error instanceof Error ? error.message : String(error),
          }),
        );
      }
    }

    res.json({ profileImage: blob.url });
  }),
);

export default userRouter;
