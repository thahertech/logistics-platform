// DeliveryDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '@/app/dashboard/Layout';

const DeliveryDetails = () => {
  const { id } = useParams();
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      try {
        const response = await axios.get(`http://truckup.local/wp-json/wp/v2/kuljetus/${id}`);
        setDelivery(response.data);
      } catch (error) {
        console.error('Error fetching delivery details:', error);
        setError('Failed to fetch delivery details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryDetails();
  }, [id]);

  return (
    <Layout>
      <div className="p-8 bg-gray-200">
        {loading ? (
          <p>Loading delivery details...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{delivery.acf.nimi}</h2>
            <p><strong>Toimitus:</strong> {delivery.acf.toimitus}</p>
            <p><strong>Nouto:</strong> {delivery.acf.nouto}</p>
            <p><strong>Paino:</strong> {delivery.acf.paino} kg</p>
            {/* Add more fields as necessary */}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DeliveryDetails;
