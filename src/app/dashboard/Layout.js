import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../Styles/Layout.module.css';

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage for a token to set authentication state
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/auth';
  };

  return (
    <>
      <header>
        <div className={styles.header}>
          <nav>
            <ul className={styles.navMenu}>
              <li className={styles.navItem}>
                <Link href="/" className={styles.navLink}>etusivu</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/createShipment" className={styles.navLink}>tilaus</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/marketplace" className={styles.navLink}>avoimet</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/Profile" className={styles.navLink}>oma tili</Link>
              </li>
            </ul>
          </nav>
          <Link href="/" className={styles.headerLogo}>Logistix</Link>
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
      <footer className={styles.footer}>
        <p className={styles.footerText}>© 2024 Logistix OY | All rights reserved.  Designed by Sensei Studios</p>
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