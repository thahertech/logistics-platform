'use client';
import React from 'react';
import styles from '@/app/Styles/Faq.module.css';
import '@/app/globals.css';
import Layout from '@/components/Layout/Layout';


const Faq = () => {
  return (
<Layout>
<div className={styles.faqContainer}>
      <h1>Usein Kysytyt Kysymykset</h1>

      <div className={styles.faqItem}>
        <h2>Mitä Logistix tarjoaa?</h2>
        <p>Logistix auttaa yrityksiä löytämään edullisia ja ekologisia kuljetusratkaisuja sekä tarjoaa kuljetusyrityksille mahdollisuuden löytää paluukuormia.</p>
      </div>

      <div className={styles.faqItem}>
        <h2>Kuinka kirjaudun sisään?</h2>
        <p>Voit kirjautua sisään käyttämällä rekisteröityä sähköpostiosoitettasi ja salasanaasi. Jos et ole vielä rekisteröitynyt, voit luoda tilin rekisteröitymissivulta.</p>
      </div>

      <div className={styles.faqItem}>
        <h2>Miten voin rekisteröityä palveluun?</h2>
        <p>Rekisteröityminen onnistuu klikkaamalla Rekisteröidy ja täyttämällä lomake tarvittavilla tiedoilla. Rekisteröitymiseen tarvitaan yrityksen tiedot ja voimassa oleva sähköpostiosoite.</p>
      </div>

      <div className={styles.faqItem}>
        <h2>Voinko seurata kuljetuksiani reaaliajassa?</h2>
        <p>Kyllä! Logistix tarjoaa mahdollisuuden seurata kuljetuksia reaaliajassa. Saat tiedot kuljetuksen sijainnista ja arvioidusta toimitusajasta.</p>
      </div>

      <div className={styles.faqItem}>
        <h2>Mitä tehdä, jos unohdin salasanani?</h2>
        <p>Voit palauttaa salasanasi napsauttamalla Unohtuiko salasana? -linkkiä kirjautumissivulla ja seuraamalla ohjeita.</p>
      </div>

      <div className={styles.faqItem}>
        <h2>Miten voin ottaa yhteyttä asiakaspalveluun?</h2>
        <p>Voit ottaa yhteyttä asiakaspalveluumme lähettämällä viestin yhteydenottolomakkeen kautta tai sähköpostitse osoitteeseen info@logistix.fi.</p>
      </div>

      <div className={styles.faqItem}>
        <h2>Onko Logistix-palvelu maksullinen?</h2>
        <p>Logistix tarjoaa sekä ilmaisia että maksullisia palveluja. Maksulliset palvelut sisältävät lisäominaisuuksia, kuten priorisoituja ilmoituksia ja laajennettua asiakastukea.</p>
      </div>

      <div className={styles.faqItem}>
        <h2>Voinko peruuttaa kuljetuksen?</h2>
        <p>Kyllä, kuljetuksen peruuttaminen onnistuu, mutta peruutusehdot riippuvat valitusta kuljetusyrityksestä. Tarkista peruutuskäytäntö varauksen yhteydessä.</p>
      </div>

      <div className={styles.faqItem}>
        <h2>Kuinka voin lisätä oman kuljetustarjoukseni?</h2>
        <p>Jos olet kuljetusyritys, voit lisätä oman kuljetustarjouksesi kirjautumalla tilillesi ja valitsemalla Lisää kuljetustarjous -toiminnon.</p>
      </div>

      <div className={styles.faqItem}>
        <h2>Mitä tarkoittaa ekologinen kuljetusratkaisu?</h2>
        <p>Ekologiset kuljetusratkaisut tarkoittavat vähäpäästöisiä kuljetuksia ja tyhjänä ajon minimointia, mikä vähentää polttoaineen kulutusta ja ympäristövaikutuksia.</p>
      </div>
    </div>
</Layout>
  );
};

export default Faq;
