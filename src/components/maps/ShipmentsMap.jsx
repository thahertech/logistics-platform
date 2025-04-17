'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function ShipmentsMap({ shipments }) {
  return (
    <MapContainer
      center={[60.1699, 24.9384]}
      zoom={10}
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {shipments.map((s) => (
        <Marker
          key={s.id}
          position={[s.pickup_lat, s.pickup_lng]}
        >
          <Popup>
            {s.pickup_city} → {s.delivery_city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}