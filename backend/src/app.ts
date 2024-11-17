import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import { errorHandler } from './middlewares/errorHandler';
import connectDB from './config/database';
import authRoutes from './routes/authRoutes/index';
import morgan from 'morgan';

import cors from 'cors';

const app = express();
connectDB();

// CORS Options for both HTTP and Socket.IO
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend's address
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'PUT', 'PATCH', 'POST'], // Allowed methods
    allowedHeaders: ['Authorization', 'role', 'Content-Type']
};

app.use(cors(corsOptions));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(errorHandler);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// HTTP Routes
app.use('/auth', authRoutes);


export default app;
