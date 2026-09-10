import { randomUUID } from 'node:crypto';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/api-error';

type LogLevel = 'info' | 'warn' | 'error';

const writeLog = (
  level: LogLevel,
  event: string,
  context: Record<string, unknown>,
) => {
  const entry = JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    event,
    ...context,
  });

  if (level === 'error') {
    console.error(entry);
    return;
  }

  if (level === 'warn') {
    console.warn(entry);
    return;
  }

  console.info(entry);
};

export const requestContext = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startedAt = performance.now();
  req.requestId = req.header('x-vercel-id') ?? randomUUID();
  res.setHeader('x-request-id', req.requestId);

  res.once('finish', () => {
    writeLog(res.statusCode >= 500 ? 'error' : 'info', 'http_request', {
      requestId: req.requestId,
      method: req.method,
      path: req.originalUrl.split('?')[0],
      statusCode: res.statusCode,
      durationMs: Math.round(performance.now() - startedAt),
    });
  });

  next();
};

export const notFoundHandler = (req: Request, _res: Response) => {
  throw new ApiError(404, 'ROUTE_NOT_FOUND', `Route not found: ${req.path}`);
};

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  const apiError =
    error instanceof ApiError
      ? error
      : new ApiError(500, 'INTERNAL_SERVER_ERROR', 'Unexpected server error.');

  writeLog(apiError.statusCode >= 500 ? 'error' : 'warn', 'request_error', {
    requestId: req.requestId,
    method: req.method,
    path: req.originalUrl.split('?')[0],
    statusCode: apiError.statusCode,
    code: apiError.code,
    error:
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            ...(apiError.statusCode >= 500 ? { stack: error.stack } : {}),
          }
        : String(error),
  });

  res.status(apiError.statusCode).json({
    error: {
      code: apiError.code,
      message: apiError.message,
      requestId: req.requestId,
    },
  });
};
