import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode'; // Importing the QRCode library
import { jsPDF } from 'jspdf'; // Importing jsPDF library

const InvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '12345',
    invoiceDate: '2024-11-06', // Invoice Date
    customerName: 'Nana Laulumaa',
    customerAddress: 'Testikatu 1, 00100 Helsinki',
    items: [
      { name: "Thaher's dick", description: 'Kuvaus', price: 1393900.00 }, // Updated product details
    ],
    bankAccountNumber: 'FI2112345600000785', // Example IBAN
    referenceNumber: '1234567890', // Example reference number
    amount: 139390.00, // Total amount
    dueDate: '2024-11-30', // Due date
  });

  const qrCodeRef = useRef(null); // Reference to the QR code canvas

  // Function to generate the payment QR code in Finnish payment barcode format
  const generatePaymentQRCode = (invoiceData) => {
    return `
      BCD
      001
      1
      SVEF00
      KORTTILASKU
      ${invoiceData.bankAccountNumber}
      ${invoiceData.referenceNumber}
      ${invoiceData.amount.toFixed(2).replace('.', ',')}
      ${invoiceData.dueDate}
    `.trim();
  };

  // Generate QR Code when invoiceData changes
  useEffect(() => {
    const qrData = generatePaymentQRCode(invoiceData);
    if (qrCodeRef.current) {
      QRCode.toCanvas(qrCodeRef.current, qrData, { width: 256 }, (error) => {
        if (error) console.error(error);
      });
    }
  }, [invoiceData]);

  // Save Invoice Function
  const saveInvoice = async () => {
    const doc = new jsPDF();
    
    // Add logo
    const logoUrl = '/assets/logistix-logos/png/logo.png'; // Ensure this is the correct path to your PNG logo
    const img = new Image();
    img.src = logoUrl;
    
    img.onload = () => {
      doc.addImage(img, 'PNG', 20, 20, 50, 50); // Add logo to the PDF at specified position

      // Add content to the PDF
      doc.setFont('Arial', 'normal');
      doc.text('Lasku', 20, 80); // Title
      doc.text(`Laskun numero: ${invoiceData.invoiceNumber}`, 20, 90);
      doc.text(`Päivämäärä: ${invoiceData.invoiceDate}`, 20, 100);
      doc.text(`Erottuva erä: ${invoiceData.dueDate}`, 20, 110);
      
      // Customer Information
      doc.text(`Asiakas: ${invoiceData.customerName}`, 20, 130);
      doc.text(`Osoite: ${invoiceData.customerAddress}`, 20, 140);
      
      // Item Table Header
      doc.setFontSize(12);
      doc.text('Tuote', 20, 160);
      doc.text('Kuvaus', 70, 160);
      doc.text('Hinta (€)', 140, 160);
      
      // Item Table Rows
      let y = 170;
      invoiceData.items.forEach(item => {
        doc.text(item.name, 20, y);
        doc.text(item.description, 70, y);
        doc.text(item.price.toFixed(2).replace('.', ',') + ' €', 140, y);
        y += 10; // Move to the next row
      });

      // Total Amount
      doc.text(`Yhteensä: ${invoiceData.amount.toFixed(2).replace('.', ',')} €`, 20, y + 10);
      
      // QR Code
      const qrCanvas = qrCodeRef.current;
      if (qrCanvas) {
        const qrDataUrl = qrCanvas.toDataURL('image/png');
        doc.addImage(qrDataUrl, 'PNG', 140, y + 20, 50, 50); // Adjust position and size
      }
      
      // Payment Details Table
      const paymentDetailsStartY = y + 80;
      doc.text('Maksutiedot', 20, paymentDetailsStartY);
      
      // Payment Table Borders
      const paymentTableX = 20;
      const paymentTableY = paymentDetailsStartY + 10;
      const paymentTableWidth = 180; // Table width
      const paymentTableRowHeight = 10; // Row height

      // Draw the payment details table
      doc.rect(paymentTableX, paymentTableY, paymentTableWidth, paymentTableRowHeight * 3); // Outer border
      doc.rect(paymentTableX, paymentTableY, paymentTableWidth / 2, paymentTableRowHeight); // First row
      doc.rect(paymentTableX + paymentTableWidth / 2, paymentTableY, paymentTableWidth / 2, paymentTableRowHeight); // Second row
      doc.rect(paymentTableX, paymentTableY + paymentTableRowHeight, paymentTableWidth / 2, paymentTableRowHeight); // Third row
      doc.rect(paymentTableX + paymentTableWidth / 2, paymentTableY + paymentTableRowHeight, paymentTableWidth / 2, paymentTableRowHeight); // Fourth row

      // Payment Details Content
      doc.text('Pankkitili:', paymentTableX + 5, paymentTableY + 6);
      doc.text(invoiceData.bankAccountNumber, paymentTableX + paymentTableWidth / 2 + 5, paymentTableY + 6);
      doc.text('Viitenumero:', paymentTableX + 5, paymentTableY + 16);
      doc.text(invoiceData.referenceNumber, paymentTableX + paymentTableWidth / 2 + 5, paymentTableY + 16);

      // Contact Information
      doc.text('Yhteystiedot', paymentTableX, paymentTableY + 30);
      doc.text('Logistix OY', paymentTableX, paymentTableY + 40);
      doc.text('Testikatu 1', paymentTableX, paymentTableY + 50);
      doc.text('00100 Helsinki', paymentTableX, paymentTableY + 60);
      doc.text('Puhelin: +358 123 4567', paymentTableX, paymentTableY + 70);
      doc.text('Sähköposti: info@logistix.fi', paymentTableX, paymentTableY + 80);

      // Save PDF
      doc.save(`invoice_${invoiceData.invoiceNumber}.pdf`);
    };
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <img
          src="/assets/logistix-logos/svg/logo.svg" // Using relative path from the 'public' directory
          alt="Logo"
          style={styles.logo}
        />
        <div style={styles.invoiceDetails}>
          <h2 style={styles.invoiceTitle}>Lasku</h2> {/* "Invoice" in Finnish */}
          <p><strong>Laskun numero:</strong> {invoiceData.invoiceNumber}</p> {/* Invoice Number */}
          <p><strong>Päivämäärä:</strong> {invoiceData.invoiceDate}</p> {/* Invoice Date */}
          <p><strong>Erottuva erä:</strong> {invoiceData.dueDate}</p> {/* Due Date */}
        </div>
        <div style={styles.qrCodeContainer}>
          <h3>Skannaa maksuviivakoodi</h3> {/* "Scan the payment barcode" in Finnish */}
          <canvas ref={qrCodeRef} style={styles.qrCode} /> {/* Canvas element for QR Code */}
        </div>
      </div>

      <div style={styles.customerInfo}>
        <p><strong>Asiakas:</strong> {invoiceData.customerName}</p> {/* Customer Name */}
        <p><strong>Osoite:</strong> {invoiceData.customerAddress}</p> {/* Customer Address */}
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Tuote</th> {/* "Item" in Finnish */}
            <th>Kuvaus</th> {/* "Description" in Finnish */}
            <th>Hinta</th> {/* "Price" in Finnish */}
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price.toFixed(2).replace('.', ',')} €</td> {/* Price with currency */}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.total}>
        <p><strong>Yhteensä:</strong> {invoiceData.amount.toFixed(2).replace('.', ',')} €</p> {/* Total amount */}
      </div>

      <div style={styles.footer}>
        <h4>Yhteystiedot</h4> {/* "Contact Information" in Finnish */}
        <p><strong>Logistix OY</strong></p>
        <p>Testikatu 1</p>
        <p>00100 Helsinki</p>
        <p>Puhelin: +358 123 4567</p>
        <p>Sähköposti: info@logistix.fi</p>
      </div>

      <button onClick={saveInvoice}>Tallenna lasku PDF:ksi</button> {/* "Save invoice as PDF" in Finnish */}
    </div>
  );
};

// Define your styles here
const styles = {
  page: { padding: '20px' },
  header: { display: 'flex', alignItems: 'center' },
  logo: { width: '50px', height: '50px' },
  invoiceDetails: { marginLeft: '20px' },
  invoiceTitle: { margin: 0 },
  qrCodeContainer: { marginLeft: 'auto', textAlign: 'center' },
  customerInfo: { margin: '20px 0' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
  total: { marginTop: '20px' },
  footer: { marginTop: '40px' },
  qrCode: { marginTop: '20px' },
};

export default InvoicePage;
