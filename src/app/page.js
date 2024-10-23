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
        <h3> Tehosta toimintaasi ja löydä seuraava kuljetus
        </h3>
        <h4>
        Lähellä olevat toimitukset käden ulottuvilla.
        </h4>
        </div>
      </div>

      <div className={styles.containerHero}>
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
      <div className={styles.serviceSection}>
  <div className={styles.cardContainer}>
    {[
      { icon: '🚚', title: 'Nopeat toimitukset', description: 'Löydä ja tilaa kuljetus nopeasti ja luotettavasti.' },
      { icon: '🔒', title: 'Turvallisuus', description: 'Kaikki toimitukset ovat vakuutettuja ja turvallisia.' },
      { icon: '💼', title: 'Yrityksille', description: 'Räätälöityjä ratkaisuja yrityksille ja liiketoimintaan.' },
      { icon: '🌍', title: 'Ympäristöystävällisyys', description: 'Kestäviä kuljetusratkaisuja, jotka minimoivat hiilijalanjälkesi.' },
      { icon: '🤝', title: '24/7 Asiakastuki', description: 'Asiakastukemme auttaa sinua milloin tahansa.' }
    ].map((card, index) => (
      <div key={index} className={styles.serviceCard}>
        <div className={styles.icon}>{card.icon}</div>
        <h3 className={styles.infoCardtitle}>{card.title}</h3>
        <p className={styles.cardDescription}>{card.description}</p>
      </div>
    ))}
  </div>
</div>

      <div className={`${styles.section} ${styles.whyChooseUs}`}>
<div className={styles.sectionHeader}>
  <h2 className={styles.sectionTitle}>Miksi valita palvelumme?</h2>
  <p className={styles.sectionContent1}>
    Tarjoamme ympäristöystävällisiä kuljetusratkaisuja, jotka eivät ainoastaan vähennä hiilijalanjälkeäsi, vaan myös tarjoavat kilpailukykyiset hinnat.
  </p>
  </div>
  <ul className={styles.benefitsList}>
    <li>🌱 <h4>Ympäristöystävällisyys</h4> Käytämme kestäviä käytäntöjä minimoidaksemme ympäristövaikutuksemme.</li>
    <li>💰 <h4>Kilpailukykyiset hinnat</h4> Tarjoamme laadukkaita palveluja kohtuulliseen hintaan.</li>
    <li>📦 <h4>Luotettavat palvelut</h4> Meidän tiimimme on sitoutunut tarjoamaan luotettavia ja ajantasaisia toimituksia.</li>
    <li>🤝 <h4>Asiakastuki</h4> Olemme täällä auttamassa sinua kaikissa kysymyksissäsi palveluistamme tai alustastamme.</li>
  </ul>
</div>


      <div className={styles.sectionFun}>
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

  <footer className={styles.footer}>
  <div className={styles.footerContent}>
    <div className={styles.footerMain}>
      <div className={styles.footerGrid}>
        <div className={styles.footerSection}>
          <h3>Lähettäjille</h3>
          <ul>
            <li>Jätä kuljetusilmoitus</li>
            <li>Vertaile hintoja</li>
            <li>Seuraa lähetystä</li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Kuljettajille</h3>
          <ul>
            <li>Löydä kuljetuksia</li>
            <li>Hallinnoi tilauksia</li>
            <li>Kasvata liiketoimintaa</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</footer>
</Layout>
  );
};

export default Dashboard;
