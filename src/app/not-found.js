"use client";
import React from "react";
import Link from "next/link";
import styles from "./Styles/Notfound.module.css";
import Layout from "../components/Layout/Layout";


const NotFound = () => {
  return (
    <Layout>
    <div className={styles.notFoundContainer}>

      <div className={styles.heroImg}>
       
        </div>

        <div className={styles.overlay}>
          <h1 className={styles.title}>Sivua ei löytynyt</h1>
          <p className={styles.description}>
            Näyttää siltä, että etsimääsi sivua ei ole olemassa. <br />
            Tarkista osoite?
          </p>
          <Link href="/" className={styles.link}>
            <button className={styles.backButton}>Palaa takaisin</button>
          </Link>
      </div>
    </div>
    </Layout>
  );
};

export default NotFound;