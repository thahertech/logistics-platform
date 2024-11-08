import React from 'react';
import { jsPDF } from 'jspdf';

const FreightLog = () => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Use the URL of the logo directly from the public folder
    const logoUrl = '/assets/logistix-logos/png/logo.png';

    // Add logo (ensure it’s accessible)
    doc.addImage(logoUrl, 'PNG', 10, 10, 50, 20); // Adjust position and size
    doc.setFontSize(20);
    doc.text("Freight Log", 70, 25); // Title

    // Add customer details
    doc.setFontSize(12);
    doc.text("Asiakkaan nimi: Matti Meikäläinen", 10, 50);
    doc.text("Osoite: Testikatu 1, 00100 Helsinki", 10, 60);
    
    // Add table headers
    doc.setFontSize(14);
    doc.text("Tuote", 10, 80);
    doc.text("Kuvaus", 60, 80);
    doc.text("Hinta (€)", 130, 80);
    
    // Add a border for the table
    doc.setLineWidth(0.5);
    doc.line(10, 82, 190, 82); // Top border

    // Add product details
    const items = [
      { name: "Tuote 1", description: "Kuvaus 1", price: "100,00" },
      { name: "Tuote 2", description: "Kuvaus 2", price: "200,00" },
    ];

    items.forEach((item, index) => {
      const y = 90 + index * 10;
      doc.text(item.name, 10, y);
      doc.text(item.description, 60, y);
      doc.text(item.price, 130, y);
    });

    // Add footer details
    doc.setFontSize(12);
    doc.text("Pankkitili: FI2112345600000785", 10, 150);
    doc.text("Viitenumero: 1234567890", 10, 160);
    
    // Save the PDF
    doc.save("freight_log.pdf");
  };

  return (
    <div style={styles.container}>
      <h1>Freight Log</h1>
      <button onClick={generatePDF} style={styles.button}>Tallenna PDF</button>
      <div style={styles.log}>
        <img src="/assets/logistix-logos/png/logo.png" alt="Logo" style={styles.logo} />
        <h2 style={styles.title}>Freight Log</h2>
        <p><strong>Asiakkaan nimi:</strong> Matti Meikäläinen</p>
        <p><strong>Osoite:</strong> Testikatu 1, 00100 Helsinki</p>
        
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Tuote</th>
              <th>Kuvaus</th>
              <th>Hinta (€)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tuote 1</td>
              <td>Kuvaus 1</td>
              <td>100,00</td>
            </tr>
            <tr>
              <td>Tuote 2</td>
              <td>Kuvaus 2</td>
              <td>200,00</td>
            </tr>
          </tbody>
        </table>

        <div style={styles.footer}>
          <p>Pankkitili: FI2112345600000785</p>
          <p>Viitenumero: 1234567890</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  button: {
    marginBottom: '20px',
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  log: {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '5px',
    marginTop: '20px',
    backgroundColor: '#f9f9f9',
  },
  logo: {
    height: '75px',
    width: '75px'
  },
  title: {
    margin: '10px 0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'right',
  },
};

export default FreightLog;
