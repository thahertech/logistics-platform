import React from 'react';
import Modal from '../modals/Modal';
import { FaTruck } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function ShipmentModal({ shipment, onClose }) {
  const router = useRouter();

  const goToDetails = () => router.push(`/kuljetukset/${shipment.id}`);

  return (
    <Modal onClose={onClose} pickupLocation={shipment.pickup_city} deliveryLocation={shipment.delivery_city}>
      <div className="modal-container p-6 rounded-lg">
        <div className="modal-header mb-4 border-b border-gray-700 pb-2"><FaTruck />
          <div className="flex justify-between mt-6 text-gray-300">
            <div>
              <p><strong>Nouto</strong> {new Date(shipment.pickup_time).toLocaleString('fi-FI', {
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })} </p>
              <p>{shipment.pickup_postal_code}, {shipment.pickup_city}</p>
            </div>
            <div>
              <p><strong>Toimitus</strong> {new Date(shipment.delivery_date).toLocaleString('fi-FI', {
                month: '2-digit',
                day: '2-digit',
              })}</p>
              <p>{shipment.delivery_postal_code}, {shipment.delivery_city}</p>
            </div>
          </div>
          <div className="modal-price mt-6 text-gray-300 flex justify-end">
            <p className="text-xl bg-opacity-60 p-[10px] rounded-[10px] text-gray-400 mb-4 font-medium">{shipment.amount} €</p>
          </div>
        </div>
        <div className="modal-actions flex flex-col justify-end sm:flex-row gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={goToDetails}>
            Näytä tiedot
          </button>
        </div>
        <div className="modal-details-container text-gray-300 mb-6">
          <p className="text-gray-400 mb-4">{shipment.details}</p>
        </div>
        <p className="text-white-400 text-center p-2 bg-black bg-opacity-30">{shipment.weight} kg | {shipment.transport_units}, {shipment.unit_type} | {shipment.agreement_type}</p>
      </div>
    </Modal>
  );
}