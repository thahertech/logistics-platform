import React from 'react';

const ContentList = ({ filters }) => {
  const allItems = [];

  const filteredItems = allItems.filter(item => {
    const {
      pickupLocation,
      deliveryLocation,
      price,
      date,
      transportType
    } = filters;

    const matchesPickup = pickupLocation
      ? item.acf.pickupLocation.includes(pickupLocation)
      : true;

    const matchesDelivery = deliveryLocation
      ? item.acf.deliveryLocation.includes(deliveryLocation)
      : true;

    const matchesPrice = price ? item.price <= price : true;

    const matchesDate = date === 'now'
      ? new Date(item.date).getDate() === new Date().getDate()
      : date === 'tomorrow'
      ? new Date(item.date).getDate() === new Date().getDate() + 1
      : date === 'nextWeek'
      ? new Date(item.date) > new Date() && new Date(item.date) <= new Date().setDate(new Date().getDate() + 7)
      : true;

    const matchesTransportType = transportType.length
      ? transportType.includes(item.type)
      : true;

    return (
      matchesPickup &&
      matchesDelivery &&
      matchesPrice &&
      matchesDate &&
      matchesTransportType
    );
  });

  return (
    <div>
      {filteredItems.map(item => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          <p>{item.weight} kg</p>
          <p>{item.price} €</p>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
