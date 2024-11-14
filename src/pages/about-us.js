import React from 'react';
import Layout from '../app/Dashboard/Layout';
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
        <p className={styles.sectionContent}>
          Olemme palveluyritys Suomesta. Erikoistumme tarjoamaan tehokkaan ja luotettavan palvelualustan.
          Tiimimme koostuu ongelmanratkaisijoista, jotka ovat sitoutuneet tarjoamaan parasta mahdollista palvelua.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Tavoite</h2>
        <p className={styles.sectionContent}>
          Kuljetusprosessien suoraviivaisuus ja ympäristöystävällisyys. Kehitämme asiakaskokemusta tarjoamalla innovatiivisia ratkaisuja ja läpinäkyvyyttä.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Arvot</h2>
        <div className={`${styles.cardContainer}`}>
          <div className={styles.card}>
            <h3><FontAwesomeIcon icon={faWrench} /> Luotettavuus</h3>
            <p>Asiakkaat voivat luottaa alustaan</p>
          </div>
          <div className={styles.card}>
            <h3><FontAwesomeIcon icon={faSeedling} /> Kestävyys</h3>
            <p>Korostamme ekologisuutta kaikessa toiminnassa</p>
          </div>
          <div className={styles.card}>
            <h3><FontAwesomeIcon icon={faHandsHelping} /> Asiakaskeskeisyys</h3>
            <p>Asiakkaat ovat toiminnan keskiössä</p>
          </div>
          <div className={styles.card}>
            <h3><FontAwesomeIcon icon={faLightbulb} /> Innovaatio</h3>
            <p>Etsimme jatkuvasti uusia tapoja parantaa palveluita ja prosesseja. </p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
         <div className={styles.sectionTitle}></div>
        <p className={styles.sectionContent}>
          Haluatko tietää lisää? Ota yhteyttä tiimiin ja autamme sinua.
        </p>
        <button className={styles.joinButton} onClick={() => window.location.href='/contact'}>
          Ota Yhteyttä
        </button>
      </div>
    </Layout>
  );
};

export default AboutUs;
