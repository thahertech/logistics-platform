import React from 'react';
import Layout from '@/app/dashboard/Layout'; 
import styles from '../app/Styles/page.module.css';
import '../app/globals.css';

const AboutUs = () => {
  return (
    <Layout>
      <div className={`${styles.hero} ${styles.aboutUsHero}`}>
        <h2 className={styles.DashboardTitle}>Tietoa Meistä</h2>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Kuka Me Olemme?</h2>
        <p className={styles.sectionContent}>
          Olemme johtava kuljetuspalveluyritys Suomessa, erikoistunut tarjoamaan asiakkaillemme 
          tehokkaita ja luotettavia kuljetusratkaisuja. Tiimimme koostuu kokeneista ammattilaisista, 
          jotka ovat sitoutuneet tarjoamaan parasta mahdollista palvelua.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Missiomme</h2>
        <p className={styles.sectionContent}>
          Missiomme on tehdä kuljetusprosesseista mahdollisimman sujuvia ja ympäristöystävällisiä. 
          Uskomme voivamme parantaa asiakaskokemusta tarjoamalla innovatiivisia ratkaisuja ja läpinäkyvyyttä kaikissa toiminnoissamme.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Arvomme</h2>
        <div className={`${styles.cardContainer}`}>
          <div className={styles.card}>
            <h3>🔧 Luotettavuus</h3>
            <p>Asiakkaamme voivat luottaa palveluihimme.</p>
          </div>
          <div className={styles.card}>
            <h3>🌱 Kestävyys</h3>
            <p>Minimoimme ympäristövaikutuksemme kaikissa toiminnoissamme.</p>
          </div>
          <div className={styles.card}>
            <h3>🤝 Asiakaskeskeisyys</h3>
            <p>Asiakkaamme ovat kaiken toimintamme keskiössä.</p>
          </div>
          <div className={styles.card}>
            <h3>💡 Innovaatio</h3>
            <p>Etsimme jatkuvasti uusia tapoja parantaa palveluitamme ja prosessejamme.</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Ota Yhteyttä</h2>
        <p className={styles.sectionContent}>
          Haluatko tietää lisää? Ota rohkeasti yhteyttä tiimiimme, ja autamme sinua mielellämme kaikissa kysymyksissäsi.
        </p>
        <button className={styles.contactButton} onClick={() => window.location.href='/contact'}>
          Ota Yhteyttä
        </button>
      </div>
    </Layout>
  );
};

export default AboutUs;
