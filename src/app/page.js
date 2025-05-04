'use client';
import Layout from '../components/Layout/Layout';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './styles/Landing.module.css';
import serviceData from './dashboard/serviceData';
import Head from 'next/head';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
import { InputWithButton } from '@/components/contact-form';
import { Label } from '@/components/ui/label';

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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-..." // insert real integrity hash here for security
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={() => navigateTo(card.path)}
            >
              <div className={styles.icon}>
                <card.icon className="text-white items-center" />
              </div>
              <h3 className={styles.infoCardtitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex-col flex justify-center items-center h-full">
      <Label className="text-2xl font-bold mb-4">
        Ilmoitamme kun olemme valmiita!
      </Label>
  <InputWithButton />
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
