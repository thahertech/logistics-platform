// 'use client';
import React from 'react';
import styles from '../Styles/Dashboard.module.css';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerMain}>
          <div className={styles.footerGrid}>
            <div className={styles.footerSection}>
              <h3>Lähettäjille</h3>
              <ul>
                <li onClick={() => router.push('/createShipment')}>Jätä kuljetusilmoitus</li>
                <li onClick={() => router.push('/compare-prices')}>Vertaile hintoja</li>
                <li onClick={() => router.push('/track-shipment')}>Seuraa lähetystä</li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>Kuljettajille</h3>
              <ul>
                <li onClick={() => router.push('/products')}>Löydä kuljetuksia</li>
                <li onClick={() => router.push('/manage-orders')}>Hallinnoi tilauksia</li>
                <li onClick={() => router.push('/ourService')}>Kasvata liiketoimintaa</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
