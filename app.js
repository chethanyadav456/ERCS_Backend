import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js'
import arcjetMiddleware from './middlewares/arcjet.middleware.js'
import incidentRoutes from './routes/incident.routes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import incidentRouter from './routes/incidents.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/incidents', incidentRouter);
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.status(200).json({ status: 200, message: 'Welcome to the Event Neo API!'});
});

app.listen(PORT, async () => {
  console.log(`Event Neo API is running on http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;