import React, { useEffect, useState } from 'react';
import Layout from '@/app/dashboard/Layout';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../app/globals.css';
import UserRating from '../app/components/ratingDetails';
import { useForm } from 'react-hook-form';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deliveriesPosted, setDeliveriesPosted] = useState([]);
  const [deliveriesPurchased, setDeliveriesPurchased] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('User not signed in.');
      setLoading(false);
      return;
    }


    const fetchUserDetails = async () => {
      try {
        const decoded = jwtDecode(token); // Decode token
        const userId = decoded.data.user.id; // Extract user ID from decoded token

        // Fetch user details, including ACF fields
        const response = await axios.get(`http://truckup.local/wp-json/wp/v2/users/${userId}?_fields=name,email,acf`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;

        // Populate form with user details and ACF fields
        reset({
          name: userData.name,
          email: userData.email,
          'y-tunnus': userData.acf['y-tunnus'], // Access ACF fields
          nettisivut: userData.acf['nettisivut'],
        });

        setUserDetails(userData); // Store user details
      } catch (error) {
        setError('Failed to fetch user details.');
      } finally {
        setLoading(false);
      }
    };

    const fetchDeliveries = async () => {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        const userId = decoded.data.user.id;

        const postedResponse = await axios.get(`http://truckup.local/wp-json/wc/v3/products?author=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDeliveriesPosted(postedResponse.data);

        const purchasedResponse = await axios.get(`http://truckup.local/wp-json/wc/v3/orders?customer=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDeliveriesPurchased(purchasedResponse.data);
      } catch (error) {
        setError('Failed to fetch deliveries.');
      }
    };

    fetchUserDetails();
    fetchDeliveries();
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
      setError('Failed to update profile.');
    }
  };

  const isBuyer = userDetails?.user_type !== 'buyer';
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
            <>
              <div className="mb-6 flex">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`mr-4 p-2 rounded ${activeTab === 'profile' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  Profiilin tiedot
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`mr-4 p-2 rounded ${activeTab === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  Tilaukset
                </button>
                {isSeller && (
                  <button
                    onClick={() => setActiveTab('posted')}
                    className={`mr-4 p-2 rounded ${activeTab === 'posted' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    Julkaistut kuljetukset
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('rating')}
                  className={`mr-4 p-2 rounded ${activeTab === 'rating' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  Arvostelut
                </button>
              </div>

             {activeTab === 'profile' && (
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
                  <div className="mb-4">
                    <label htmlFor="companyId" className="block mb-2 text-gray-700">Y-Tunnus:</label>
                    <input
                      type="text"
                      {...register('y-tunnus')}
                      className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="url" className="block mb-2 text-gray-700">Nettisivut:</label>
                    <input
                      type="url"
                      {...register('nettisivut')}
                      className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                  <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-4 w-full hover:bg-blue-600 transition">Päivitä profiili</button>
                </form>
              )}

              {activeTab === 'orders' && (
                <div>
                  {deliveriesPurchased.length ? deliveriesPurchased.map(order => (
                    <div key={order.id} className="border rounded-lg p-4 mb-4 bg-gray-50 shadow">
                      <p><strong>Toimituksen nimi:</strong> {order.line_items[0].name}</p>
                      <p><strong>Päivämäärä:</strong> {new Date(order.date_created).toLocaleDateString()}</p>
                      <p><strong>Tilanne:</strong> {order.status}</p>
                      <p><strong>Kokonaiskustannus:</strong> {order.total} €</p>
                    </div>
                  )) : (
                    <p className="text-center">Ei ostettuja kuljetuksia.</p>
                  )}
                </div>
              )}

              {activeTab === 'posted' && isSeller && (
                <div className="content-container">
                  {deliveriesPosted.length ? deliveriesPosted.map(delivery => (
                    <div key={delivery.id} className="border rounded-lg p-4 mb-4 bg-gray-50 shadow">
                      <p><strong>Nimi:</strong> {delivery.name}</p>
                      <p><strong>Julkaisupäivämäärä:</strong> {new Date(delivery.date_created).toLocaleDateString()}</p>
                      <p><strong>Hinta:</strong> {delivery.price} €</p>
                    </div>
                  )) : (
                    <p className="text-center">Ei julkaistuja kuljetuksia.</p>
                  )}
                </div>
              )}


              {activeTab === 'rating' && (
                <UserRating />
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
