import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);

    if (token) {
      // Decode the token to check expiry and other details
      console.log('Token:', token);
      console.log('Decoded Token:', decodedToken);

      // Fetch user details with the token
      fetchUserDetails(decodedToken);
    } else {
      setError('No token found');
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get('http://truckup.local/wp-json/wp/v2/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails(response.data);
      console.log('User Details:', response.data);
    } catch (error) {
      console.error('Error fetching user details', error);
      setError('Failed to fetch user details.');
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {error && <p>Error: {error}</p>}
      {userDetails ? (
        <div>
          <h2>Welcome, {userDetails.name}</h2>
          <p>Email: {userDetails.email}</p>
          {/* Display other user details as necessary */}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Profile;