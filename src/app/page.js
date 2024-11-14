'use client';
import Layout from './Dashboard/Layout';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './Styles/Dashboard.module.css';
import serviceData from './Components/serviceData-cards';
import heroImg from '../../public/assets/truckupBG.jpeg';
import ContactForm from './Forms/contactForm';

import ServiceCards from './Components/serviceCards';

import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Dashboard = () => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <Layout>
      <div className={styles.heroImg}>
        <Image
          src={heroImg}
          alt="Background image"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
        <div className={styles.line}>
          <h3>Tulevaisuuden työkalu</h3>
        </div>
      </div>

      <div className={styles.serviceSection}>
        <div className={styles.cardContainer}>
          {serviceData.map((card, index) => (
            <motion.div
              key={index}
              className={styles.serviceCard}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.8 }}
            >
              <div className={styles.icon}>
                <i className={`${card.icon} text-white`}></i>
              </div>
              <h3 className={styles.infoCardtitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

        {/* <div className={`${styles.section} ${styles.whyChooseUs}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Miksi valita palvelumme?</h2>
            <p className={styles.sectionContent1}>
              Tarjoamme ympäristöystävällisiä kuljetusratkaisuja, jotka eivät ainoastaan vähennä hiilijalanjälkeäsi, vaan myös tarjoavat kilpailukykyiset hinnat.
            </p>
          </div>
          <ul className={styles.benefitsList}>
            <li>
              <i className="fas fa-leaf" style={{ color: 'white' }}></i>
              <h4>Ympäristöystävällisyys</h4> Käytämme kestäviä käytäntöjä minimoidaksemme ympäristövaikutuksemme.
            </li>
            <li>
              <i className="fas fa-money-bill-wave" style={{ color: 'white' }}></i>
              <h4>Kilpailukykyiset hinnat</h4> Tarjoamme laadukkaita palveluja kohtuulliseen hintaan.
            </li>
            <li>
              <i className="fas fa-box" style={{ color: 'white' }}></i>
              <h4>Luotettavat palvelut</h4> Meidän tiimimme on sitoutunut tarjoamaan luotettavia ja ajantasaisia toimituksia.
            </li>
            <li>
              <i className="fas fa-headset" style={{ color: 'white' }}></i>
              <h4>Asiakastuki</h4> Olemme täällä auttamassa sinua kaikissa kysymyksissäsi palveluistamme tai alustastamme.
            </li>
          </ul>
        </div> */}


      <div className={styles.sectionFun}>
        {/* <FunFacts /> */}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>BETA testaajaksi?</h2>
        <h4 className={styles.serviceContent}>Lisää yhteystiedot ja pääset vaikuttamaan alustan kehitykseen</h4>
        {/* <button className={styles.contactButton} onClick={() => router.push('/contact')}>
          Ota yhteyttä
        </button> */}
      </div>

      <ContactForm />


      {/* <Footer /> */}
    </Layout>
  );
};

export default Dashboard;
