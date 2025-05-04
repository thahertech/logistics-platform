'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/Styles/Layout.module.css';
import { supabase } from '@/supabaseClient';
import { 
  HiOutlinePlusCircle as PlusIcon, 
  HiOutlineSearch as SearchIcon, 
  HiOutlineUser as UserIcon, 
  HiOutlineMenuAlt2 as MenuIcon, 
  HiOutlineX as CloseIcon,
  HiBeaker as BeakerIcon,
} from 'react-icons/hi';
import { Badge } from '@/components/ui/badge';

const TopHeader = () => {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogoInTopHeader, setIsLogoInTopHeader] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    fetchSession();
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(isMobileMenuOpen);
  };

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
        <div className={styles.topRow}>
          <button className={styles.menuToggle} onClick={toggleMenu}>
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <nav className={`${styles.topHeaderNav} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
           
              <Link
                href="/"
                className={`${styles.topHeaderLink} ${pathname === '/' ? styles.activeLink : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BeakerIcon className={styles.icon} /> Etusivu
              </Link>
              
             <FeedbackModal/> 
          

            <Link
              href="/kuljetukset/luo-ilmoitus"
              className={`${styles.topHeaderLink} ${pathname === '/kuljetukset/luo-ilmoitus' ? styles.activeLink : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <PlusIcon className={styles.icon} /> Luo ilmoitus
            </Link>
            <Link
              href="/kuljetukset"
              className={`${styles.topHeaderLink} ${pathname === '/kuljetukset' ? styles.activeLink : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <SearchIcon className={styles.icon} /> Löydä kuljetuksia
            </Link>
            <Link
              href="/oma-tili"
              className={`${styles.topHeaderLink} ${pathname === '/oma-tili' ? styles.activeLink : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <UserIcon className={styles.icon} /> Oma tili
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default TopHeader;
