import React from 'react';
import Layout from '@/app/dashboardTEMP/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faLeaf, faChartLine, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import styles from '../app/Styles/page.module.css';
import '../app/globals.css';
import Image from 'next/image';

const MeidanPalvelusta = () => {
  return (
    <Layout>
      <div className={`${styles.hero} ${styles.serviceHero}`}>
        <h2 className={styles.DashboardTitle}>Meidän Palvelusta</h2>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Mitä tämä palvelu tarjoaa?</h2>
        <p className={styles.sectionContent}>
          Digitaalinen alusta, joka yhdistää tavaran ja kuljettajat,<br/> mahdollistaen suoraviivaivsen ja luotettavan toimitusprosessin.
        </p>
      </div>
      <div className={styles.ServiceContainers}>
      <Image
              src="/assets/Sunset-logistics.jpg"
              alt="sunset-image"
              width={styles.serviceImage}
              height={styles.serviceImage}
              className={styles.serviceImage}
            />
      <div className={styles.MasonryContainer}>

        <div className={styles.masonryItem}>
          <h2 className={styles.sectionTitle}>Toimintatapa?</h2>
          <p className={styles.sectionContent}>
            1. <strong>Julkaise toimitus</strong>: Lähettäjä voi julkaista toimitustarpeen nopeasti.
            <br /> 2. <strong>Etsi toimitus</strong>: Kuljetusyritykset selaa avoimia toimituksia ja tarjoaa.
            <br /> 3. <strong>Hyväksy toimitus</strong>: Varmistuksen jälkeen automaattinen dokumentointi
          </p>
        </div>

        <div className={styles.masonryItem}>
          <h2 className={styles.sectionTitle}>Sopivuus?</h2>
          <p className={styles.sectionContent}>
            Palvelumme on ihanteellinen sekä yrityksille että yksityishenkilöille, jotka tarvitsevat ekologisen tavan hallita toimituksiaan.<br/>
            Kuljetusyrityksille helppo tapa löytää uusia asiakkaita ja optimoida tyhjiä kilometrejä.

          </p>
        </div>

        <div className={styles.masonryItem}>
          <h2 className={styles.sectionTitle}>Miksi Logistix?</h2>
          <ul className={styles.benefitsList}>
            <li><FontAwesomeIcon icon={faRocket} /> Nopeus: Julkaise ja kilpailuta toimituksesi muutamalla klikkauksella.</li>
            <li><FontAwesomeIcon icon={faLeaf} /> Ekologisuus: Yksinkertaisesti säästät luontoa.</li>
            <li><FontAwesomeIcon icon={faChartLine} /> Kasvata Bisnestäsi: Kuljetusyritykset voivat laajentaa asiakaskuntaansa tehokkaasti.</li>
            <li><FontAwesomeIcon icon={faBriefcase} /> Helppokäyttöisyys: Palvelu on selkeä ja käyttäjäystävällinen kaikille.</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Haluatko Aloittaa?</h2>
        <p className={styles.sectionContent}>
          Rekisteröidy ja aloita nyt. Olemme täällä auttamassa sinua kaikissa vaiheissa. Klikkaa alla olevaa painiketta ja liity joukkoomme.
        </p>
        <button className={styles.joinButton} onClick={() => window.location.href='/contact'}>
          Liity Nyt
        </button>
      </div>
      </div>

    </Layout>
  );
};

export default MeidanPalvelusta;
