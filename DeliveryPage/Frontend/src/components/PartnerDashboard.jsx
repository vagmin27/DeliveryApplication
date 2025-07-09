// DeliveryPage/Frontend/src/pages/PartnerDashboard.jsx
import { useEffect, useState } from "react";
import PartnerMap from "../components/PartnerMap";
import socket from "../socket";

export default function PartnerDashboard() {
    const [location, setLocation] = useState({ lat: 12.9716, lng: 77.5946 });

    const partnerId = JSON.parse(localStorage.getItem("user"))?._id;

    useEffect(() => {
        if (!partnerId) return;

        const updateLocation = (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lng: longitude });

        socket.emit("update-location", {
            partnerId,
            lat: latitude,
            lon: longitude,
        });
        };

        const err = (err) => console.error("Location Error:", err);
        const watchId = navigator.geolocation.watchPosition(updateLocation, err, {
        enableHighAccuracy: true,
        timeout: 10000,
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, [partnerId]);

    return (
        <div className="p-6">
        <h2 className="text-xl font-bold mb-4">📍 Live Location Sharing</h2>
        <PartnerMap location={location} />
        </div>
    );
}
