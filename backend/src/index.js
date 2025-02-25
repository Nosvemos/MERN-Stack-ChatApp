import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import {connectDB} from "./lib/db.js";

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import messageRoutes from './routes/message.route.js';

dotenv.config();
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors(
	{
		origin: 'http://localhost:5173', // Vite port
		credentials: true,

	}
));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/messages', messageRoutes);

app.listen(port, ()  => {
	console.log(`Server is running on ${port} port.`);
	connectDB();
})