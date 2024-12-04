import React from 'react';
import Layout from '@/app/Dashboard/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faLeaf, faChartLine, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import styles from '@/app/Styles/page.module.css';
import '@/app/globals.css';
import Image from 'next/image';
import Head from 'next/head';

const MeidanPalvelusta = () => {
  return (

    <Layout>
    <Head>
    <title>Yrityksille - Logistix</title>
    <meta name="description" content="Ota yhteyttä Logistixiin, olemme täällä auttamassa kaikissa kysymyksissäsi." />
  </Head>
      <div className={styles.sectionHero}>
        <h2 className={styles.sectionTitle}>Palvelu tarjoaa</h2>
        <p className={styles.sectionContent}>
          Keskeisen markkinapaikan yhdistäen tavaran ja kuljettajat<br/>
        </p>
      </div>


      <div className={styles.ServiceContainers}>
      <Image
              src={"/assets/harbour.jpg"}
              alt="sunset-image"
              width="2000"
              height="400"
              className={styles.serviceImage}
            />

      <div className={styles.MasonryContainer}>

        <div className={styles.masonryItem}>
          <h2 className={styles.sectionTitle}>Toimintatapa</h2>
          <p className={styles.sectionContent}>
            1. <strong>Julkaise toimitus</strong>: Lähettäjä voi julkaista toimitustarpeen nopeasti.
            <br />
            <br /> 2. <strong>Etsi toimitus</strong>: Kuljetusyritys selaa avoimia toimituksia ja tarjoaa.
            <br />
            <br /> 3. <strong>Hyväksy toimitus</strong>: Varmistuksen jälkeen automaattinen dokumentointi
          </p>
        </div>

        <div className={styles.masonryItem}>
          <h2 className={styles.sectionTitle}>Sopivuus</h2>
          <p className={styles.sectionContent}>
            Palvelu on ihanteellinen yrityksille, jotka tarvitsevat ekologisen ja luotettavan tavan kilpailuttaa toimituskustannuksia.<br/><br />
            Kuljetusyritykselle helppo tapa löytää uusia asiakkaita ja optimoida tyhjiä kilometrejä.
          </p>
        </div>

        <div className={styles.masonryItem}>
          <h2 className={styles.sectionTitle}>Miksi Logistix</h2>
          <ul className={styles.benefitsList}>
            <li><FontAwesomeIcon icon={faRocket} /> Nopeus: Julkaise ja kilpailuta toimituksesi muutamalla klikkauksella.</li>
            <li><FontAwesomeIcon icon={faLeaf} /> Ekologisuus: Yksinkertaisesti säästät luontoa.</li>
            <li><FontAwesomeIcon icon={faChartLine} /> Kasvata Bisnestäsi: Yritykset voivat laajentaa asiakaskuntaansa tehokkaasti.</li>
            <li><FontAwesomeIcon icon={faBriefcase} /> Helppokäyttöisyys: Palvelu on selkeä ja käyttäjäkeskeinen.</li>
          </ul>
        </div>
</div>

      <div className={styles.Herosection}>

<Image
              src={"/assets/asiakas-matka.png"}
              alt="customer-journey"
              width="2000"
              height="700"
              className={styles.customerImage}
            />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Mukaan kehitykseen?</h2>
        <p className={styles.sectionContent}>
          Olemme täällä auttamassa sinua kaikissa vaiheissa. Klikkaa alla olevaa painiketta ja liity yhteistyökumppaniksi.
        </p>
        <button className={styles.joinButton} onClick={() => window.location.href='/contact'}>
          Liity nyt
        </button>
      </div>
      </div>

    </Layout>
  );
};

export default MeidanPalvelusta;
