import React, { useEffect, useState } from 'react';
import Layout from '@/app/dashboard/Layout';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import '../app/globals.css';
import UserRating from './ratingDetails';
import Rating from './rating';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUserDetails = async () => {
      if (!token) {
          setError('No authentication token found.');
          setLoading(false);
          return;
      }
  
      try {
  
  
          const decoded = jwtDecode(token); // Decode the token
  
          const response = await axios.get('http://truckup.local/wp-json/wp/v2/users/me', {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          console.log('User Details Response:', response.data); 
          setUserDetails(response.data);
          
      } catch (error) {
          console.error('Error fetching user details', error); 
          setError('Failed to fetch user details.');
      } finally {
          setLoading(false);
      }
    };
  
    fetchUserDetails();
  }, []); 
  return (
    <Layout>
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="text-black bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl text-black text-gray-700 font-bold mb-6 text-center">Profiili</h2>
          {loading ? (
            <p>Odota hetki...</p> 
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div>
              <p><strong>Nimi:</strong> {userDetails?.name}</p>
              <p><strong>Sähköposti:</strong> {userDetails?.email}</p>
              <p><strong>Osoite:</strong> {userDetails?.address}</p>
              <Rating/>
              <UserRating/>

            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;