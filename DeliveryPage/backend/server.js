import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import trackingRoutes from './routes/trackingRoutes.js';

import { initSocketServer } from './socket.js';

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/tracking', trackingRoutes);

// Inject IO instance for Socket.IO handlers
initSocketServer(io);

const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
    console.log(`Delivery Backend running on port ${PORT}`);
});
