import React, { useState } from 'react';
import styles from '../Styles/Contact.module.css';

const ContactForm = () => {
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = { company, email };

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
        // Delay hiding the form to allow fade-out effect to complete
        setTimeout(() => {
          setShowForm(false);
        }, 1000); // Match this duration with the CSS transition duration
      } else {
        console.error('Failed to submit the form.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    // Clear the fields only after a successful submission
    setCompany('');
    setEmail('');
  };

  return (
    <div>
      {isSubmitted && <p className={styles.successMessage}>Kiitos ja nähdään pian.</p>}

      {showForm && (
        <form
          className={`${styles.contactForm} ${isSubmitted ? styles.fadeOut : ''}`}
          onSubmit={handleSubmit}
        >
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
            placeholder="Sähköpostiosoite"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
