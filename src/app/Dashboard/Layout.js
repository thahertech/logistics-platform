import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../Styles/Layout.module.css';
import Image from 'next/image';
import footerImg from '../../../public/assets/logistix-logos/svg/logo.svg';
import '../globals.css';

import {FaQuestionCircle, FaFacebook, FaChartBar, FaInstagram, FaLinkedin ,FaPlusCircle, FaUser, FaSearch, FaShoppingCart, FaShieldAlt, FaFileContract, FaCogs, FaUserCircle, FaComment } from 'react-icons/fa';
import { supabase } from '@/supabaseClient';

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  const [isLogoInTopHeader, setIsLogoInTopHeader] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    // setCartItems(savedCart);

    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsAuthenticated(!!session);
    };

    fetchSession();

    const handleScroll = () => {
      const headerHeight = document.querySelector(`.${styles.header}`).offsetHeight;
      setIsLogoInTopHeader(window.scrollY > headerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.layoutContainer}>
 <div className={`${styles.topHeader} ${isLogoInTopHeader ? styles.withLogo : ''}`}>
  {isLogoInTopHeader && (
    <div className={styles.topHeaderContent}>
      <Link href="/" className={styles.logoInTopHeader}>
        <Image
          src={footerImg}
          alt="Logistix Logo"
          width={100}
          height={100}
          className={styles.logoInTopHeaderImg}
        />
      </Link>
      {!isAuthenticated && (
        <Link href="/auth" className={styles.registerButton}>
          Rekisteröidy nyt
        </Link>
      )}
    </div>
  )}
  {isAuthenticated && (
    <nav className={styles.topHeaderNav}>
      <Link
        href="/luo-ilmoitus"
        className={`${styles.topHeaderLink} ${
          pathname === '/luo-ilmoitus' ? styles.activeLink : ''
        }`}
      >
        <FaPlusCircle className={styles.icon} /> Luo ilmoitus
      </Link>
      <Link
        href="/kuljetukset"
        className={`${styles.topHeaderLink} ${
          pathname === '/kuljetukset' ? styles.activeLink : ''
        }`}
      >
        <FaSearch className={styles.icon} /> Löydä kuljetuksia
      </Link>
      <Link
        href="/oma-tili"
        className={`${styles.topHeaderLink} ${
          pathname === '/oma-tili' ? styles.activeLink : ''
        }`}
      >
        <FaUser className={styles.icon} /> Oma tili
      </Link>
    </nav>
  )}
</div>


      <header className={styles.header}>
        <div className={styles.topRow}>
          <Link href="/" className={styles.headerLogo}>
          <Image
          src={footerImg}
          alt="Logistix Logo"
          width={125}
          height={125}
          />
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
                className={`${styles.navLink} ${
                  pathname === '/yrityksille' ? styles.activeLink : ''
                }`}
              >
                Yrityksille
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/yhteys"
                className={`${styles.navLink} ${
                  pathname === '/yhteys' ? styles.activeLink : ''
                }`}
              >
                Ota yhteyttä
              </Link>
            </li>
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
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
      <Image
          src={footerImg}
          alt="Logistix Logo"
          width={85}
          height={85}
          className={styles.footerLogo}
          />
      <div className={styles.socialLinks}>
        <Link href="https://facebook.com" className={styles.socialIcon}>
          <FaFacebook />
        </Link>
        <Link href="https://twitter.com" className={styles.socialIcon}>
          <FaLinkedin />
        </Link>
        <Link href="https://instagram.com" className={styles.socialIcon}>
          <FaInstagram />
        </Link>
      </div>
       
        <p className={styles.footerText}>Logistix OY 3487288-6</p>
        <p className={styles.footerText}>Designed by Sensei Studios</p>
      </footer>
      <div className={styles.bottomFooter}>
        <nav className={styles.bottomFooterNav}>
          {/* <Link
          href="/asiakastarinat"
                className={`${styles.bottomFooterLink} ${
                  pathname === '/asiakastarinat' ? styles.activeLink : ''
                }`}
          >
              <FaComment className={styles.icon} /> Asiakastarinat
          </Link>
          <Link
          href="/usein-kysytyt-kysymykset"
          className={`${styles.bottomFooterLink} ${
            pathname === '/usein-kysytyt-kysymykset' ? styles.activeLink : ''
          }`}
        >
          <FaQuestionCircle className={styles.icon} /> Usein Kysytyt Kysymykset
        </Link> */}
          <Link
          href="/miten-toimii"
                className={`${styles.bottomFooterLink} ${
                  pathname === '/miten-toimii' ? styles.activeLink : ''
                }`}
          >
              <FaCogs className={styles.icon} /> Miten Logistix toimii
          </Link>
          <Link
            href="/tietosuoja"
            className={`${styles.bottomFooterLink} ${
              pathname === '/tietosuoja' ? styles.activeLink : ''
            }`}
          >
            <FaShieldAlt className={ styles.icon} /> Tietosuoja
          </Link>
          <Link
            href="/ehdot"
            className={`${styles.bottomFooterLink} ${
              pathname === '/ehdot' ? styles.activeLink : ''
            }`}
          >
            <FaFileContract className={styles.icon} /> Ehdot
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Layout;  