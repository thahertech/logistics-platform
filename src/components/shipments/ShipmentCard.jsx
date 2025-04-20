'use client';

import React from 'react';
import { Lock, Bell } from 'lucide-react'; // Example of using Bell icon instead of Alarm
export default function ShipmentCard({ shipment, onClick }) {
  const isLocked = shipment.locked;
  const isUrgent = shipment.urgent; // Assuming this is a boolean flag in the shipment object
  
  console.log(shipment);
  
  const requiredFields = [
    'pickup_city',
    'delivery_city',
    'pickup_date',
    'amount',
    'weight',
    'transport_units',
    'unit_type',
    'agreement_type',
  ];

  const isIncomplete = requiredFields.some((field) => !shipment[field]);

  const isDisabled = isLocked || isIncomplete;

  return (
    <div
      className={`relative border p-4 rounded-xl cursor-pointer transition-all duration-200 ${
        isDisabled ? 'opacity-60 pointer-events-none' : 'hover:bg-gray-800'
      }`}
      onClick={() => !isDisabled && onClick(shipment.id)}
    >
      {isDisabled && (
        <div
          className={`absolute top-2 right-2 text-white z-999 px-2 py-1 rounded text-xs flex items-center gap-1 ${
            isIncomplete ? 'bg-yellow-600 z-999' : 'bg-red-600'
          }`}
        >
          <Lock size={14}/>
          {isIncomplete ? 'Puuttuu tietoja' : 'Lukittu'}
        </div>
      )}

      {isUrgent && (
        <div className="absolute top-2 z-1 right-2 text-white bg-green-600 px-2 py-1 rounded text-xs flex items-center gap-1">
          <Bell size={14} />
          Asap
        </div>
      )}

      <div className="text-white font-bold">{shipment.title}</div>
      <p className="text-gray-400 mb-2">
        {shipment.pickup_city} — {shipment.delivery_city} |{' '}
        {new Date(shipment.pickup_date).toLocaleDateString('fi-FI', {
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