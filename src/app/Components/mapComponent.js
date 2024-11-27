import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapComponent = ({ applyFilters }) => {
  const [selectedLatLng, setSelectedLatLng] = useState(null);
  const [address, setAddress] = useState('');

  const handleMapClick = async (e) => {
    console.log('Map clicked at coordinates:', e.latlng); // Debug coordinates
    const { lat, lng } = e.latlng;
    setSelectedLatLng([lat, lng]);
  
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
      );
  
      if (!response.ok) {
        console.error('Failed to fetch address');
        throw new Error('Failed to fetch address');
      }
  
      const data = await response.json();
      console.log('API response:', data); // Debug the response
  
      if (data && data.address) {
        const formattedAddress = `${data.address.road || ''}, ${data.address.city || data.address.town || data.address.village || ''}, ${data.address.country || ''}`;
        setAddress(formattedAddress);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error fetching address');
    }
  };
  

  return (
    <div>
   <MapContainer
  center={[60.1695, 24.9354]} // Default center point
  zoom={13}
  style={{ height: '400px', width: '100%' }}
  onClick={handleMapClick} // Make sure this is set correctly
>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {selectedLatLng && (
          <Marker position={selectedLatLng}>
            <Popup>
              <div>
                <strong>Selected Location:</strong>
                <p>{address}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
