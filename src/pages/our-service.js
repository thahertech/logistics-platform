import React from 'react';
import Layout from '@/app/Dashboard/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faLock, faChartLine, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import styles from '../app/Styles/page.module.css';
import '../app/globals.css';

const MeidanPalvelusta = () => {
  return (
    <Layout>
      <div className={`${styles.hero} ${styles.serviceHero}`}>
        <h2 className={styles.DashboardTitle}>Meidän Palvelusta</h2>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Mikä Tämä Palvelu On?</h2>
        <p className={styles.sectionContent}>
          Olemme digitaalinen alusta, joka yhdistää tuotteiden omistajat ja kuljetusyritykset, mahdollistaen nopean ja luotettavan toimitusprosessin. 
          Palvelumme on suunniteltu tekemään toimitukset helpoiksi, olitpa yksityishenkilö tai yritys.
        </p>
      </div>
      <div className={styles.MasonryContainer}>

        <div className={styles.masonryItem}>
          <h2 className={styles.sectionTitle}>Miten Se Toimii?</h2>
          <p className={styles.sectionContent}>
            1. <strong>Julkaise Toimitus</strong>: Tuotteen omistajat voivat julkaista toimitustarpeensa nopeasti.
            <br /> 2. <strong>Tarjoa Kuljetus</strong>: Kuljetusyritykset voivat selata avoimia toimituksia ja tarjota palveluitaan.
            <br /> 3. <strong>Varmista Toimitus</strong>: Kun kuljetus on hyväksytty, toimitusprosessi alkaa sujuvasti.
          </p>
        </div>

        <div className={styles.masonryItem}>
          <h2 className={styles.sectionTitle}>Kenelle Tämä On?</h2>
          <p className={styles.sectionContent}>
            Palvelumme on ihanteellinen sekä yrityksille että yksityishenkilöille, jotka tarvitsevat luotettavan tavan hallita toimituksiaan. 
            Kuljetusyrityksille tarjoamme helpon tavan löytää uusia asiakkaita ja kasvattaa liiketoimintaansa.
          </p>
        </div>

        <div className={styles.masonryItem}>
          <h2 className={styles.sectionTitle}>Miksi Valita Meidät?</h2>
          <ul className={styles.benefitsList}>
            <li><FontAwesomeIcon icon={faRocket} /> Nopeus: Julkaise ja varmista toimituksesi muutamalla klikkauksella.</li>
            <li><FontAwesomeIcon icon={faLock} /> Turvallisuus: Kaikki tiedonsiirto ja maksut ovat suojattuja ja luotettavia.</li>
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
    </Layout>
  );
};

export default MeidanPalvelusta;
