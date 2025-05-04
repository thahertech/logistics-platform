'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/Styles/Layout.module.css';
 import footerImg from '@/../public/assets/logistix-logos/svg/logo.svg';

const MainHeader = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <Link href="/" className={styles.headerLogo}>
           <Image src={footerImg} alt="Logistix Logo" width={100} height={100} priority />
        </Link>
      </div>
      <nav className={styles.bottomRow}>
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>
            <Link
              href="/"
              className={`${styles.navLink} ${pathname === '/' ? styles.activeLink : ''}`}
            >
              Etusivu
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/yrityksille"
              className={`${styles.navLink} ${pathname === '/yrityksille' ? styles.activeLink : ''}`}
            >
              Yrityksille
            </Link>
          </li>
          {/* <li className={styles.navItem}>
            <Link
              href="/yhteys"
              className={`${styles.navLink} ${pathname === '/yhteys' ? styles.activeLink : ''}`}
            >
              Ota yhteyttä
            </Link>
          </li> */}
          <li className={styles.navItem}>
            <Link
              href="/me"
              className={`${styles.navLink} ${pathname === '/me' ? styles.activeLink : ''}`}
            >
              Meistä
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
