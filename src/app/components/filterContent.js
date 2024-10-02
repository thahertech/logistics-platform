import React from 'react';

// Function to calculate the distance between two coordinates (Haversine formula)
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers
  return distance;
};

const ContentList = ({ filters }) => {
  const allItems = []; // Your array of items with coordinates

  const filteredItems = allItems.filter(item => {
    const {
      pickupLocation,
      deliveryLocation,
      price,
      date,
      transportType
    } = filters;

    // Coordinates for pickup and delivery locations from filter
    const filterPickup = pickupLocation ? pickupLocation : null;  // Assuming it's an object {lat, lng}
    const filterDelivery = deliveryLocation ? deliveryLocation : null;

    // Matching pickup location by proximity (within a 10 km radius)
    const matchesPickup = filterPickup
      ? calculateDistance(
          filterPickup.lat,
          filterPickup.lng,
          item.acf.pickup_location.lat,
          item.acf.pickup_location.lng
        ) < 10  // Check if the distance is less than 10 km
      : true;

    // Matching delivery location by proximity (within a 10 km radius)
    const matchesDelivery = filterDelivery
      ? calculateDistance(
          filterDelivery.lat,
          filterDelivery.lng,
          item.acf.delivery_location.lat,
          item.acf.delivery_location.lng
        ) < 10  // Check if the distance is less than 10 km
      : true;

    const matchesPrice = price ? item.acf.price <= price : true;

    const matchesDate =
      date === 'now'
        ? new Date(item.acf.pickup_date).getDate() === new Date().getDate()
        : date === 'tomorrow'
        ? new Date(item.acf.pickup_date).getDate() ===
          new Date().getDate() + 1
        : date === 'nextWeek'
        ? new Date(item.acf.pickup_date) > new Date() &&
          new Date(item.acf.pickup_date) <=
            new Date().setDate(new Date().getDate() + 7)
        : true;

    const matchesTransportType = transportType.length
      ? transportType.includes(item.acf.transport_units)
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
          <h4>{item.acf.shipment_name}</h4>
          <p>{item.acf.weight} kg</p>
          <p>{item.acf.price} €</p>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
