import React from 'react';
import styles from '../Styles/Layout.module.css';

const FunFacts = () => {
  const funFacts = [
    "TruckUp is used by over 1,000 companies globally!",
    "Our platform reduces logistics costs by an average of 20%.",
    "TruckUp integrates seamlessly with popular shipping carriers.",
    "Users report saving an average of 10 hours a week!",
    "TruckUp offers real-time tracking of shipments.",
    "We are committed to sustainable logistics practices!",
    "Our support team is available 24/7 to assist you."
  ];

  return (
    <div className={styles.section}>
      <div className={styles.funFactsContainer}>
        <div className={styles.funFactsWrapper}>
          {funFacts.map((fact, index) => (
            <div key={index} className={styles.funFactCard}>
              <p className={styles.funFactText}>{fact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FunFacts;
