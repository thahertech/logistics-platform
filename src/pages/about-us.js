import React from 'react';
import Layout from '@/app/Dashboard/Layout';
import styles from '../app/Styles/page.module.css';
import '../app/globals.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faSeedling, faHandsHelping, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {
  return (
    <Layout>
      <div className={`${styles.hero} ${styles.aboutUsHero}`}>
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
            <h3><FontAwesomeIcon icon={faWrench} /> Luotettavuus</h3>
            <p>Asiakkaamme voivat luottaa palveluihimme.</p>
          </div>
          <div className={styles.card}>
            <h3><FontAwesomeIcon icon={faSeedling} /> Kestävyys</h3>
            <p>Minimoimme ympäristövaikutuksemme kaikissa toiminnoissamme.</p>
          </div>
          <div className={styles.card}>
            <h3><FontAwesomeIcon icon={faHandsHelping} /> Asiakaskeskeisyys</h3>
            <p>Asiakkaamme ovat kaiken toimintamme keskiössä.</p>
          </div>
          <div className={styles.card}>
            <h3><FontAwesomeIcon icon={faLightbulb} /> Innovaatio</h3>
            <p>Etsimme jatkuvasti uusia tapoja parantaa palveluitamme ja prosessejamme.</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
         <div className={styles.sectionTitle}></div>
        <p className={styles.sectionContent}>
          Haluatko tietää lisää? Ota rohkeasti yhteyttä tiimiimme, ja autamme sinua mielellämme kaikissa kysymyksissäsi.
        </p>
        <button className={styles.joinButton} onClick={() => window.location.href='/contact'}>
          Ota Yhteyttä
        </button>
      </div>
    </Layout>
  );
};

export default AboutUs;
