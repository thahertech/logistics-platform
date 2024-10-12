import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../dashboard/Layout';
import styles from '../Styles/orderForm.module.css';

const OrderForm = () => {
  const [cartItems, setCartItems] = useState([]);
  const [billingDetails, setBillingDetails] = useState({
    yritys: '',
    osoite: '',
    postinumero: '',
    kaupunki: '',
    maa: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCartData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token ei löydy.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://truckup.local/wp-json/wc/store/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data.items || []);
    } catch (err) {
      setError('Ostoskoria ei voitu ladata.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (cartItems.length === 0) {
      setMessage('Ostoskorisi on tyhjä.');
      return;
    }

    const lineItems = cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      payment_method: 'bacs',
      payment_method_title: 'Tilisiirto',
      set_paid: true,
      billing: {
        company: billingDetails.yritys,
        address_1: billingDetails.osoite,
        postcode: billingDetails.postinumero,
        city: billingDetails.kaupunki,
        country: billingDetails.maa,
      },
      line_items: lineItems,
    };

    try {
      const response = await axios.post('http://truckup.local/wp-json/wc/v3/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(`Tilaus onnistui! Tilausnumero: ${response.data.id}`);
      setCartItems([]);
      setBillingDetails({
        yritys: '',
        osoite: '',
        postinumero: '',
        kaupunki: '',
        maa: '',
      });
    } catch (error) {
      setMessage('Tilauksen tekeminen epäonnistui. Yritä uudelleen.');
    }
  };

  return (
    <Layout>
      <main className={styles.mainContent}>
        <div className={styles.leftColumn}>
          {loading && <p>Ladataan ostoskorin tietoja...</p>}
          {error && <p className={styles.error}>{error}</p>}
          {!loading && cartItems.length === 0 && <p>Ostoskorisi on tyhjä.</p>}
          {!loading && cartItems.length > 0 && (
            <form className={styles.orderForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Yritys:</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Yrityksen nimi"
                  value={billingDetails.yritys}
                  onChange={(e) => setBillingDetails({ ...billingDetails, yritys: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Osoite:</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Osoite"
                  value={billingDetails.osoite}
                  onChange={(e) => setBillingDetails({ ...billingDetails, osoite: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Postinumero:</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Postinumero"
                  value={billingDetails.postinumero}
                  onChange={(e) => setBillingDetails({ ...billingDetails, postinumero: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Kaupunki:</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Kaupunki"
                  value={billingDetails.kaupunki}
                  onChange={(e) => setBillingDetails({ ...billingDetails, kaupunki: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Maa:</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Maa"
                  value={billingDetails.maa}
                  onChange={(e) => setBillingDetails({ ...billingDetails, maa: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton}>Lähetä tilaus</button>
              {message && <p className={styles.message}>{message}</p>}
            </form>
          )}
        </div>
        <div className={styles.rightColumn}>
          <h3>Tilausyhteenveto</h3>
          {cartItems.length > 0 && (
            <div className={styles.cartDetails}>
              {cartItems.map((item, index) => (
                <div key={item.product_id || index} className={styles.cartItem}>
                  <p>Tuote ID: {item.id}</p>
                  <p>Määrä: {item.quantity}</p>
                  <p>Hinta: {item.price} €</p>
                  <p>Noutopäivä: {item.pickup_date}</p>
                  <p>Sijainti: {item.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default OrderForm;
