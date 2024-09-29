import { useState } from 'react';
import axios from 'axios';

const RatingForm = ({ userId }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Ensure your token is stored in local storage

      const response = await axios.post('http://truckup.local/wp-json/custom/v1/rate-user', {
        rated_user_id: userId,
        rating,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data); // Success message
      console.log('set rating');
      setRating(0); // Reset rating
    } catch (error) {
      console.error('Error submitting rating:', error);
      setMessage('Failed to submit rating.');
    }
  };

  return (
    <form onSubmit={handleRatingSubmit}>
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value={0}>Select Rating</option>
        <option value={1}>1 Star</option>
        <option value={2}>2 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={5}>5 Stars</option>
      </select>
      <button type="submit">Submit Rating</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RatingForm;
