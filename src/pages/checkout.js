import React, { useState, useEffect } from 'react';
import styles from '../app/Styles/Checkout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Ensure axios is imported
import {jwtDecode} from 'jwt-decode'; // Ensure jwt-decode is imported

const CheckoutSidebar = ({ isOpen, onClose }) => {
  const [cartData, setCartData] = useState([]); // Initialize cartData state
  const [loading, setLoading] = useState(false); // Initialize loading state
  const [error, setError] = useState(null); // Initialize error state

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');

      try {
        // Decode the JWT to validate (you might want to handle validation here)
        jwtDecode(token);

        const response = await axios.get('http://truckup.local/wp-json/wc/store/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartData(response.data.items || []);
      } catch (err) {
        setError('Failed to load cart data.');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCartData(); // Only fetch cart data if the sidebar is open
    }
  }, [isOpen]); // Add isOpen to dependency array to fetch data when sidebar opens

  return (
    <div className={`${styles.checkoutSidebar} ${isOpen ? styles.open : ''}`}>
      <button onClick={onClose} className={styles.closeButton}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2>Checkout</h2>

      {/* Handle loading state */}
      {loading ? (
        <p>Loading cart...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {cartData.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span> - <span>{item.price}€</span>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.footer}>
        <button className={styles.completePurchaseButton}>Complete Purchase</button>
      </div>
    </div>
  );
};

export default CheckoutSidebar;
