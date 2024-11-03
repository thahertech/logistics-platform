import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../Styles/Layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import CartSidebar from '../components/cartSidebar';
import { jwtDecode } from 'jwt-decode';

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const [cartCount, setCartCount] = useState(0);
  //const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    if (token) {
      jwtDecode(token);
  //     fetchCartCount(token);
    }
  }, []);

  // const fetchCartCount = async (token) => {
  //   try {
  //     const response = await axios.get('http://truckup.local/wp-json/wc/store/cart', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setCartCount(response.data.items.length);
  //   } catch (error) {
  //     console.error('Error fetching cart count:', error);
  //   }
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   setIsAuthenticated(false);
  //   window.location.href = '/auth';
  // };

  // const toggleCart = () => {
  //   setIsCartOpen(!isCartOpen);
  // };

  return (
    <>
 <header className={styles.header}>
  <div className={styles.topRow}>
    <Link href="/" className={styles.headerLogo}>Logistix</Link>
    </div>


        {/* Bottom Row */}
        <nav className={styles.bottomRow}>
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>Etusivu</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/ourService" className={styles.navLink}>Palvelu</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>Ota Yhteyttä</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/aboutUs" className={styles.navLink}>Meistä</Link>
            </li>

            {isAuthenticated && (
              <>
                <li className={styles.navItem}>
                  <Link href="/createShipment" className={styles.navLink}>Tilaus</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/products" className={styles.navLink}>Tuotteet</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/Profile" className={styles.navLink}>Oma Tili</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <main className={styles.mainContent}>
        {children}
      </main>
   {  /* <CartSidebar isOpen={isCartOpen} onClose={toggleCart} /> */}
      
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
