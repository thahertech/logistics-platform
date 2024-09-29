import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../Styles/Layout.module.css';

const UserCards = () => {
  const [cardsInView, setCardsInView] = useState({});

  useEffect(() => {
    const cardElements = document.querySelectorAll(`.${styles.card}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              entry.target.dataset.index % 2 === 0 ? styles['slide-in-left'] : styles['slide-in-right']
            );
            entry.target.style.opacity = 1; // Make sure the card becomes visible
          }
        });
      },
      {
        threshold: 0.1, // Trigger animation when 10% of the card is in view
      }
    );

    cardElements.forEach((card) => observer.observe(card));

    return () => {
      cardElements.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <div className={styles.container}>
      {[
        { src: '/assets/TruckImg.jpeg', title: 'Lähellä', path: '/deliveries-nearby' },
        { src: '/assets/Newimage.jpeg', title: 'Kuljetustilaus', path: '/createShipment' },
        { src: '/assets/Truck1.jpeg', title: 'Avoimet kuljetukset', path: '/marketplace' }
      ].map((card, index) => (
        <div
          key={index}
          data-index={index}
          className={`${styles.card} ${styles[`delay-${index + 1}`]}`}
          onClick={() => navigateTo(card.path)}
          tabIndex={0}
          role="button"
          onKeyPress={(e) => e.key === 'Enter' && navigateTo(card.path)}
        >
          <Image
            src={card.src}
            alt={card.title}
            width={500}
            height={300}
            className={styles.cardImage}
          />
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>{card.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCards;
