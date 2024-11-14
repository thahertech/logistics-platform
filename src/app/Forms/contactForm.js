import React, { useState } from 'react';
import styles from '../Styles/Contact.module.css';

const ContactForm = () => {
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = { company, email, message };

    try {
      const response = await fetch('/api/news-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        if (typeof gtag === 'function') {
          gtag('event', 'conversion_event_signup', {
            event_category: 'Signup',
            event_label: 'Newsletter',
          });
        }

        setTimeout(() => {
          setShowForm(false);
        }, 1000);
      } else {
        console.error('Failed to submit the form.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    setCompany('');
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      {isSubmitted && <p className={styles.successMessage}>Kiitos ja nähdään pian.</p>}

      {showForm && (
        <form
          className={`${styles.contactForm} ${isSubmitted ? styles.fadeOut : ''}`}
          onSubmit={handleSubmit}
        >
          <div className={styles.contactFields}>
            <input
              className={styles.inputField}
              type="text"
              placeholder="Yritys"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <input
              className={styles.inputField}
              type="email"
              placeholder="Sähköposti"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <input
            className={styles.inputField2}
            type="text"
            placeholder="Vapaa sana"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className={styles.submitButton} type="submit">
            Lähetä
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
