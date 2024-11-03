import React, { useState } from 'react';
import styles from '../Styles/Contact.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name,
      email,
      message,
    };

    console.log('Form data:', formData);

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Nimi"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={styles.inputField}
          type="company"
          placeholder="Yritys"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          optional
        />
        <input
          className={styles.inputField}
          type="email"
          placeholder="Sähköpostiosoite"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          className={styles.textArea}
          placeholder="Viesti"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button className={styles.submitButton} type="submit">Lähetä</button>
      </form>
    </div>
  );
};

export default ContactForm;
