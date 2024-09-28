'use client';
import Layout from './dashboard/Layout';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Styles/Dashboard.module.css';
import './globals.css';

const Dashboard = () => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <Layout>
      <div className={styles.hero}>
        <h1 className={styles.DashboardTitle}>TruckUp</h1>
        <div className={styles.line}>Hero Text</div>
      </div>

      <div className={styles.container}>
        {[
          { src: '/assets/TruckImg.jpeg', title: 'Lähellä', path: '/deliveries-nearby' },
          { src: '/assets/Newimage.jpeg', title: 'Kuljetustilaus', path: '/createShipment' },
          { src: '/assets/Truck1.jpeg', title: 'Avoimet kuljetukset', path: '/marketplace' }
        ].map((card, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => navigateTo(card.path)}
            tabIndex={0}
            role="button"
            onKeyPress={(e) => e.key === 'Enter' && navigateTo(card.path)}
          >
            <Image
              src={card.src}
              alt={card.title}
              width={500}
              height={300}
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{card.title}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.testimonialContainer}>
          <div className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              "TruckUp has revolutionized our logistics operations. The platform is intuitive and saves us a lot of time!"
            </p>
            <p className={styles.testimonialAuthor}>Company A</p>
          </div>
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
