import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Timeline() {
    const staticEvents = [
        { title: "Order Placed", date: "June 16, 11:00 AM", icon: "✅" },
        { title: "Shipped", date: "June 16, 03:00 PM", icon: "🚚" },
        { title: "Out for Delivery", date: "June 17, 09:00 AM", icon: "🛵" },
        { title: "Expected Delivery", date: "June 18, By 8PM", icon: "🏠" }
    ];

    const [liveEvents, setLiveEvents] = useState([]);

    useEffect(() => {
        socket.on("status-update", ({ status, time }) => {
        const icons = {
            "In Transit": "🛵",
            "Delivered": "📦",
            "Assigned": "🤝",
            "Picked Up": "📍"
        };

        setLiveEvents((prev) => [
            {
            title: status,
            date: new Date(time).toLocaleString(),
            icon: icons[status] || "ℹ️"
            },
            ...prev
        ]);
        });

        return () => {
        socket.off("status-update");
        };
    }, []);

    const allEvents = [...liveEvents, ...staticEvents];

    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white shadow rounded-xl p-4 transition-all">
        <h2 className="text-lg font-semibold mb-4">🕒 Delivery Timeline</h2>
        <ol className="relative border-l border-gray-300 dark:border-gray-600 ml-4 space-y-6">
            {allEvents.map((event, i) => (
            <li key={i} className="ml-6 relative">
                <span className="absolute -left-3 top-1 w-5 h-5 text-white bg-indigo-500 rounded-full flex items-center justify-center text-xs animate-bounce">
                {event.icon}
                </span>
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                {event.date}
                </p>
            </li>
            ))}
        </ol>
        </div>
    );
}