import React from 'react';
import styles from '../Styles/orderForm.module.css';

const CartItem = ({ item }) => (
    <div className={styles.cartItem}>
        <p>Tuote ID: {item.id}</p>
        <p>Määrä: {item.quantity}</p>
        <p>Hinta: {item.prices.price}{item.prices.currency_symbol}</p>
        <p>Noutopäivä: {item.pickup_date}</p>
        <p>Sijainti: {item.location}</p>
    </div>
);

export default CartItem;
