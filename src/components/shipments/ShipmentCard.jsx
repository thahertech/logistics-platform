'use client';

import React from 'react';
import { FaTruck } from 'react-icons/fa';

export default function ShipmentCard({ shipment, onClick }) {
  return (
    <div
      className="bg-gray-900 p-6 rounded-lg shadow-lg cursor-pointer"
      onClick={() => onClick(shipment)}
    >
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