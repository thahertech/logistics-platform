import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app/Styles/Checkout.module.css';
import { useRouter } from 'next/router';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const router = useRouter();


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    } else {
    }
  });

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: {item.price} €</p>
              <p>Quantity: 1</p>
            </div>
          ))}
        </div>
      )}
      <button className="place-order-button">Place Order</button>
    </div>
  );
};

export default Checkout;
