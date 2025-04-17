'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../../app/Styles/Layout.module.css';
import { FaPlusCircle, FaSearch, FaUser } from 'react-icons/fa';
import { supabase } from '@/supabaseClient';

const TopHeader = () => {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogoInTopHeader, setIsLogoInTopHeader] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    fetchSession();

  }, []);

  return (
    <div className={`${styles.topHeader} ${isLogoInTopHeader ? styles.withLogo : ''}`}>
      {isLogoInTopHeader && (
        <div className={styles.topHeaderContent}>
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
            href="/kuljetukset/luo-ilmoitus"
            className={`${styles.topHeaderLink} ${
              pathname === '/kuljetukset/luo-ilmoitus' ? styles.activeLink : ''
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
  );
};

export default TopHeader;