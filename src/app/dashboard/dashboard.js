'use client';

import Layout from './dashboard/Layout';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Styles/Dashboard.module.css';
import './globals.css';
import FunFacts from './funfacts';

const Dashboard = () => {
  const router = useRouter();

  const handleDeliveriesNearbyClick = () => {
    router.push('/deliveries-nearby');
  };

  const handleCreateShipmentClick = () => {
    router.push('/createShipment');
  };

  const handleMarketplaceClick = () => {
    router.push('/marketplace');
  };

  return (
    <Layout>
      <div className={styles.hero}>
        <h1 className={styles.DashboardTitle}>TruckUp</h1>
        <div className={styles.line}>Hero Text</div>
      </div>

      <div className={styles.container}>
        <div className={styles.card} onClick={handleDeliveriesNearbyClick}>
          <Image
            src="/assets/TruckImg.jpeg"
            alt="Deliveries Nearby"
            width={500}
            height={300}
            className={styles.cardImage}
            priority
          />
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Lähellä</h2>
          </div>
        </div>

        <div className={styles.card} onClick={handleCreateShipmentClick}>
          <Image
            src="/assets/Newimage.jpeg"
            alt="Create Shipment"
            width={500}
            height={300}
            className={styles.cardImage}
            priority
          />
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Kuljetustilaus</h2>
          </div>
        </div>

        <div className={styles.card} onClick={handleMarketplaceClick}>
          <Image
            src="/assets/Truck1.jpeg"
            alt="Marketplace"
            width={500}
            height={300}
            className={styles.cardImage}
            priority
          />
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Avoimet kuljetukset</h2>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.testimonialContainer}>

          </div>
        </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Have questions or need support?</h2>
        <p className={styles.sectionContent}>
          Get in touch with our team for assistance. We're here to help you with any inquiries you may have about our services or platform.
        </p>
        <button className={styles.contactButton} onClick={() => router.push('/contact')}>
          Contact Us
        </button>
      </div>

      <div className={styles.hero2}>
        <h2>Löydä ja myy kuljetus omilla ehdoilla</h2>
      </div>
    </Layout>
  );
};

export default Dashboard;
