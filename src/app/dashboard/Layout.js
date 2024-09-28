import React from 'react';
import Link from 'next/link';
import styles from '../Styles/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.headerLogo}>
          TruckUp
        </Link>
        <nav>
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>Koti</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/deliveries-nearby" className={styles.navLink}>Kuljetukset Lähellä</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/createShipment" className={styles.navLink}>Luo Kuljetustilaus</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/auth" className={styles.navLink}>Login</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>Ota Yhteyttä</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/Profile" className={styles.navLink}>Profiili</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.mainContent}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>© 2024 TruckUp. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;
