import React, { useState } from 'react';
import Layout from '@/app/Dashboard/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faLeaf, faChartLine, faBriefcase, faCog } from '@fortawesome/free-solid-svg-icons';
import styles from '@/app/Styles/page.module.css';
import '@/app/globals.css';
import Image from 'next/image';
import Head from 'next/head';

const MeidanPalvelusta = () => {
  const [selectedRole, setSelectedRole] = useState('Kuljettaja');

  return (

    <Layout>
      <Head>
      <title>Logistiikkaratkaisut Yrityksille - Logistix</title>
      <meta name="description" content="Vähennä logistiikkakustannuksia ja paranna ympäristöystävällisyyttä innovatiivisilla Logistix-palveluilla." />
    </Head>

    <div className={`${styles.hero} ${styles.yrityksilleHero}`}>
    <Image
              src={"/assets/backgrounds/harbour.jpg"}
              alt="sunset-image"
              width="1000"
              height="200"
              className={styles.serviceImage}
              priority
            />

<div className={styles.sectionHero}>
        <h2 className={styles.sectionTitle}>Tehokkaampi ja kestävämpi kuljetusratkaisu yrityksille</h2>
        <p className={styles.sectionContent}>
        Logistix tarjoaa innovatiivisen ja tehokkaan alustan yrityksille, jotka haluavat löytää kuljetuksen vaivattomasti ja kilpailukykyisesti.
        </p>
      </div>

</div>

<div className={styles.sectionYrityksille}>
  <h2 className={styles.sectionTitle}>Logistiikan Haasteet</h2>
  <p className={styles.sectionContentYrityksille}>
    Logistiikka-alalla yksi suurimmista ongelmista on tyhjien ajokilometrien määrä, mikä johtaa 
    sekä korkeisiin kustannuksiin että ympäristöhaittoihin. Kuljetusyritykset ajavat usein tyhjää, 
    koska kuljetusreiteillä ei ole täysiä lastauksia tai paluukuormia, mikä lisää polttoaineenkulutusta 
    ja päästöjä. Tämä on kestämätön tilanne niin taloudellisesti kuin ekologisesti.
  </p>
  <p className={styles.sectionContentYrityksille}>
    Logistix tarjoaa ratkaisun tähän ongelmaan. Alustamme mahdollistaa kuljetusyrityksille tehokkaamman 
    reittien suunnittelun ja vähentää tyhjiä kilometrejä yhdistämällä lähettäjät ja kuljetusyritykset 
    helposti. Tämä ei ainoastaan pienennä kuljetuskustannuksia, vaan tarjoaa myös lähettäjille mahdollisuuden 
    tehdä ympäristöystävällisempiä valintoja kilpailukykyisin hinnoin. Kustannustehokkaat, kilpailutetut ja kestävämmät kuljetukset 
    hyödyttävät sekä yrityksiä että ympäristöä.
  </p>
</div>



<div className={styles.buttonGroup}>
  <div className={styles.buttonGroupText}>Katso tästä miten voimme auttaa</div>
          <button
            className={`${styles.roleButton} ${selectedRole === 'Kuljettaja' ? styles.activeButton : ''}`}
            onClick={() => setSelectedRole('Kuljettaja')}
          >
            Kuljettaja
          </button>
          <button
            className={`${styles.roleButton} ${selectedRole === 'Lähettäjä' ? styles.activeButton : ''}`}
            onClick={() => setSelectedRole('Lähettäjä')}
          >
            Lähettäjä
          </button>
        </div>

        <div className={styles.imageContainer}>
        

    

        {/* <div className={styles.masonryItem}>
          <h2 className={styles.sectionTitle}>Sopivuus</h2>
          <p className={styles.sectionContent}>
          •	<strong>Yrityksille:</strong> Luo kustannustehokas ja ympäristöystävällinen tapa kilpailuttaa kuljetukset. <br />
•	<strong>Kuljetusyrityksille:</strong> Löydä uusia asiakkaita ja optimoi ajoreittisi tyhjien kilometrien vähentämiseksi.
          </p>
        </div> */}

<div className={styles.phaseContainer}>
  {selectedRole === 'Kuljettaja' && (
    <>
      {/* Images */}
      <Image
        src="/assets/animations/kuljettaja.png"
        alt="customer-journey Kuljettaja"
        width={2000}
        height={700}
        className={styles.customerImage}
      />
      <Image
        src="/assets/animations/etsitoimitus.png"
        alt="customer-journey Kuljettaja"
        width={2000}
        height={700}
        className={styles.customerImage}
      />
      <Image
        src="/assets/animations/kuljetusnouto.png"
        alt="customer-journey Kuljettaja"
        width={2000}
        height={700}
        className={styles.customerImage}
      />
      <Image
        src="/assets/animations/toimitus.png"
        alt="customer-journey Kuljettaja"
        width={2000}
        height={700}
        className={styles.customerImage}
      />
      <Image
        src="/assets/animations/kohteessa.png"
        alt="customer-journey Kuljettaja"
        width={2000}
        height={700}
        className={styles.customerImage}
      />

      {/* Phase Descriptions */}
      <div className={styles.phaseDescriptions}>
        <div className={styles.phase}>
          <strong>Kuljettaja</strong>
          <p>Luo kuljetuskäyttäjä ja löydä sopiva kuljetus.</p>
        </div>
        <div className={styles.phase}>
          <strong>Etsi kuljetus</strong>
          <p>Selaa avoimia kuljetustilauksia ja valitse kuljetus.</p>
        </div>
        {/* <div className={styles.phase}>
          <strong>Vahvistettu</strong>
          <p>Vahvista kuljetustehtävä ja tarkista yksityiskohdat.</p>
        </div> */}
        <div className={styles.phase}>
          <strong>Nouto</strong>
          <p>Nouda toimitus ja seuraa sen etenemistä.</p>
        </div>
        <div className={styles.phase}>
          <strong>Kuljetus</strong>
          <p>Hoida kuljetus turvallisesti ja aikataulussa.</p>
        </div>
        <div className={styles.phase}>
          <strong>Kohteessa</strong>
          <p>Lasku lähtee Logistixille automaattisesti.</p>
        </div>
      </div>
    </>
  )}
</div>

{selectedRole === 'Lähettäjä' && (
  <div className={styles.phaseContainer}>
    <Image
      src={"/assets/animations/tavaranlähettäjä.png"}
      alt="customer-journey Lähettäjä"
      width="2000"
      height="700"
      className={styles.customerImage}
    />
     <Image
      src={"/assets/animations/etsitoimitus.png"}
      alt="customer-journey Lähettäjä"
      width="2000"
      height="700"
      className={styles.customerImage}
    />
     <Image
      src={"/assets/animations/tavaranluovutus.png"}
      alt="customer-journey Lähettäjä"
      width={400}
      height={700}
      className={styles.customerImage}
    />
          <Image
        src="/assets/animations/toimitus.png"
        alt="customer-journey Kuljettaja"
        width={2000}
        height={700}
        className={styles.customerImage}
      />
     <Image
      src={"/assets/animations/kohteessa.png"}
      alt="customer-journey Lähettäjä"
      width="2000"
      height="700"
      className={styles.customerImage}
    />
    <div className={styles.phaseDescriptions}>
      <div className={styles.phase}>
        <strong>Lähettäjä</strong>
        <p>Luo lähettäjäkäyttäjä ja löydä sopiva kuljettaja.</p>
      </div>
      <div className={styles.phase}>
        <strong>Luo ilmoitus</strong>
        <p>Kilpailuta kuljetustilaus yhdellä ilmoituksella ja löydä ostaja.</p>
      </div>
      {/* <div className={styles.phase}>
        <strong>Hyväksytty</strong>
        <p>Saat sähköpostiin tilausvahvistuksen.</p>
      </div> */}
      <div className={styles.phase}>
        <strong>Luovutus</strong>
        <p>Valmistele lähetys kuljetusta varten.</p>
      </div>
      <div className={styles.phase}>
        <strong>Kuljetus</strong>
        <p>Voit seurata kuljetuksen etenemistä.</p>
      </div>
      <div className={styles.phase}>
        <strong>Laskutus</strong>
        <p>Kun toimitus saapuu kohteeseen, saat laskun.</p>
      </div>
    </div>
  </div>
)}
  <div className={styles.MasonryContainer}>

{/* <div className={styles.masonryItem}>
  <h2 className={styles.sectionTitle}>Toimintatapa</h2>
  <p className={styles.sectionContent}>
    1. <strong>Julkaise toimitus</strong>: Lähettäjä voi julkaista toimitustarpeen nopeasti.
    <br />
    <br /> 2. <strong>Etsi toimitus</strong>: Kuljetusyritys selaa avoimia toimituksia ja tarjoaa.
    <br />
    <br /> 3. <strong>Hyväksy toimitus</strong>: Varmistuksen jälkeen automaattinen dokumentointi
  </p>
</div> */}

<div className={styles.masonryItem}>
  <h2 className={styles.sectionTitle}>Miksi Logistix</h2>
  <ul className={styles.benefitsList}>
    <li>
      <FontAwesomeIcon icon={faRocket} className={styles.animatedIcon} /> 
      Nopeus: Julkaise ja kilpailuta toimituksesi muutamalla klikkauksella.
    </li>
    <li>
      <FontAwesomeIcon icon={faLeaf} className={styles.animatedIcon} /> 
      Ekologisuus: Vähemmän tyhjiä ajokilometrejä ja kestävämpi logistiikka.
    </li>
    <li>
      <FontAwesomeIcon icon={faChartLine} className={styles.animatedIcon} /> 
      Kasvata Bisnestäsi: Yritykset voivat laajentaa asiakaskuntaansa tehokkaasti.
    </li>
    <li>
      <FontAwesomeIcon icon={faBriefcase} className={styles.animatedIcon} /> 
      Helppokäyttöisyys: Käyttäjäystävällinen alusta, joka sopii kaiken kokoisille yrityksille.
    </li>
    <li>
      <FontAwesomeIcon icon={faCog} className={styles.animatedIcon} /> 
      Tekoäly: Reittien optimointi, mikä mahdollistaa ekologisemmat ja edullisemmat hinnat.
    </li>
  </ul>
</div>
      </div>


      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Mukaan kehitykseen?</h2>
        <p className={styles.sectionContent}>
          Olemme täällä auttamassa sinua kaikissa vaiheissa. Klikkaa alla olevaa painiketta niin kerromme lisää.
        </p>
        <button className={styles.joinButton} onClick={() => window.location.href='/yhteys'}>
          Liity nyt
        </button>
      </div>
      </div>

    </Layout>
  );
};

export default MeidanPalvelusta;
