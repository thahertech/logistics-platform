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
          Olemme johtava kuljetuspalveluyritys Suomessa, joka on erikoistunut tarjoamaan asiakkaillemme tehokkaita ja luotettavia kuljetusratkaisuja.
          Tiimimme koostuu kokeneista ammattilaisista, jotka ovat sitoutuneet tarjoamaan parasta mahdollista palvelua.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Missiomme</h2>
        <p className={styles.sectionContent}>
          Missiomme on tehdä kuljetusprosesseista mahdollisimman sujuvia ja ympäristöystävällisiä. 
          Uskomme, että voimme parantaa asiakaskokemusta tarjoamalla innovatiivisia ratkaisuja ja läpinäkyvyyttä kaikissa toiminnoissamme.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Arvomme</h2>
        <ul className={styles.benefitsList}>
          <li>🔧 **Luotettavuus**: Meille on tärkeää, että asiakkaamme voivat luottaa palveluihimme.</li>
          <li>🌱 **Kestävyys**: Pyrimme minimoimaan ympäristövaikutuksemme kaikissa toiminnoissamme.</li>
          <li>🤝 **Asiakaskeskeisyys**: Asiakkaamme ovat kaiken toimintamme keskiössä, ja teemme työtä heidän tarpeidensa mukaisesti.</li>
          <li>💡 **Innovaatio**: Etsimme jatkuvasti uusia tapoja parantaa palveluitamme ja prosessejamme.</li>
        </ul>
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
