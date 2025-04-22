'use client';
import React, {useEffect} from 'react';
import styles from '@/app/Styles/Dashboard.module.css';
import Layout from '@/components/Layout/Layout';
import '../globals.css';
import ContactForm from '@/components/forms/contactForm';
import Head from 'next/head';



export default function Contact() {

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
        </div>
       </div>
          <ContactForm />
    </Layout>
  );
};