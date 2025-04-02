'use client';
import Layout from './dashboard/Layout';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './Styles/page.module.css';
import serviceData from './dashboard/serviceData';
import heroImg from '../../public/assets/backgrounds/truckupBG.jpeg';
import BetaForm from './components/forms/BetaForm';
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
  <div className={styles.IntroHeroSection}>
        <h4>
          Logistiikan
        </h4>
        <h5>
          tulevaisuus
        </h5>
        <p>Liity mukaan!</p>
        </div>
      </div>

  </div>
<div className={styles.FirstHeroSection}>
  <p className={styles.additionalInfo}>  
    Yhdistämme lähetykset ja kuljetusyritykset yhdellä alustalla
        </p>
  <p>
  Haluatko kuulla lisää?
  </p>
  <BetaForm />

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
    </Layout>
  );
};

export default Dashboard;