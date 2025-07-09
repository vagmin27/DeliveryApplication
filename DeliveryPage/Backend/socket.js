// DeliveryPage/Backend/socket.js
import { Server } from "socket.io";
import Partner from "./models/Delivery.js"; // Delivery partner schema
import Order from "./models/Order.js"; // Make sure Order.js is in models
import Tracking from "./models/Tracking.js"; // Optional, if you're saving location timeline

export const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
        origin: "*",
        methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("🔌 New client connected");

        // ✅ Join a room based on tracking ID
        socket.on("join-order", (trackingId) => {
        socket.join(trackingId);
        console.log(`✅ Socket joined room: ${trackingId}`);
        });

        // ✅ Handle location updates from delivery partners
        socket.on("update-location", async ({ partnerId, lat, lon }) => {
        try {
            // 🔄 Update delivery partner location
            const updatedPartner = await Partner.findByIdAndUpdate(
            partnerId,
            {
                currentLat: lat,
                currentLon: lon,
                lastUpdated: new Date(),
            },
            { new: true }
            );

            // 🧾 Optional: store location into tracking timeline
            if (updatedPartner) {
            await Tracking.create({
                partnerId,
                lat,
                lon,
                timestamp: new Date(),
                trackingId: updatedPartner.currentTrackingId, // If you maintain tracking context
            });
            }

            // 🔁 Notify all orders assigned to the partner
            const orders = await Order.find({ assignedTo: partnerId });

            orders.forEach((order) => {
            // 📡 Emit live location to customer/client in that tracking room
            io.to(order.trackingId).emit("location-update", {
                trackingId: order.trackingId,
                lat,
                lon,
                partnerId: partnerId.toString(),
            });

            // Optional 📦 Send status as well (e.g., "In Transit")
            io.to(order.trackingId).emit("status-update", {
                status: "In Transit",
                time: new Date(),
            });
            });
        } catch (err) {
            console.error("❌ Error updating partner location:", err.message);
        }
        });

        socket.on("disconnect", () => {
        console.log("❌ Client disconnected");
        });
    });
};