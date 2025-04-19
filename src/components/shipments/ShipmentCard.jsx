'use client';

import React from 'react';
// Inside ShipmentCard.jsx or .tsx
import { Lock } from 'lucide-react'; // or any lock icon lib

export default function ShipmentCard({ shipment, onClick }) {
  const isLocked = shipment.locked_for_editing;
  console.log(shipment);
  return (
    <div
      className={`relative border p-4 rounded-xl cursor-pointer transition-all duration-200 ${
        isLocked ? 'opacity-60 pointer-events-none' : 'hover:bg-gray-800'
      }`}
      onClick={() => !isLocked && onClick(shipment.id)}
    >
      {isLocked && (
        <div className="absolute top-2 right-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <Lock size={14} />
          Lukittu
        </div>
      )}

      <div className="text-white font-bold">{shipment.title}</div>
      <p className="text-gray-400 mb-2">
        {shipment.pickup_city} — {shipment.delivery_city} |{' '}
        {new Date(shipment.pickup_time).toLocaleDateString('fi-FI', {
          month: '2-digit',
          day: '2-digit',
        })}
      </p>

      <p className="text-white text-end text-xl mb-2">{shipment.amount} €</p>

      <p className="text-gray-400 text-center mb-2">
        {shipment.weight} kg | {shipment.transport_units} kpl {shipment.unit_type} |{' '}
        {shipment.agreement_type}
      </p>
    </div>
  );
}