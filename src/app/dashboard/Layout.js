import React from 'react';
import Link from 'next/link';
import styles from '../Styles/Layout.module.css';

const Layout = ({ children }) => {
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
        <Link href="/" className={styles.headerLogo}>
          Logistix
        </Link>
      <li className={styles.navItem}>
              <Link href="/auth" className={styles.navLink1}>kirjaudu</Link>
            </li>
            </div>

    </header>

      <main className={styles.mainContent}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>© 2024 TruckUp OY | All rights reserved.</p>
        <nav>
         <ul className={styles.footerMenu}>

            <li className={styles.footerItem}>
              <Link href="/contact" className={styles.footerLink}>Ota Yhteyttä</Link>
            </li>
            <li className={styles.footerItem}>
              <Link href="/marketplace" className={styles.footerLink}>Tietosuoja</Link>
            </li>
            <li className={styles.footerItem}>
              <Link href="/Profile" className={styles.footerLink}>Meistä</Link>
            </li>

 
          </ul>

        </nav>

      </footer>
    </>
  );
};

export default Layout;
