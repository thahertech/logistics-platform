import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../Styles/Layout.module.css';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import footerImg from '../../../public/assets/logistix-logos/svg/logo.svg';
import '../globals.css';

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    if (token) {
      jwtDecode(token);
    }
  }, []);

  return (
    <>
      <div className={styles.layoutContainer}>
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
                <Link href="/our-service" className={styles.navLink}>Yrityksille</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/contact" className={styles.navLink}>Ota yhteyttä</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/about-us" className={styles.navLink}>Meistä</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className={styles.mainContent}>
          {children}
        </main>

        <footer className={styles.footer}>
          <Image
            src={footerImg}
            alt="Logistix Logo"
            width={75}
            height={75}
            className={styles.footerLogo}
          />
          <p className={styles.footerText}>Logistix OY 3487288-6</p>
          <p className={styles.footerText}>Designed by Sensei Studios</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
