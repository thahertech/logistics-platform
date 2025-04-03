'use client';
import Layout from './Dashboard/Layout';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './Styles/Dashboard.module.css';
import serviceData from './Components/serviceData';
import heroImg from '../../public/assets/backgrounds/truckupBG.jpeg';
import BetaForm from './Components/forms/BetaForm';
import Head from 'next/head';
import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const RollingNumber = ({ start, end, duration }) => {
  const [number, setNumber] = useState(start);

  useEffect(() => {
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const newNumber = Math.min(start + (end - start) * (progress / duration), end);
      setNumber(Math.floor(newNumber));
      if (newNumber < end) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [start, end, duration]);

  return <motion.div className={styles.rollingNumber}>{number}</motion.div>;
};

const Dashboard = () => {
  const router = useRouter();
  const contactFormRef = useRef(null);

  const navigateTo = (path) => {
    router.push(path);
  };

  const scrollToContactForm = () => {
    if (contactFormRef.current) {
      contactFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
   
  {/* <h2 className={styles.sectionTitle}>Haluatko uutiskirjeemme?</h2> */}
        <h4 className={styles.serviceContent}>
            Ole mukana luomassa logistiikan tulevaisuutta.
        </h4>


        <p className={styles.additionalInfo}>

  
        Yksinkertaista toimitustarpeesi Logistixin avulla. <br/>Yhdistämme lähetykset ja kuljetusyritykset yhdellä alustalla.
   <br/> <br/> Haluatko uutiskirjeemme?
        </p>
      <BetaForm />
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
              onClick={() => navigateTo(card.path)}
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



      <div className={styles.rollingNumbersSection}>
        <div className={styles.rollingNumberCard}>
          <RollingNumber start={0} end={Math.min(70, 200)} duration={3000} />
          <p className={styles.rollingNumberDescription}>
            Kuljetukseen erikoistuneita yrityksiä, jotka osallistuvat BETA testiin
          </p>
        </div>

 
        <div className={styles.rollingNumberCard}>
          <RollingNumber start={0} end={Math.max(61 + 70)} duration={3000} />
          <p className={styles.rollingNumberDescription}>
            Yhteensä BETA-testaajia, jotka ovat mukana alustan kehityksessä
          </p>
        </div>

        <div className={styles.rollingNumberCard}>
          <RollingNumber start={0} end={Math.min(61, 200)} duration={3000} />
          <p className={styles.rollingNumberDescription}>
            Lähettäjiä, jotka osallistuvat BETA testiin
          </p>
        </div>

        {/* <div className={styles.rollingNumberCard}>
          <RollingNumber start={0} end={Math.max(200 - 60 - 68, 0)} duration={3000} />
          <p className={styles.rollingNumberDescription}>
            Paikkoja jäljellä - lisää yrityksesi mukaan!
          </p>
        </div> */}
      </div>


    </Layout>
  );
};

export default Dashboard;
