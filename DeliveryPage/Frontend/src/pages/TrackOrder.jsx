import {
    DirectionsRenderer,
    GoogleMap,
    Marker,
    useJsApiLoader
} from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Backend server

const containerStyle = {
    width: '100%',
    height: '90vh'
};

export default function TrackOrder() {
    const { trackingId } = useParams();
    const [order, setOrder] = useState(null);
    const [partnerPos, setPartnerPos] = useState(null);
    const [directions, setDirections] = useState(null);
    const [eta, setEta] = useState(null);
    const [distance, setDistance] = useState(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    // Get driving directions and ETA
    const fetchDirections = async (origin, destination) => {
        const directionsService = new window.google.maps.DirectionsService();
        try {
        const result = await directionsService.route({
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.DRIVING
        });
        setDirections(result);

        const leg = result.routes[0].legs[0];
        setEta(leg.duration.text);
        setDistance(leg.distance.text);
        } catch (err) {
        console.error("Failed to fetch route:", err.message);
        }
    };

    // Initial order + socket setup
    useEffect(() => {
        const fetchData = async () => {
        const res = await fetch(`http://localhost:4000/api/tracking/${trackingId}`);
        const data = await res.json();
        setOrder(data);

        if (data.deliveryPartnerId?.currentLat && data.deliveryPartnerId?.currentLon) {
            const pos = {
            lat: data.deliveryPartnerId.currentLat,
            lng: data.deliveryPartnerId.currentLon
            };
            setPartnerPos(pos);
            const customer = {
            lat: data.orderId.lat,
            lng: data.orderId.lon
            };
            fetchDirections(pos, customer);
        }

        socket.emit('join-order', trackingId);
        };

        fetchData();
    }, [trackingId]);

    // Listen for real-time updates
    useEffect(() => {
        if (!order) return;

        socket.on('location-update', ({ lat, lon }) => {
        const newPos = { lat, lng: lon };
        setPartnerPos(newPos);
        const destination = {
            lat: order.orderId.lat,
            lng: order.orderId.lon
        };
        fetchDirections(newPos, destination);
        });

        return () => socket.off('location-update');
    }, [order]);

    if (!isLoaded || !order || !partnerPos) {
        return <p className="text-center mt-10">Loading tracking info...</p>;
    }

    const customerPos = {
        lat: order.orderId.lat,
        lng: order.orderId.lon
    };

    return (
        <div>
        <h2 className="text-center text-xl font-bold py-4">
            Tracking ID: {trackingId}
        </h2>

        {/* 📍 ETA and Distance Display */}
        {eta && distance && (
            <div className="text-center mb-4 text-lg font-medium text-blue-600">
            Estimated Time: <b>{eta}</b> &nbsp; | &nbsp; Distance: <b>{distance}</b>
            </div>
        )}

        <GoogleMap
            mapContainerStyle={containerStyle}
            center={partnerPos}
            zoom={13}
        >
            <Marker position={customerPos} label="Customer" />
            <Marker position={partnerPos} label="Partner" />
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
        </div>
    );
}