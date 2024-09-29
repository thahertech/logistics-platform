import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const UserRating = () => {
    const [userId, setUserId] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const token = localStorage.getItem('token'); // Ensure your token is stored in local storage

    useEffect(() => {
        // Check for token and decode it
        if (token) {
            const decodedToken = jwtDecode(token);
            const id = decodedToken.data.user.id; // Adjust according to your JWT structure
            setUserId(id); // Set user ID to state
            console.log('User ID:', id);
        } else {
            console.error('No token found');
        }
    }, [token]); // Dependency array includes token

    // Fetch user ratings only when userId is available
    useEffect(() => {
        if (userId) {
            fetchAverageRating(userId);
        }
    }, [userId]); // Dependency array includes userId

    const fetchAverageRating = async (id) => {
        try {
            const response = await axios.get(`http://truckup.local/wp-json/custom/v1/user-ratings/${id}`);
            setAverageRating(response.data.average_rating); // Assuming your API returns { average_rating: value }
            console.log('Average Rating:', response.data.average_rating);
        } catch (error) {
            console.error('Error fetching user ratings:', error);
        }
    };

    return (
        <div>
            <h2>User Rating</h2>
            {userId ? (
                <p>Average Rating: {averageRating}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserRating;
