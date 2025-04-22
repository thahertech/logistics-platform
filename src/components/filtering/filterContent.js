import React from 'react';

const ContentList = ({ filteredShipments }) => {
  return (
    <div>
      {filteredShipments.length === 0 ? (
        <p>No shipments found</p>
      ) : (
        filteredShipments.map(item => (
          <div key={item.id}>
            <h4>{item.shipment_identifier}</h4>
            <p>{item.weight} kg</p>
            <p>{item.price} €</p>
            <p>{item.agreement_type}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ContentList;