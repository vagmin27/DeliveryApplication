// DeliveryPage/Frontend/src/components/PartnerMap.jsx
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
    width: '100%',
    height: '400px',
};

export default function PartnerMap({ location }) {
    const [center, setCenter] = useState({ lat: location.lat, lng: location.lng });

    useEffect(() => {
        setCenter({ lat: location.lat, lng: location.lng });
    }, [location]);

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker position={center} />
        </GoogleMap>
    );
}
