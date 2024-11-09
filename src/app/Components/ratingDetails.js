import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RatingsList = () => {
    const [ratings, setRatings] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchRatings = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get('http://truckup.local/wp-json/wp/v2/rating', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRatings(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching ratings:', error);
                setErrorMessage('Failed to fetch ratings. Please try again later.');
            }
        };

        fetchRatings();
    }, []);

    return (
        <div>
          <h3>User Ratings</h3>
          {ratings.length === 0 ? (
            <p>No ratings found.</p>
          ) : (
            ratings.map((rating) => (
              <div key={rating.slug} className="border rounded-lg p-4 mb-4 bg-gray-50 shadow">
                <p><strong>Rating:</strong> {rating.acf.rating} / 5</p>
                <p><strong>Comment:</strong> {rating.acf.comment}</p>
                <p><strong>Date:</strong> {new Date(rating.date).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      );
    };
    
    export default RatingsList;
    