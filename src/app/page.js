'use client';
import Layout from '../components/Layout/Layout';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './Styles/landing.module.css';
import serviceData from './dashboard/serviceData';
import Head from 'next/head';
import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import dynamic from 'next/dynamic';



const Dashboard = () => {
  const router = useRouter();
  const contactFormRef = useRef(null);
  const VideoBackground = dynamic(() => import('src/components/animation/VideoBG.js'), { ssr: false });
  const VideoBackground2 = dynamic(() => import('src/components/animation/hero-section-abstract.js'), { ssr: false });

  
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
    <div className={styles.preLoad}>
  <VideoBackground2 />
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
<div className={styles.callToAction}>
    <button>
      <a className={styles.ctaButton} href="/yhteys" onClick={scrollToContactForm}>
        Tilaa demo
      </a>
    </button>
</div>  
  <div className="first-hero-section">
    <div className={styles.videoSection}>
    <VideoBackground />
    </div>
  </div>
</Layout>
  );
};

export default Dashboard;
