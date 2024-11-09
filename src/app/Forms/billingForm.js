import React from 'react';
import styles from '../Styles/orderForm.module.css';

const BillingForm = ({ billingDetails, setBillingDetails }) => (
    <>
        {Object.entries(billingDetails).map(([key, value]) => (
            <div key={key} className={styles.formGroup}>
                <label className={styles.label}>{key}:</label>
                <input
                    type={key === 'sähköposti' ? 'email' : 'text'}
                    className={styles.input}
                    placeholder={key}
                    value={value}
                    onChange={(e) => setBillingDetails({ ...billingDetails, [key]: e.target.value })}
                    required
                />
            </div>
        ))}
    </>
);

export default BillingForm;
