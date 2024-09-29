import React from 'react';

const Modal = ({ isOpen, onClose, delivery }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="text-black bg-white p-6 rounded-lg shadow-lg z-10">
        <h2 className="text-black text-2xl font-bold mb-4">{delivery.acf.shipment_name}</h2>
        <p><strong>Hinta:</strong> {delivery.acf.price} €</p>
        <p><strong>Toimitus:</strong> {delivery.acf.delivery_date}</p>
        <p><strong>Nouto:</strong> {delivery.acf.pickup_date}</p>
        <br></br>
        <p><strong>Paino:</strong> {delivery.acf.weight} kg</p>
        <p><strong>Yksiköt:</strong> {delivery.acf.transport_units}</p>
        <p><strong>Lisätietoa:</strong> {delivery.acf.details}</p>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
