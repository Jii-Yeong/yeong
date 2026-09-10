import { sql } from '@vercel/postgres';
import express from 'express';
import { optionalAuth, requireAuth } from '../middleware/auth';
import { ApiError } from '../utils/api-error';
import { asyncHandler } from '../utils/async-handler';
import { parseInteger } from '../utils/validation';

const commentRouter = express.Router();

const parseComment = (value: unknown) => {
  if (typeof value !== 'string') {
    throw new ApiError(400, 'INVALID_BODY', 'comment must be a string.');
  }

  const comment = value.trim();
  if (!comment || comment.length > 5_000) {
    throw new ApiError(
      400,
      'INVALID_BODY',
      'comment must contain between 1 and 5000 characters.',
    );
  }
  return comment;
};

commentRouter.post(
  '/create',
  requireAuth,
  asyncHandler(async (req, res) => {
    const comment = parseComment(req.body?.comment);
    const summaryId = parseInteger(req.body?.summary_id, 'summary_id', {
      min: 1,
      max: 2_147_483_647,
    });
    const commentId = parseInteger(req.body?.comment_id, 'comment_id', {
      min: 1,
      max: 2_147_483_647,
      optional: true,
    });
    const { rows } = await sql`
      SELECT id, nickname, profile_image
      FROM users
      WHERE id = ${req.userId};
    `;
    const user = rows[0];

    if (!user) {
      throw new ApiError(404, 'USER_NOT_FOUND', 'User does not exist.');
    }

    await sql`
      INSERT INTO summary_comment (
        comment,
        summary_id,
        comment_id,
        user_id,
        user_image,
        user_name
      )
      VALUES (
        ${comment},
        ${summaryId},
        ${commentId},
        ${user.id},
        ${user.profile_image},
        ${user.nickname}
      );
    `;

    res.status(201).json({ message: 'Comment created.' });
  }),
);

commentRouter.get(
  '/list',
  optionalAuth,
  asyncHandler(async (req, res) => {
    const summaryId = parseInteger(req.query.summary_id, 'summary_id', {
      min: 1,
      max: 2_147_483_647,
    });
    const { rows } = await sql`
      SELECT
        summary_comment.*,
        users.nickname AS user_name,
        users.profile_image AS user_image
      FROM summary_comment
      LEFT JOIN users ON summary_comment.user_id = users.id
      WHERE summary_comment.summary_id = ${summaryId};
    `;

    res.json(
      rows.map((item) => ({
        ...item,
        is_my: item.user_id === req.userId,
      })),
    );
  }),
);

commentRouter.delete(
  '/delete',
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = parseInteger(req.query.id, 'id', {
      min: 1,
      max: 2_147_483_647,
    });
    const { rows } = await sql`
      DELETE FROM summary_comment
      WHERE id = ${id} AND user_id = ${req.userId}
      RETURNING id;
    `;

    if (!rows[0]) {
      throw new ApiError(
        404,
        'COMMENT_NOT_FOUND',
        'Comment does not exist or is not owned by the current user.',
      );
    }

    res.status(204).send();
  }),
);

export default commentRouter;
