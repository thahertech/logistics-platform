import React from 'react';
import styles from '../Styles/orderForm.module.css';

const PdfPreview = ({ pdfUrl }) => (
    pdfUrl && (
        <div className={styles.pdfPreview}>
            <h3>Rahtikirja</h3>
            <embed src={pdfUrl} type="application/pdf" width="800px" height="600px" />
        </div>
    )
);

export default PdfPreview;
