'use client';

import React from 'react';
import Modal from '../modals/Modal';
import { FaTruck } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import PrimaryButton from '../buttons/PrimaryButton';

export default function ShipmentModal({ shipment, onClose }) {
  const router = useRouter();
  const goToDetails = () => router.push(`/kuljetukset/${shipment.id}`);

  const dateOptions = {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };

  const pickupDate = new Date(shipment.pickup_date);
  const deliveryDate = new Date(shipment.delivery_date);

  return (
    <Modal
      onClose={onClose}
      pickupLocation={shipment.pickup_city}
      deliveryLocation={shipment.delivery_city}
    >
      <div className="p-6 rounded-2xl bg-black/60 backdrop-blur-xl text-white shadow-2xl border border-white/10">

        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
          <FaTruck className="text-2xl text-gray-400" />
          <h2 className="text-xl font-semibold tracking-wide">Kuljetustiedot</h2>
          <button onClick={onClose} className="modal-close-btn">X</button>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-white/90 mb-4">
          <div>
            <p className="uppercase text-xs text-white/50 mb-1">Nouto</p>
            <p>{pickupDate.toLocaleString('fi-FI', dateOptions)}</p>
            <p>{shipment.pickup_postal_code}, {shipment.pickup_city}</p>
          </div>
          <div>
            <p className="uppercase text-xs text-white/50 mb-1">Toimitus</p>
            <p>{deliveryDate.toLocaleDateString('fi-FI')}</p>
            <p>{shipment.delivery_postal_code}, {shipment.delivery_city}</p>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <span className="text-xl text-green-400 font-semibold bg-white/10 px-4 py-2 rounded-xl shadow-inner">
            {shipment.amount} €
          </span>
        </div>

        <div className="text-white/80 text-sm mb-6">
          <p className="leading-relaxed whitespace-pre-line">{shipment.details}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-2 text-xs">
          <span className="bg-blue-400/20 text-blue-300 px-3 py-1 rounded-full font-medium">
            {shipment.weight} kg
          </span>
          <span className="bg-purple-400/20 text-purple-300 px-3 py-1 rounded-full font-medium">
            {shipment.transport_units} x {shipment.unit_type}
          </span>
          <span className="bg-orange-400/20 text-orange-300 px-3 py-1 rounded-full font-medium">
            {shipment.agreement_type}
          </span>
        </div>

        <div className="flex justify-end">
          <PrimaryButton
            onClick={goToDetails}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full transition"
          >
            Näytä tiedot
          </PrimaryButton>
        </div>
      </div>
      
    </Modal>
  );
}