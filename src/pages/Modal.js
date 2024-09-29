// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, delivery }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="text-black bg-white p-6 rounded-lg shadow-lg z-10">
        <h2 className="text-black text-2xl font-bold mb-4">{delivery.acf.nimi}</h2>
        <p><strong>Toimitus:</strong> {delivery.acf.toimitus}</p>
        <p><strong>Nouto:</strong> {delivery.acf.nouto}</p>
        <p><strong>Paino:</strong> {delivery.acf.paino} kg</p>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
