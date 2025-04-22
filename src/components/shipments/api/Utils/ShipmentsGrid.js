import React from 'react';
import ShipmentCard from '../../ShipmentCard';

const ShipmentsGrid = ({ shipments, openModal, filteredShipments, loading }) => {
  const shipmentsToDisplay = filteredShipments.length > 0 ? filteredShipments : shipments;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {shipmentsToDisplay.map((shipment) => (
        <ShipmentCard
          key={shipment.id}
          shipment={shipment}
          onClick={() => openModal(shipment.id)}
          className={shipment.locked ? 'bg-gray-500 opacity-50 cursor-not-allowed' : ''}
          title={shipment.locked ? 'Tämä kuljetus on lukittu' : ''}
        />
      ))}
      
      {!loading && shipmentsToDisplay.length === 0 && filteredShipments.length > 0 && (
        <p className="text-center text-gray-500 mt-8">
          Ei löytynyt kuljetuksia valituilla suodattimilla.
        </p>
      )}
    </div>
  );
};

export default ShipmentsGrid;