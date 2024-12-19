import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../Styles/Layout.module.css';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import footerImg from '../../../public/assets/logistix-logos/svg/logo.svg';
import '../globals.css';
import { FaFacebook, FaChartBar, FaInstagram, FaLinkedin ,FaPlusCircle, FaUser, FaSearch, FaShoppingCart, FaShieldAlt, FaFileContract, FaCogs, FaUserCircle, FaComment } from 'react-icons/fa';

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
  
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    if (token) {
      jwtDecode(token);
    }
  }, [pathname]);

  // const addToCart = (item) => {
  //   setCartItems((prevItems) => [...prevItems, item]);
  // };

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.topHeader}>
        {isAuthenticated ? (
          <nav className={styles.topHeaderNav}>
            <Link
              href="/checkout"
              className={`${styles.topHeaderLink} ${
                pathname === '/checkout' ? styles.activeLink : ''
              }`}
            >
              <FaShoppingCart className={styles.icon} />
              <span className={styles.cartCount}>{cartItems.length}</span>
              Ostoskori
            </Link>
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
              href="/profile"
              className={`${styles.topHeaderLink} ${
                pathname === '/profile' ? styles.activeLink : ''
              }`}
            >
              <FaUser className={styles.icon} /> Oma tili
            </Link>
          </nav>
        ) : (
          <p className={styles.topHeaderPrompt}></p>
        )}
      </div>



      <header className={styles.header}>
        <div className={styles.topRow}>
          <Link href="/" className={styles.headerLogo}>
            Logistix
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
      {/* <footer className={styles.footer}>
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
        <Image
          src={footerImg}
          alt="Logistix Logo"
          width={75}
          height={75}
          className={styles.footerLogo}
          />
        <p className={styles.footerText}>Logistix OY 3487288-6</p>
        <p className={styles.footerText}>Designed by Sensei Studios</p>
      </footer>
      <div className={styles.bottomFooter}>
        <nav className={styles.bottomFooterNav}>
          <Link
          href="/asiakastarinat"
                className={`${styles.bottomFooterLink} ${
                  pathname === '/asiakastarinat' ? styles.activeLink : ''
                }`}
          >
              <FaComment className={styles.icon} /> Asiakastarinat
          </Link>
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
      </div> */}
    </div>
  );
};

export default Layout;  