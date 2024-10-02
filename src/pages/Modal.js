// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, delivery, onPurchase }) => {
  if (!isOpen || !delivery) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full ">
        <h3 className="text-lg font-bold">{delivery.acf.shipment_name}</h3>
        <p><strong>Toimituspvm:</strong> {delivery.acf.delivery_date}</p>
        <p><strong>Noutopvm:</strong> {delivery.acf.pickup_date}</p>
        <p><strong>Paino:</strong> {delivery.acf.weight} kg</p>
        <p><strong>Hinta:</strong> {delivery.acf.price} €</p>
        <p><strong>Lisätietoa:</strong> {delivery.acf.details}</p>
        <div className="flex justify-end mt-4">
          <button className="bg-blue-500 text-white p-2 rounded mr-2" onClick={() => onPurchase(delivery.id)}>
            Osta
          </button>
          <button className="bg-gray-300 p-2 rounded" onClick={onClose}>
            Sulje
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
