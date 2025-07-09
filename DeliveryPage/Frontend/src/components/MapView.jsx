// DeliveryPage/Frontend/src/components/MapView.jsx
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Update if needed

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 19.0760, // Default: Mumbai
    lng: 72.8777,
};

export default function MapView() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const [partnerLocations, setPartnerLocations] = useState({}); // key: partnerId, value: { lat, lng }

    useEffect(() => {
        socket.on('location-update', ({ lat, lon, trackingId, partnerId }) => {
        setPartnerLocations(prev => ({
            ...prev,
            [partnerId]: { lat, lng: lon },
        }));
        });

        return () => socket.off('location-update');
    }, []);

    if (!isLoaded) return <p>Loading Map...</p>;

    return (
        <div className="rounded-md shadow-md overflow-hidden">
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
        >
            {Object.entries(partnerLocations).map(([partnerId, pos]) => (
            <Marker key={partnerId} position={pos} label={`Agent ${partnerId.slice(-4)}`} />
            ))}
        </GoogleMap>
        </div>
    );
}
