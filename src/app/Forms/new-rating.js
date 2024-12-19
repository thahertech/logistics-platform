import { useState } from 'react';
import { supabase } from '../../supabaseClient'; // Assuming you have Supabase client set up
import styles from '../Styles/Ratings.module.css';

const DeliveryRatingForm = ({ userId, deliveryId }) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      try {
        const { data, error } = await supabase
          .from('user_ratings')
          .insert([
            {
              user_id: userId,
              rating,
              comment,
              // Optional: associate rating with a specific delivery if you have a delivery_id
              // delivery_id: deliveryId,
            },
          ]);
  
        if (error) {
          throw error;
        }
  
        // Handle success (e.g., show a confirmation message, clear the form)
        setRating(1);
        setComment('');
        alert('Rating submitted successfully');
      } catch (err) {
        setError('Failed to submit rating. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className={styles.formContainer}>
        <h3 className={styles.formTitle}>Rate Your Delivery</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Rating</label>
            <select
              className={styles.select}
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Comment</label>
            <textarea
              className={styles.textarea}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Optional feedback"
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Rating'}
          </button>
        </form>
      </div>
    );
  };
  
  export default DeliveryRatingForm;