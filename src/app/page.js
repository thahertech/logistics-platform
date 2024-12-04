'use client';
import Layout from './Dashboard/Layout';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './Styles/Dashboard.module.css';
import serviceData from './Components/serviceData';
import heroImg from '../../public/assets/truckupBG.jpeg';
import ContactForm from './Forms/contactForm';
import Head from 'next/head';

import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Dashboard = () => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <Layout>
      <Head>


        <title>Logistix - Älykkäät logistiikkaratkaisut</title>
        <meta
          name="description"
          content="Tehosta logistiikkaratkaisuja, säästä kustannuksissa ja paranna tehokkuutta Logistixin avulla."
        />
      </Head>
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
          <h5>Kuljetus - Osta tai myy</h5>
        </div>
      </div>

      <div className={styles.serviceSection}>
        <div className={styles.cardContainer}>
          {serviceData.map((card, index) => (
            <motion.div
              key={index}
              className={styles.serviceCard}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0.9 }}
              transition={{ duration: 0, delay: index * 0.2 }}
              onClick={() => navigateTo(card.path)} //path set in ServiceData.js
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

      <div className={styles.sectionFun}>
        {/* <FunFacts /> */}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>BETA-testaajaksi?</h2>
        <h4 className={styles.serviceContent}>Lisää yhteystiedot niin pääset vaikuttamaan alustan kehitykseen</h4>
      </div>


      <ContactForm />
    </Layout>
  );
};

export default Dashboard;
