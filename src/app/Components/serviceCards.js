import { useRef, useEffect } from 'react';
import serviceData from './serviceData-cards.js';

const ServiceCards = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="serviceContainer">
      {serviceData.map((item, index) => (
        <div
          key={index}
          ref={el => (cardRefs.current[index] = el)}
          className="serviceCard fade-out"
        >
          <i className={item.icon}></i>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;