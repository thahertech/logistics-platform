import React from 'react';
import styles from '../Styles/custom_alert_styles.module.css';

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.alertBox}>
        <p>{message}</p>
        <button className={styles.closeButton} onClick={onClose}>
          Sulje
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;