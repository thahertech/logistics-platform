import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '@/app/dashboard/Layout'; 
import Modal from './Modal'; // Import Modal component
import '../app/globals.css';

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get('http://truckup.local/wp-json/wp/v2/kuljetus'); 
        setDeliveries(response.data);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        setError('Failed to fetch deliveries.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

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
      <div className="flex flex-col justify-center items-center p-8 bg-gray-200">
        <h2 className="text-2xl text-gray-700 font-bold mb-6">Deliveries</h2>
        {loading ? (
          <p>Loading deliveries...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
            {deliveries.length > 0 ? (
              deliveries.map(delivery => (
                <div
                  key={delivery.id}
                  className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                  onClick={() => handleCardClick(delivery)} // Pass the delivery object
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{delivery.acf.nimi}</h3>
                  <p className="text-gray-600 mb-1"><strong>Toimitus:</strong> {delivery.acf.toimitus}</p>
                  <p className="text-gray-600 mb-1"><strong>Nouto:</strong> {delivery.acf.nouto}</p>
                  <p className="text-gray-600 mb-1"><strong>Paino:</strong> {delivery.acf.paino} kg</p>
                </div>
              ))
            ) : (
              <p>No deliveries found.</p>
            )}
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} delivery={selectedDelivery} />
    </Layout>
  );
};

export default Deliveries;
