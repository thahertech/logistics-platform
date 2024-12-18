import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '10px',
};

const center = {
  lat: 60.1695,
  lng: 24.9354,
};

const MapComponent = ({ setFilters }) => {
  const [selectedLatLng, setSelectedLatLng] = useState(null);
  const [address, setAddress] = useState('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
        return data.results[0].formatted_address;
      } else {
        setAddress('Address not found');
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error fetching address');
      return 'Error fetching address';
    }
  };

  const handleClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLatLng({ lat, lng });
    fetchAddress(lat, lng).then((fetchedAddress) => {
      // Pass the address to FilterSidebar through setFilters
      setFilters((prevFilters) => ({
        ...prevFilters,
        pickupLocation: fetchedAddress,
      }));
    });
  }, [setFilters]);

  if (!isLoaded) {
    return <p>Loading Map...</p>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9}
        onClick={handleClick}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            { featureType: 'poi', stylers: [{ visibility: 'off' }] },
            { featureType: 'transit', stylers: [{ visibility: 'off' }] },
          ],
        }}
      >
        {selectedLatLng && <Marker position={selectedLatLng} />}
      </GoogleMap>
      {/* {selectedLatLng && (
        <p>Selected location: {address}</p>
      )} */}
    </div>
  );
};

export default MapComponent;
