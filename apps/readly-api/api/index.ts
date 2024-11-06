import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import authRouter from './auth';
import bookRouter from './book';
import commentRouter from './comment';
import userRouter from './user';

export const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/comment', commentRouter);

module.exports = app;
