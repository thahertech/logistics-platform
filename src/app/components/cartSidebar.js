import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../Styles/CartSidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {jwtDecode} from 'jwt-decode';
import '../globals.css';

const CartSidebar = ({ isOpen, onClose }) => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCheckout, setIsCheckout] = useState(false);

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token not found.');
        setLoading(false);
        return;
      }

      jwtDecode(token);

      try {

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
      fetchCartData();
    }
  }, [isOpen]);

  const handleDeleteItem = async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://truckup.local/wp-json/wc/store/cart/remove-item/${itemId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
  
      if (response.status === 204) { // Check if deletion was successful
        // Update state to reflect the deleted item
        setCartData(prevData => prevData.filter(item => item.id !== itemId));
      }
    } catch (error) {
      console.error("Failed to delete the item:", error);
      setError('Failed to delete the item.'); // Optional: set error state to display an error message
    }
  };
  
  

  const handleCheckout = () => {
    // Toggle to checkout view
    setIsCheckout(true);
  };

  const handleCompleteCheckout = async () => {
    console.log("Checkout completed with data: ", cartData);
    // API call here
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

  const renderCheckoutForm = () => {
    return (
      <div className={styles.checkoutForm}>
        <h3>Checkout Form</h3>
        <form onSubmit={handleCompleteCheckout}>

          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" required />
          </div>
          

          <button type="submit" className={styles.completePurchaseButton}>Complete Purchase</button>
        </form>
        <button onClick={() => setIsCheckout(false)} className={styles.backToCartButton}>
          Back to Cart
        </button>
      </div>
    );
  };

  return (
    <div className={`${styles.cartSidebar} ${isOpen ? styles.open : ''}`}>
      <button onClick={onClose} className={styles.closeButton}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2 className={styles.cartTitle}>
        <FontAwesomeIcon icon={faShoppingCart} /> Cart
      </h2>
      
      {!isCheckout ? (
        <>
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
        </>
      ) : (
        renderCheckoutForm()
      )}
    </div>
  );
};

export default CartSidebar;
