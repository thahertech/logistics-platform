import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '@/app/dashboard/Layout';
import Modal from './Modal';
import '../app/globals.css';
import FilterSidebar from '../app/components/sideBar';

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get('http://truckup.local/wp-json/wp/v2/kuljetus');
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

      const matchesPickup = pickupLocation
        ? delivery.acf.pickup_location ? delivery.acf.pickup_location.includes(pickupLocation) : false
        : true;

      const matchesDelivery = deliveryLocation
        ? delivery.acf.delivery_location ? delivery.acf.delivery_location.includes(deliveryLocation) : false
        : true;

      const matchesPrice = price ? parseFloat(delivery.acf.price) <= parseFloat(price) : true;

      const matchesDate = date === 'now'
        ? new Date(delivery.acf.pickup_date).getDate() === new Date().getDate()
        : date === 'tomorrow'
        ? new Date(delivery.acf.pickup_date).getDate() === new Date().getDate() + 1
        : date === 'nextWeek'
        ? new Date(delivery.acf.pickup_date) > new Date() && new Date(delivery.acf.pickup_date) <= new Date().setDate(new Date().getDate() + 7)
        : true;

      const matchesTransportType = transportType.length
        ? transportType.includes(delivery.acf.transport_type)
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
                  </div>
                ))
              ) : (
                <p>Ei kuljetuksia</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} delivery={selectedDelivery} />
    </Layout>
  );
};

export default Deliveries;
