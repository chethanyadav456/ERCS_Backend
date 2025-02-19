import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js'
import arcjetMiddleware from './middlewares/arcjet.middleware.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.status(200).json({ status: 200, message: 'Welcome to the Event Neo API!'});
});

app.listen(PORT, async () => {
  console.log(`Event Neo API is running on http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;