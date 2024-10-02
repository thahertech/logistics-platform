import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilterSidebar from '../app/components/sideBar'; // Ensure the import is correct
import Layout from '../app/dashboard/Layout'; // Ensure the import is correct
import Modal from './Modal'; // Ensure the import is correct
import '../app/globals.css';

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [filters, setFilters] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    price: '',
    date: 'now',
    transportType: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://truckup.local/wp-json/wp/v2/kuljetus', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDeliveries(response.data);
        setFilteredDeliveries(response.data);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        setError('Failed to fetch deliveries.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  // The modified applyFilters function
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    const filtered = deliveries.filter((delivery) => {
      const {
        pickupLocation,
        deliveryLocation,
        price,
        date,
        transportType
      } = newFilters;

      // Matches pickup location
      const matchesPickup = pickupLocation
        ? delivery.acf.pickup_location &&
          delivery.acf.pickup_location.lat === pickupLocation.lat &&
          delivery.acf.pickup_location.lng === pickupLocation.lng
        : true;

      // Matches delivery location
      const matchesDelivery = deliveryLocation
        ? delivery.acf.delivery_location &&
          delivery.acf.delivery_location.lat === deliveryLocation.lat &&
          delivery.acf.delivery_location.lng === deliveryLocation.lng
        : true;

      // Matches price
      const matchesPrice = price ? parseFloat(delivery.acf.price) <= parseFloat(price) : true;

      // Matches date
      const matchesDate = date === 'now'
        ? new Date(delivery.acf.pickup_date).toDateString() === new Date().toDateString()
        : date === 'tomorrow'
        ? new Date(delivery.acf.pickup_date).toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()
        : date === 'nextWeek'
        ? new Date(delivery.acf.pickup_date) > new Date() && new Date(delivery.acf.pickup_date) <= new Date(new Date().setDate(new Date().getDate() + 7))
        : true;

      // Matches transport type
      const matchesTransportType = transportType.length
        ? transportType.includes(delivery.acf.transport_type) // Check if transport type matches
        : true;

      return (
        matchesPickup &&
        matchesDelivery &&
        matchesPrice &&
        matchesDate &&
        matchesTransportType
      );
    });

    setFilteredDeliveries(filtered);
  };

  const handleCardClick = (delivery) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDelivery(null);
  };

  const handlePurchase = async (deliveryId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://truckup.local/wp-json/wp/v2/purchase-shipment', {
        deliveryId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Purchase successful!');
      // Optionally refresh the deliveries or navigate to a confirmation page
    } catch (error) {
      console.error('Error purchasing delivery:', error);
      alert('Failed to purchase delivery.');
    }
  };

  return (
    <Layout>
      <div className="flex">
        <FilterSidebar applyFilters={applyFilters} />
        <div className="flex flex-col justify-center items-center p-8 bg-gray-200 w-full">
          <h2 className="text-2xl text-gray-700 font-bold mb-6">Kuljetukset</h2>
          {loading ? (
            <p>Loading deliveries...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
              {filteredDeliveries.length > 0 ? (
                filteredDeliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                    onClick={() => handleCardClick(delivery)}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{delivery.acf.shipment_name}</h3>
                    <p className="text-gray-600 mb-1"><strong>Toimituspvm:</strong> {delivery.acf.delivery_date}</p>
                    <p className="text-gray-600 mb-1"><strong>Noutopvm:</strong> {delivery.acf.pickup_date}</p>
                    <p className="text-gray-600 mb-1"><strong>Paino:</strong> {delivery.acf.weight} kg</p>
                    <p className="text-gray-600 mb-1"><strong>Hinta:</strong> {delivery.acf.price} €</p>
                    <p className="text-gray-600 mb-1"><strong>Lisätietoa:</strong> {delivery.acf.details}</p>
                  </div>
                ))
              ) : (
                <p>Ei kuljetuksia</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} delivery={selectedDelivery} onPurchase={handlePurchase} />
    </Layout>
  );
};

export default Deliveries;
