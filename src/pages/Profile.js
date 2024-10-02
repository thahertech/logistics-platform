import React, { useEffect, useState } from 'react';
import Layout from '@/app/dashboard/Layout';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../app/globals.css';
import UserRating from './ratingDetails';
import { useForm } from 'react-hook-form';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deliveriesPosted, setDeliveriesPosted] = useState([]);
  const [deliveriesPurchased, setDeliveriesPurchased] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [activeTab, setActiveTab] = useState('posted');
  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUserDetails = async () => {
      if (!token) {
        setError('No authentication token found.');
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const response = await axios.get('http://truckup.local/wp-json/wp/v2/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
        reset(response.data);
      } catch (error) {
        console.error('Error fetching user details', error);
        setError('Failed to fetch user details.');
      } finally {
        setLoading(false);
      }
    };

    const fetchUserDeliveries = async () => {
      const token = localStorage.getItem('token');
      try {
        // Fetching posted deliveries for users who want to offer shipments
        const postedResponse = await axios.get('http://truckup.local/wp-json/wp/v2/user-deliveries', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDeliveriesPosted(postedResponse.data);

        // Fetching purchased deliveries for users who want to buy shipments
        // const purchasedResponse = await axios.get('http://truckup.local/wp-json/wp/v2/sales', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // setDeliveriesPurchased(purchasedResponse.data);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        setError('Failed to fetch deliveries.');
      }
    };

    fetchUserDetails();
    fetchUserDeliveries();
  }, [reset]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://truckup.local/wp-json/wp/v2/update-user', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails(response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile', error);
      setError('Failed to update profile.');
    }
  };

  // Determine user type (you might want to refine this logic based on your user types)
  const isBuyer = userDetails?.user_type === 'buyer';
  const isSeller = userDetails?.user_type !== 'seller';

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl text-gray-800 font-bold mb-6 text-center">Profiili</h2>
          {loading ? (
            <p className="text-center">Odota hetki...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-gray-700">Nimi:</label>
                <input
                  type="text"
                  {...register('name')}
                  className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-gray-700">Sähköposti:</label>
                <input
                  type="email"
                  {...register('email')}
                  className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-4 w-full hover:bg-blue-600 transition">Päivitä profiili</button>
            </form>
          )}

          <div className="mt-8 flex justify-center">
            {isSeller && (
              <button
                onClick={() => setActiveTab('posted')}
                className={`mr-4 p-2 rounded transition ${activeTab === 'posted' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                Kaikki julkaistut kuljetukset
              </button>
            )}
            {isBuyer && (
              <button
                onClick={() => setActiveTab('purchased')}
                className={`mr-4 p-2 rounded transition ${activeTab === 'purchased' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                Kaikki ostetut kuljetukset
              </button>
            )}
            <button
              onClick={() => setActiveTab('rating')}
              className={`mr-4 p-2 rounded transition ${activeTab === 'rating' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              Arvostelut
            </button>
          </div>

          <div className="mt-4">
            {activeTab === 'posted' && isSeller ? (
              <div>
                {deliveriesPosted.length ? deliveriesPosted.map(delivery => (
                  <div key={delivery.id} className="border rounded-lg p-4 mb-4 bg-gray-50 shadow">
                    <p><strong>Toimituspvm:</strong> {delivery.delivery_date}</p>
                    <p><strong>Noutopvm:</strong> {delivery.pickup_date}</p>
                    <p><strong>Paino:</strong> {delivery.weight} kg</p>
                    <p><strong>Hinta:</strong> {delivery.price} €</p>
                  </div>
                )) : (
                  <p className="text-center">Ei julkaistuja kuljetuksia.</p>
                )}
              </div>
            ) : activeTab === 'purchased' && isBuyer ? (
              <div>
                {deliveriesPurchased.length ? deliveriesPurchased.map(delivery => (
                  <div key={delivery.id} className="border rounded-lg p-4 mb-4 bg-gray-50 shadow">
                    <p><strong>Toimituspvm:</strong> {delivery.delivery_date}</p>
                    <p><strong>Noutopvm:</strong> {delivery.pickup_date}</p>
                    <p><strong>Paino:</strong> {delivery.weight} kg</p>
                    <p><strong>Hinta:</strong> {delivery.price} €</p>
                  </div>
                )) : (
                  <p className="text-center">Ei ostettuja kuljetuksia.</p>
                )}
              </div>
            ) : activeTab === 'rating' ? (
              <UserRating />
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
