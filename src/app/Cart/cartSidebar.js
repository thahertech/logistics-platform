import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../Styles/CartSidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
import '../globals.css';

const CartSidebar = ({ isOpen, onClose }) => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchCartData = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token not found.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://truckup.local/wp-json/wc/store/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(token);

      setCartData(response.data.items || []);
    } catch (err) {
      setError('Failed to load cart data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token not found.');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.data.user.id;

      const response = await axios.get(`http://truckup.local/wp-json/wp/v2/users/${userId}?_fields=name,email,acf`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      setUserData(userData);
    } catch (error) {
      setError('Failed to fetch user details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCartData();
      fetchUserDetails();
    }
  }, [isOpen]);

  const handleDeleteItem = async (key) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://truckup.local/wp-json/wc/store/cart/items/${key}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    if (response.status === 200 || response.status === 204) {
      console.log('Item deleted successfully');

      fetchCartData();
    } else {
      console.log('Failed to delete item. Status:', response.status);
      fetchCartData();
    }
  } catch (err) {
    console.error('Error deleting the item:', err);
    fetchCartData();
  }
};
const handleDeleteAllItems = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.delete('http://truckup.local/wp-json/wc/store/cart/items', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 || response.status === 204) {
      alert('Ostoskori tyhjennetty!');
      setCartData([]);
    } else {
      console.log('Failed to delete items. Status:', response.status);
    }
  } catch (error) {
    console.error('Failed to delete all items:', error);
    setError('Failed to delete all items.');
  }
};


  const handleCheckout = () => {
    window.location.href = '/checkout';
  };

  const renderCartItems = () => {
    if (loading) return <p>Loading cart...</p>;
    if (error) return <p>{error}</p>;
    if (cartData.length === 0) return <p>Your cart is empty.</p>;

    return cartData.map(item => (
      <li key={item.id} className={styles.cartItem}>
        <img
          src={item.images[0]?.src}
          alt={item.name || 'No name'}
          className={styles.cartItemImage}
        />

        <div className={styles.cartItemDetails}>
          <h4 className={styles.cartItemName}>{item.name || 'No name'}</h4>
          <p className={styles.cartItemPrice}>{item.regular_price ? `${item.regular_price}€` : 'Price missing'}</p>
          <p className={styles.cartItemQuantity}>Quantity: {item.quantity || '1'}</p>
          {item.sku && <p className={styles.cartItemSku}>SKU: {item.sku}</p>}
          <button className={styles.deleteButton} onClick={() => handleDeleteItem(item.key)}>
            <FontAwesomeIcon icon={faTrashAlt} /> Remove
          </button>
        </div>
      </li>
    ));
  };

  return (
    <div className={`${styles.cartSidebar} ${isOpen ? styles.open : ''}`}>
      <button onClick={onClose} className={styles.closeButton}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2 className={styles.cartTitle}>
        <FontAwesomeIcon icon={faShoppingCart} /> Cart
      </h2>

      <ul className={styles.cartList}>
        {renderCartItems()}
      </ul>
      <div className={styles.footer}>
        {cartData.length > 0 && (
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        )}
      </div>
      <button className={styles.deleteButton} onClick={() => handleDeleteAllItems()}>
      <FontAwesomeIcon icon={faTrashAlt} /> Remove
      </button>
    </div>
  );
};

export default CartSidebar;