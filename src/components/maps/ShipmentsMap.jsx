'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Override the default icon paths with CDN URLs
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});
export default function ShipmentsMap({ shipments }) {
  const [mounted, setMounted] = useState(false);
  const mapContainerRef = useRef(null); // Ref to the map container
  const mapInstance = useRef(null); // Ref to store the map instance

  // Initialize map on mount
  useEffect(() => {
    setMounted(true);

    if (mapContainerRef.current && !mapInstance.current) {
      console.log('Initializing map...');

      // Initialize the map only once
      mapInstance.current = L.map(mapContainerRef.current, {
        center: [60.1699, 24.9384], // Initial position (Helsinki)
        zoom: 10, // Initial zoom level
      });

      const polylines = shipments
      .filter(s => s.pickup_latitude && s.delivery_latitude)
      .map(s => ({
        id: s.id,
        points: [
          [s.pickup_latitude, s.pickup_longitude],
          [s.delivery_latitude, s.delivery_longitude],
        ],
      }));
  

      // Add TileLayer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance.current);

      // Check if shipments data is valid
      if (shipments && shipments.length > 0) {
        shipments.forEach((shipment) => {
          const { pickup_latitude, pickup_longitude, pickup_city, delivery_city } = shipment;

          // Validate latitude and longitude values
          if (
            typeof pickup_latitude === 'number' &&
            typeof pickup_longitude === 'number' &&
            !isNaN(pickup_latitude) &&
            !isNaN(pickup_longitude)
          ) {
            console.log('Adding marker:', pickup_latitude, pickup_longitude);
            L.marker([pickup_latitude, pickup_longitude])
              .addTo(mapInstance.current)
              .bindPopup(`${pickup_city || 'Unknown City'} → ${delivery_city || 'Unknown City'}`);
          } else {
            console.log('Invalid coordinates, skipping marker.');
          }
        });
      } else {
        console.log('No shipments available.');
      }
    }

    // Cleanup function to remove the map instance when the component unmounts
    return () => {
      if (mapInstance.current) {
        console.log('Cleaning up map...');
        mapInstance.current.remove(); // Remove map instance to prevent memory leaks
        mapInstance.current = null; // Clear the reference
      }
    };
  }, [shipments]); // Re-run the effect if the shipments change

  // Ensure map is only rendered once
  if (!mounted) return null;

  return (
    <div
      ref={mapContainerRef} // Reference to the div that will hold the map
      style={{ height: '600px', width: '90%'}}
    >
      {/* The map container will be rendered here */}
    </div>
  );
}