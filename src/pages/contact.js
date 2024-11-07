import React from 'react';
import styles from '../app/Styles/Dashboard.module.css';
import Layout from '../app/Dashboard/Layout';
import '../app/globals.css';
import ContactForm from '../app/Forms/contactForm';

const Contact = () => {
  return (
    <Layout>
      {/* <div className={styles.hero}>
        <div className={styles.line}>
          <h3>Yhteystiedot</h3>
          <h4>Olemme täällä auttamassa sinua kaikissa kysymyksissäsi. Ota rohkeasti yhteyttä!</h4>
        </div>
      </div> */}

      <div className={styles.contactSection}>
        <p className={styles.sectionContent1}>
          Haluatko tietää lisää palveluistamme tai tarvitsetko apua? Ota yhteyttä meihin käyttämällä alla olevia yhteystietoja tai lomaketta. Vastaamme mahdollisimman pian.
        </p>

        <div className={styles.contactDetails}>
          <div className={styles.contactCard}>
            <h3 className={styles.contactHeading}>Sähköposti</h3>
            <p className={styles.contactInfo}><a href="mailto:info@logistix.fi">info@logistix.fi</a></p>
          </div>
          <div className={styles.contactCard}>
            <h3 className={styles.contactHeading}>Puhelin</h3>
            <p className={styles.contactInfo}><a href="tel:+358401234567">+358 44 26565 27</a></p>
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
