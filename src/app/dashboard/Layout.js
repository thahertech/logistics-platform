import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../Styles/Layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import CartSidebar from '../components/cartSidebar';
import {jwtDecode} from 'jwt-decode'; 

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    jwtDecode(token);


    setIsAuthenticated(!!token);

    if (token) {
      fetchCartCount(token);
    }
    else {
      
    }
  }, []);

  const fetchCartCount = async (token) => {
    try {

      const response = await axios.get('http://truckup.local/wp-json/wc/store/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartCount(response.data.items.length);
      console.log(response.data.items);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/auth';
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };



  return (
    <>
      <header>
        <div className={styles.header}>
          <Link href="/" className={styles.headerLogo}>Logistix</Link>
          <nav>
            <ul className={styles.navMenu}>
              <li className={styles.navItem}>
                <Link href="/" className={styles.navLink}>etusivu</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/createShipment" className={styles.navLink}>tilaus</Link>
              </li>
              {isAuthenticated && (
                <>
                  <li className={styles.navItem}>
                    <Link href="/products" className={styles.navLink}>Tuotteet</Link>
                  </li>
                  <li className={styles.navItem}>
                    <Link href="/Profile" className={styles.navLink}>oma tili</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className={styles.cartContainer} onClick={toggleCart}>
            <FontAwesomeIcon icon={faShoppingCart} className={styles.cartIcon} />
            {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
          </div>
          <li className={styles.navItem}>
            {isAuthenticated ? (
              <button className={styles.navLink1} onClick={handleLogout}>
                Kirjaudu Ulos
              </button>
            ) : (
              <Link href="/auth" className={styles.navLink1}>Kirjaudu</Link>
            )}
          </li>
        </div>
      </header>
      <main className={styles.mainContent}>
        {children}
      </main>
      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />
      <footer className={styles.footer}>
        <p className={styles.footerText}>© 2024 Logistix OY | All rights reserved. Designed by Sensei Studios</p>
        <nav>
          <ul className={styles.footerMenu}>
            <li className={styles.footerItem}>
              <Link href="/contact" className={styles.footerLink}>Ota Yhteyttä</Link>
            </li>
            <li className={styles.footerItem}>
              <Link href="/marketplace" className={styles.footerLink}>Tietosuoja</Link>
            </li>
            <li className={styles.footerItem}>
              <Link href="/aboutUs" className={styles.footerLink}>Meistä</Link>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
};

export default Layout;
