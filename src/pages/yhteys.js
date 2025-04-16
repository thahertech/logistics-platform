import React, {useEffect} from 'react';
import styles from '../app/Styles/Dashboard.module.css';
import Layout from '../app/Dashboard/Layout';
import '../app/globals.css';
import ContactForm from '../app/Components/forms/contactForm';
import Image from 'next/image';
import Head from 'next/head';
import { GoogleTagManager } from '@next/third-parties/google';
const Contact = () => {

    useEffect(() => {
    document.title = 'Logistix | Yhteys';
  }, []);
  return (
    <Layout>
    <Head>

    <title>Yhteystiedot - Logistix</title>
    <meta name="description" content="Ota yhteyttä Logistixiin, olemme täällä auttamassa kaikissa kysymyksissäsi." />
  </Head>
      <div className={styles.hero}>
              <div className={`${styles.hero} ${styles.contactHero}`}>
              </div>
            <div className={styles.sectionHero}>
        <h4 className={styles.sectionContent2}>
          Haluatko lisätietoja tai apua?<br/> Ota yhteyttä ja tiimimme vastaa sinulle pikaisesti.
        </h4></div>


        <div className={styles.contactDetails}>
          <div className={styles.contactCard}>
            <h3 className={styles.contactHeading}>Sähköposti</h3>
            <p className={styles.contactInfo}><a href="mailto:info@logistix.fi">info@logistix.fi</a></p>
          </div>
          <div className={styles.contactCard}>
            <h3 className={styles.contactHeading}>Puhelin</h3>
            <p className={styles.contactInfo}><a href="tel:+358447937803">+358 447937803</a></p>
          </div>
          {/* <div className={styles.contactCard}>
            <h3 className={styles.contactHeading}>Osoite</h3>
            <p className={styles.contactInfo}>Esimerkkikatu 10, 00100 Helsinki, Suomi</p>
          </div> */}
        </div>

        {/* <form className={styles.contactForm}>
          <input className={styles.inputField} type="name" placeholder="Nimi" required />
          <input className={styles.inputField} type="name" placeholder="Yritys" optional />
          <input className={styles.inputField} type="email" placeholder="Sähköpostiosoite" required />
          <textarea className={styles.textArea} placeholder="Viesti" required></textarea>
          <button className={styles.submitButton} type="submit">Lähetä</button>
        </form>
       */}
       </div>
          <ContactForm />
    </Layout>
  );
};

export default Contact;
