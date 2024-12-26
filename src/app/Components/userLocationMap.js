import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { supabase } from '@/supabaseClient';

// Fix marker icons for Leaflet
if (typeof window !== "undefined") {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png', // Fix for the 2x icon
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
}

const UserLocationMap = () => {
    const [userLocations, setUserLocations] = useState([]);
    const [newAddress, setNewAddress] = useState('');
    const [geocodedLocation, setGeocodedLocation] = useState(null);
    const [error, setError] = useState(null);

    // Function to geocode an address using a geocoding API
    const geocodeAddress = async (address) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
            );
            const data = await response.json();
            if (data && data.length > 0) {
                return {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon),
                };
            } else {
                throw new Error('Address not found');
            }
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    const handleAddAddress = async () => {
        if (!newAddress) return;

        const location = await geocodeAddress(newAddress);
        if (location) {
            const newLocation = {
                address_lat: location.lat,
                address_lng: location.lng,
                full_name: 'New User', // Placeholder, replace with actual data if needed
            };

            setUserLocations((prev) => [...prev, newLocation]);
            setGeocodedLocation(newLocation);
            setNewAddress('');
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h2 className="text-lg font-bold mb-4 ">User Locations</h2>
            <div className="mb-4 text-black">
                <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="Enter address"
                    className="p-2 border border-gray-300 rounded mr-2"
                />
                <button
                    onClick={handleAddAddress}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Address
                </button>
            </div>
            <MapContainer
                center={[60.192059, 24.945831]} // Default center, e.g., Helsinki, Finland
                zoom={6}
                style={{ height: '500px', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {userLocations.map((user, idx) => (
                    <Marker
                        key={idx}
                        position={[user.address_lat, user.address_lng]}
                    >
                        <Popup>
                            <strong>{user.full_name}</strong>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default UserLocationMap;