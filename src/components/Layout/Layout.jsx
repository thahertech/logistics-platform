import React from 'react';
import '../../app/globals.css';
import styles from '../../app/Styles/Layout.module.css';
import { GoogleTagManager } from '@next/third-parties/google';

import TopHeader from './TopHeader';
import MainHeader from './MainHeader';
import BottomFooter from './BottomFooter';

export default function Layout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <GoogleTagManager gtmId="GTM-T7GRXLNQ" />
      <TopHeader />
      <MainHeader />

      <main className={styles.mainContent}>
     
        {children}
      </main>

      <footer className={styles.footer} />
      <BottomFooter />
    </div>
  );
};