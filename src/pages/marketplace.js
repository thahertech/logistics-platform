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
  const [filters, setFilters] = useState({}); // To store filters

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get('http://truckup.local/wp-json/wp/v2/kuljetus');
        setDeliveries(response.data);
        setFilteredDeliveries(response.data); // Initially display all deliveries
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        setError('Failed to fetch deliveries.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  // Function to apply the filters
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
        ? delivery.acf.nouto.toLowerCase().includes(pickupLocation.toLowerCase())
        : true;

      const matchesDelivery = deliveryLocation
        ? delivery.acf.toimitus.toLowerCase().includes(deliveryLocation.toLowerCase())
        : true;

      const matchesPrice = price ? delivery.acf.hinta <= price : true;

      const matchesDate = date === 'now'
        ? new Date(delivery.acf.pvm).getDate() === new Date().getDate()
        : date === 'tomorrow'
        ? new Date(delivery.acf.pvm).getDate() === new Date().getDate() + 1
        : date === 'nextWeek'
        ? new Date(delivery.acf.pvm) > new Date() && new Date(delivery.acf.pvm) <= new Date().setDate(new Date().getDate() + 7)
        : true;

      const matchesTransportType = transportType.length
        ? transportType.includes(delivery.acf.kuljetustyyppi)
        : true;

      return (
        matchesPickup &&
        matchesDelivery &&
        matchesPrice &&
        matchesDate &&
        matchesTransportType
      );
    });

    setFilteredDeliveries(filtered); // Update the filtered deliveries
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
        {/* Sidebar for filtering deliveries */}
        <FilterSidebar applyFilters={applyFilters} />

        {/* Main content area */}
        <div className="flex flex-col justify-center items-center p-8 bg-gray-200 w-full">
          <h2 className="text-2xl text-gray-700 font-bold mb-6">Deliveries</h2>
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{delivery.acf.nimi}</h3>
                    <p className="text-gray-600 mb-1"><strong>Toimitus:</strong> {delivery.acf.toimitus}</p>
                    <p className="text-gray-600 mb-1"><strong>Nouto:</strong> {delivery.acf.nouto}</p>
                    <p className="text-gray-600 mb-1"><strong>Paino:</strong> {delivery.acf.paino} kg</p>
                    <p className="text-gray-600 mb-1"><strong>Hinta:</strong> {delivery.acf.hinta} €</p>
                  </div>
                ))
              ) : (
                <p>No deliveries found.</p>
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
