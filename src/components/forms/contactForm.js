import React, { useState } from 'react';
import styles from '@/app/Styles/Contact.module.css';

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

        setTimeout(() => {
          setShowForm(false);
        }, 1000);

        // Trigger Google Tag event after form is successfully submitted
        if (typeof gtag === 'function') {
          gtag('event', 'conversion_event_signup', {
            event_category: 'Signup',
            event_label: 'Newsletter',
          });
        }
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
      {isSubmitted && (
        <p className={styles.successMessage}>Kiitos viestistäsi!</p>
      )}

      {showForm && (
        <form
          className={`${styles.contactForm} ${
            isSubmitted ? styles.fadeOut : ''
          }`}
          onSubmit={handleSubmit}
        >
          <div className={styles.contactFields}>
            <input
              className={styles.inputField}
              type="text"
              placeholder="Yrityksen nimi"
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
          <textarea
            className={styles.textArea}
            placeholder="Vapaa sana"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
          ></textarea>

          <button className={styles.submitButton} type="submit">
            Lähetä
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
