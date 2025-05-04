import React from 'react';
import Layout from '@/components/Layout/Layout';
import styles from '@/app/Styles/page.module.css';
import '../globals.css';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faSeedling, faHandsHelping, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { GoogleTagManager } from '@next/third-parties/google';

export const metadata = {
  title: 'Logistix | Meistä',
  description: 'Logistix - Yhdistämme lähetykset kuljetuspalveluihin sujuvaa logistiikkaa varten.',
};

const AboutUs = () => {

  return (
    <Layout>
        <GoogleTagManager gtmId="GTM-T7GRXLNQ" />

        <Head>
    <title>Meistä - Logistix</title>
    <meta name="description" content="Lisätietoa Logistixistä" />
    
  </Head>

      <div className={`${styles.hero} ${styles.aboutUsHero}`}>

      <div className={styles.aboutUsSectionHero}>
      <h2 className={styles.sectionTitle}>Olemme palveluyritys Suomesta.</h2>
        <p className={styles.sectionContent}>
          Erikoistumme tarjoamaan tehokkaan ja luotettavan palvelualustan.
          Tiimimme koostuu ongelmanratkaisijoista, jotka ovat sitoutuneet tarjoamaan parasta mahdollista palvelua.
        </p>
      </div>
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
            <p>Etsimme jatkuvasti uusia tapoja parantaa palveluita ja prosesseja</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
         <div className={styles.sectionTitle}></div>
        <p className={styles.sectionContent}>
          Haluatko tietää lisää? Ota yhteyttä tiimiin ja autamme sinua.
        </p>
      </div>
    </Layout>
  );
};

export default AboutUs;
