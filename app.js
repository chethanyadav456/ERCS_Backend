import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http'; 

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import incidentRouter from './routes/incident.routes.js';
import emergencyRouter from './routes/emergency.routes.js';
import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js'
import setupWebSocket from './utils/websocket.js';


const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/incidents', incidentRouter);
app.use('/api/v1/emergencies', emergencyRouter);
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.status(200).json({ status: 200, message: 'Welcome to the Black Arch API!'});
});

setupWebSocket(server);

server.listen(PORT, async () => {
  console.log(`Event Neo API is running on http://localhost:${PORT}`);
 
  await connectToDatabase();
});

export default app;