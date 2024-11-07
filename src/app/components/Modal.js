import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShipmentModal = ({ isOpen, onClose, shipmentId }) => {
  const [shipmentData, setShipmentData] = useState(null);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal if the click is on the overlay
    }
  };

  // Fetch shipment data when modal opens and shipmentId changes
  useEffect(() => {
    if (isOpen && shipmentId) {
      const fetchShipmentData = async () => {
        try {
          const jwtToken = localStorage.getItem('token');
          const response = await axios.get(`http://truckup.local/wp-json/wc/v3/products/${shipmentId}`, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
          console.log("Fetched Shipment Data:", response.data); // Log the fetched data
          setShipmentData(response.data);
        } catch (error) {
          console.error('Error fetching shipment data:', error);
        }
      };

      fetchShipmentData();
    }
  }, [isOpen, shipmentId]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Shipment Details</h2>
        
        {shipmentData ? (
          <div className="space-y-3">
            <p><strong>Company Name:</strong> {shipmentData.name || 'N/A'}</p>
            <p><strong>Contact Person:</strong> {shipmentData.meta_data?.find(meta => meta.key === 'contact_person')?.value || 'N/A'}</p>
            <p><strong>Email:</strong> {shipmentData.meta_data?.find(meta => meta.key === 'email')?.value || 'N/A'}</p>
            <p><strong>Phone Number:</strong> {shipmentData.meta_data?.find(meta => meta.key === 'phone_number')?.value || 'N/A'}</p>
            <p><strong>Y-Tunnus:</strong> {shipmentData.meta_data?.find(meta => meta.key === 'y_tunnus')?.value || 'N/A'}</p>
            <p><strong>Pickup Address:</strong> {shipmentData.meta_data?.find(meta => meta.key === 'pickup_address')?.value || 'N/A'}</p>
            <p><strong>Pickup Date:</strong> {shipmentData.meta_data?.find(meta => meta.key === 'pickup_date')?.value || 'N/A'}</p>
            <p><strong>Delivery Address:</strong> {shipmentData.meta_data?.find(meta => meta.key === 'delivery_address')?.value || 'N/A'}</p>
            <p><strong>Delivery Date:</strong> {shipmentData.meta_data?.find(meta => meta.key === 'delivery_date')?.value || 'N/A'}</p>
            <p><strong>Weight:</strong> {shipmentData.weight || 'N/A'} kg</p>
            <p><strong>Transport Units:</strong> {shipmentData.meta_data?.find(meta => meta.key === 'transport_units')?.value || 'N/A'}</p>
            <p><strong>Unit Type:</strong> {shipmentData.meta_data?.find(meta => meta.key === 'unit_type')?.value || 'N/A'}</p>
            <p><strong>Price:</strong> {shipmentData.regular_price || 'N/A'} €</p>
            <p><strong>Details:</strong> {shipmentData.description || 'N/A'}</p>
          </div>
        ) : (
          <p>Loading shipment details...</p>
        )}
      </div>
    </div>
  );
};

export default ShipmentModal;
