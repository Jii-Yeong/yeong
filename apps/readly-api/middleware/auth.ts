import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/api-error';
import { verifyJwtToken } from '../utils/auth';

const getBearerToken = (req: Request) => {
  const authorization = req.header('authorization');
  const match = authorization?.match(/^Bearer\s+(.+)$/i);
  return match?.[1] ?? null;
};

export const optionalAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = getBearerToken(req);
  req.userId = token ? verifyJwtToken(token)?.id : undefined;
  next();
};

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = getBearerToken(req);
  const payload = token ? verifyJwtToken(token) : null;

  if (!payload) {
    next(new ApiError(401, 'UNAUTHORIZED', 'Authentication is required.'));
    return;
  }

  req.userId = payload.id;
  next();
};
