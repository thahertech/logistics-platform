"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Styles/NotFound.module.css";
import ParticleBackground from '../app/Components/bg-animation';

const NotFound = () => {
  return (
    
    <div className={styles.notFoundContainer}>
                    <ParticleBackground/> 

      {/* Hero Section */}
      <div className={styles.heroImg}>
       
        </div>

        <div className={styles.overlay}>
          <h1 className={styles.title}>Sivua ei löytynyt</h1>
          <p className={styles.description}>
            Näyttää siltä, että etsimääsi sivua ei ole olemassa. <br />
            Tarkista osoite tai palaa etusivulle.
          </p>
          <Link href="/" className={styles.link}>
            <button className={styles.backButton}>Palaa etusivulle</button>
          </Link>
      </div>
    </div>
  );
};

export default NotFound;