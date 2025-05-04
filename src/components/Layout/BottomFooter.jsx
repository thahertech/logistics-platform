'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/styles/layout.module.css';
import {
  FaComment,
  FaQuestionCircle,
  FaCogs,
  FaShieldAlt,
  FaFileContract,
} from 'react-icons/fa';

const BottomFooter = () => {
  const pathname = usePathname();

  return (
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
        {/* <Link
          href="/miten-toimii"
          className={`${styles.bottomFooterLink} ${
            pathname === '/miten-toimii' ? styles.activeLink : ''
          }`}
        >
          <FaCogs className={styles.icon} /> Miten Logistix toimii
        </Link> */}
        <Link
          href="/tietosuoja"
          className={`${styles.bottomFooterLink} ${
            pathname === '/tietosuoja' ? styles.activeLink : ''
          }`}
        >
          <FaShieldAlt className={styles.icon} /> Tietosuoja
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
  );
};

export default BottomFooter;