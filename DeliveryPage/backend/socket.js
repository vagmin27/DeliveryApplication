import DeliveryPartner from './models/DeliveryPartner.js';
import Order from './models/Order.js';

export const initSocketServer = (io) => {
    io.on('connection', (socket) => {
        console.log('📡 New client connected');

        // Join specific room
        socket.on('join-order', (trackingId) => {
        socket.join(trackingId);
        console.log(`🟢 Joined room: ${trackingId}`);
        });

        socket.on('update-location', async ({ partnerId, lat, lon }) => {
        try {
            const partner = await DeliveryPartner.findByIdAndUpdate(partnerId, {
            currentLat: lat,
            currentLon: lon,
            lastUpdated: new Date(),
            }, { new: true });

            const orders = await Order.find({ assignedTo: partnerId });
            orders.forEach(order => {
            io.to(order.trackingId).emit('location-update', {
                lat,
                lon,
                trackingId: order.trackingId,
            });
            });
        } catch (err) {
            console.error('Location update failed:', err.message);
        }
        });

        socket.on('disconnect', () => {
        console.log('❌ Client disconnected');
        });
    });
};