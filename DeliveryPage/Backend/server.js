import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db.js';
import Partner from './models/DeliveryPartner.js';
import Order from './models/Order.js';
import deliveryRoutes from './routes/deliveryRoutes.js';
import { clusterOrders } from './services/clusteringService.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

// Routes
app.use('/api', deliveryRoutes);

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('🟢 Client connected:', socket.id);

    socket.on('join-order', (trackingId) => {
        socket.join(trackingId);
        console.log(`🚚 Joined tracking room: ${trackingId}`);
    });

    socket.on('update-location', async ({ partnerId, lat, lon }) => {
        try {
        const updatedPartner = await Partner.findByIdAndUpdate(
            partnerId,
            { currentLat: lat, currentLon: lon, lastUpdated: new Date() },
            { new: true }
        );

        const orders = await Order.find({ assignedTo: partnerId });
        orders.forEach(order => {
            io.to(order.trackingId).emit('location-update', {
            trackingId: order.trackingId,
            lat,
            lon,
            partnerId: partnerId.toString()
            });
        });
        } catch (err) {
        console.error('❌ Error in update-location:', err.message);
        }
    });

    socket.on('disconnect', () => {
        console.log('🔴 Client disconnected');
    });
});

// Run periodic clustering
setInterval(async () => {
    try {
        await clusterOrders();
        console.log('📦 Orders clustered');
    } catch (err) {
        console.error('❌ Clustering error:', err.message);
    }
}, 60 * 1000); // every 1 minute

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});
