import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import authRouter from './auth';
import bookRouter from './book';
import commentRouter from './comment';
import userRouter from './user';
import {
  errorHandler,
  notFoundHandler,
  requestContext,
} from '../middleware/observability';

export const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || false,
};

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(requestContext);
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(
  fileUpload({
    useTempFiles: false,
    tempFileDir: '/tmp/',
    abortOnLimit: true,
    limits: { fileSize: 5 * 1024 * 1024, files: 1 },
    responseOnLimit: 'File size limit has been reached',
    uploadTimeout: 10000, // 10 seconds
  }),
);

app.get('/health', (_req, res) => {
  const isConfigured = Boolean(
    process.env.CLIENT_URL && process.env.JWT_SECRET_KEY,
  );

  res.status(isConfigured ? 200 : 503).json({
    status: isConfigured ? 'ok' : 'degraded',
    checks: { configuration: isConfigured ? 'ok' : 'error' },
    timestamp: new Date().toISOString(),
  });
});
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/comment', commentRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
