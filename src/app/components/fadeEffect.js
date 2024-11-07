// components/fadeEffect.js
import { useEffect } from 'react';

const FadeEffect = () => {
  useEffect(() => {
    const hero = document.querySelector('.hero');
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('Is Hero in view?', entry.isIntersecting); // Log visibility

        if (entry.isIntersecting) {
          hero.classList.add('fade-in');
        } else {
          hero.classList.remove('fade-in');
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (hero) {
      observer.observe(hero);
    }

    return () => {
      if (hero) {
        observer.unobserve(hero);
      }
    };
  }, []);

  return null;
};

export default FadeEffect;
