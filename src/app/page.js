'use client';
import Layout from './dashboard/Layout';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Styles/Dashboard.module.css';
import './globals.css';
import FunFacts from './dashboard/funfacts';

const Dashboard = () => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <Layout>
      <div className={styles.hero}>
        <div className={styles.line}>
        <h3>  Tehosta kuljetuksia
        </h3>
        <h4>
        ja löydä ratkaisu nopeasti !
        </h4>
        </div>
      </div>

      <div className={styles.container}>
        {[
          { src: '/assets/TruckImg.jpeg', title: 'Lähellä', path: '/deliveries-nearby' },
          { src: '/assets/Newimage.jpeg', title: 'Kuljetustilaus', path: '/createShipment' },
          { src: '/assets/Truck1.jpeg', title: 'Löydä toimitus', path: '/marketplace' }
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
      <h2 className={styles.sectionTitle}>Kysymyksiä tai tarvitsetko tukea?</h2>
    <p className={styles.sectionContent1}>
      Ota yhteyttä tiimiimme saadaksesi apua. Olemme täällä auttaaksemme sinua kaikissa kysymyksissäsi palveluistamme tai alustastamme.
    </p>
      </div>

      <div className={styles.section}>
        <FunFacts />
      </div>

      <div className={styles.section}>
    <h2 className={styles.sectionTitle}>Kysymyksiä tai tarvitsetko tukea?</h2>
    <p className={styles.sectionContent}>
      Ota yhteyttä tiimiimme saadaksesi apua. Olemme täällä auttaaksemme sinua kaikissa kysymyksissäsi palveluistamme tai alustastamme.
    </p>
    <button className={styles.contactButton} onClick={() => router.push('/contact')}>
      Ota yhteyttä
    </button>
  </div>

  <div className={styles.hero2}>
    <h2>Löydä ja myy kuljetus omilla ehdoilla</h2>
  </div>
</Layout>
  );
};

export default Dashboard;
