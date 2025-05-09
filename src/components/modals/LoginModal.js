import React from 'react';
import styles from '@/app/Styles/login.module.css';

const Modal = ({ closeModal }) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContainer}>
        <h3 className={styles.modalTitle}>Vahvista sähköpostiosoitteesi</h3>
        <p className={styles.modalText}>
          Vahvista tilisi käyttämällä lähetettyä linkkiä.
          <br />
          Katso roskaposti jos et löydä vahvistus sähköpostia.
        </p>
        <a
          href="mailto:"
          className={styles.modalButton}
          onClick={closeModal}
        >
          OK
        </a>
      </div>
    </div>
  );
};

export default Modal;