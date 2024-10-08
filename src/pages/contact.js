import React from 'react';
import styles from '../app/Styles/Dashboard.module.css';
import Layout from '../app/dashboard/Layout';
import '../app/globals.css';

const Contact = () => {
  return (
    <Layout>
      <div className={styles.hero}>
        <div className={styles.line}>
          <h3>Yhteystiedot</h3>
          <h4>Olemme täällä auttamassa sinua kaikissa kysymyksissäsi. Ota rohkeasti yhteyttä!</h4>
        </div>
      </div>

      <div className={styles.contactSection}>
        <h2 className={styles.sectionTitle}>Ota yhteyttä</h2>
        <p className={styles.sectionContent1}>
          Haluatko tietää lisää palveluistamme tai tarvitsetko apua? Ota yhteyttä meihin käyttämällä alla olevia yhteystietoja tai lomaketta. Vastaamme mahdollisimman pian.
        </p>

        <div className={styles.contactDetails}>
          <div className={styles.contactCard}>
            <h3 className={styles.contactHeading}>Sähköposti</h3>
            <p className={styles.contactInfo}><a href="mailto:support@truckup.fi">support@truckup.fi</a></p>
          </div>
          <div className={styles.contactCard}>
            <h3 className={styles.contactHeading}>Puhelin</h3>
            <p className={styles.contactInfo}><a href="tel:+358401234567">+358 40 123 4567</a></p>
          </div>
          <div className={styles.contactCard}>
            <h3 className={styles.contactHeading}>Osoite</h3>
            <p className={styles.contactInfo}>Esimerkkikatu 10, 00100 Helsinki, Suomi</p>
          </div>
        </div>

        <h3 className={styles.sectionTitle}>Lähetä viesti</h3>
        <form className={styles.contactForm}>
          <input className={styles.inputField} type="text" placeholder="Nimi" required />
          <input className={styles.inputField} type="email" placeholder="Sähköpostiosoite" required />
          <textarea className={styles.textArea} placeholder="Viesti" required></textarea>
          <button className={styles.submitButton} type="submit">Lähetä</button>
        </form>
      </div>

      <div className={styles.hero2}>
        <h2>Pidetään yhteyttä!</h2>
      </div>
    </Layout>
  );
};

export default Contact;
