import JsBarcode from "jsbarcode";
import React, { useState } from "react";
import { jsPDF } from "jspdf"; // jsPDF library
import virtuaaliviivakoodi from "virtuaaliviivakoodi";

const InvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "12345",
    invoiceDate: "2024-11-06",
    customerName: "Nana Laulumaa",
    customerAddress: "Testikatu 1, 00100 Helsinki",
    items: [
      { name: "Tuote 1", description: "Kuvaus", price: 1200.0 },
    ],
    bankAccountNumber: "FI55 5741 3620 5454 49",
    referenceNumber: "12345678",
    amount: 1200.0, // Amount in euros
    dueDate: "2024-11-30",
  });

  // Calculate commission for each item as 10% of the price
  const calculateCommission = (price) => price * 0.1;

  const generateVirtuaaliviivakoodi = () => {
    try {
      const options = {
        iban: invoiceData.bankAccountNumber.replace(/\s/g, ""), // Remove spaces
        reference: invoiceData.referenceNumber,
        cents: Math.round(invoiceData.amount * 100), // Convert amount to cents
        due: invoiceData.dueDate.replace(/-/g, "").slice(2), // Convert to YYMMDD
      };

      const barcodeData = virtuaaliviivakoodi(options);
      return barcodeData;
    } catch (error) {
      console.error("Error generating Virtuaaliviivakoodi:", error);
      return null;
    }
  };

  const saveInvoice = () => {
    const doc = new jsPDF();
  
    // Logo path
    const logoUrl = "/assets/logistix-logos/png/logo.png";
    const img = new Image();
    img.src = logoUrl;
  
    img.onload = () => {
      doc.addImage(img, "PNG", 20, 20, 50, 50);
  
      // Invoice details to the right of the logo
      doc.setFontSize(12);
      doc.text(`Laskun numero: ${invoiceData.invoiceNumber}`, 80, 40);
      doc.text(`Päivämäärä: ${invoiceData.invoiceDate}`, 80, 50);
      doc.text(`Eräpäivä: ${invoiceData.dueDate}`, 80, 60);
  
      // Add customer information
      doc.text(`Asiakas: ${invoiceData.customerName}`, 80, 70);
      doc.text(`Osoite: ${invoiceData.customerAddress}`, 80, 80);
  
      // Add items table
      doc.text("Tuote", 20, 100);
      doc.text("Kuvaus", 70, 100);
      doc.text("Hinta (€)", 140, 100);
      doc.text("Logistix palkkio (€)", 180, 100)
      let y = 110;

      invoiceData.items.forEach((item) => {
        const commission = calculateCommission(item.price);
        doc.text(item.name, 20, y);
        doc.text(item.description, 70, y);
        doc.text(item.price.toFixed(2).replace(".", ",") + " €", 140, y);
        doc.text(commission.toFixed(2).replace(".", ",") + " €", 180, y);
        y += 10;
      });

      const totalAmountWithCommission = invoiceData.items.reduce((total, item) => total + item.price + calculateCommission(item.price), 0);
      doc.text(`Yhteensä: ${totalAmountWithCommission.toFixed(2).replace(".", ",")} €`, 20, y + 10);

      const barcodeData = generateVirtuaaliviivakoodi();

      let barcodeTextY = y + 30;

      const startX = 5;  // Start X position (margin)
      const tableWidth = 80; // Table width that fits inside the page
      const endX = startX + tableWidth;  // Calculate the end X position

      const paymentInfoY = barcodeTextY + 60; // Adjust this to start below the barcode
      const paymentInfoData = [
        ["Saaja", "Thaher Al Amir"],
        ["Tilinumero", "FI55 5741 3620 5454 49"],
        ["Viitenumero", invoiceData.referenceNumber],
        ["Eräpäivä", invoiceData.dueDate],
        ["Summa (€)", totalAmountWithCommission.toFixed(2).replace(".", ",")],
      ];
  
      const tableColumnWidths = [30, 70]; // Column widths
      const rowHeight = 5; // Row height

      // Draw the grid-style table with borders and labels/values side by side
      doc.setFontSize(12);
      doc.setFillColor(200, 200, 200); // Set gray background for headers

      let startY = paymentInfoY;

      // Draw the table with the margins
      paymentInfoData.forEach((row, index) => {
        const rowY = startY + Math.floor(index / 2) * (rowHeight + 5); // Adjust Y for each row
        const colX = startX + (index % 2) * (tableColumnWidths[0] + tableColumnWidths[1]); // Alternate column placement

        // Draw boxes for each cell with the margin
        doc.rect(colX, rowY, tableColumnWidths[0] + tableColumnWidths[1], rowHeight + 5);
        doc.text(row[0], colX + 5, rowY + 6); // Label
        doc.text(row[1], colX + 5 + tableColumnWidths[0], rowY + 6); // Value
      });

      // Check if the barcode can be generated
      if (barcodeData) {
        // Create a canvas to render the barcode
        const barcodeCanvas = document.createElement("canvas");
        JsBarcode(barcodeCanvas, barcodeData, {
          format: "CODE128", // Use CODE128 for Virtuaaliviivakoodi
          displayValue: true, // Automatically show the barcode text below it
          height: 50, // Set barcode height (you can adjust this as needed)
          width: 2,
        });

        // Convert the barcode to a Data URL
        const barcodeImage = barcodeCanvas.toDataURL("image/png");

        // Get the page width and calculate barcode width
        const pageWidth = doc.internal.pageSize.width;
        const barcodeWidth = pageWidth * 0.7;
        const barcodeHeight = 50; // Define a fixed height for the barcode

        // Calculate the x position to center the barcode
        const barcodeX = (pageWidth - barcodeWidth) / 2; // Center barcode on the page

        // Add barcode image to the PDF
        doc.addImage(barcodeImage, "PNG", barcodeX, y + 20, barcodeWidth, barcodeHeight);
      } else {
        doc.text("Virtuaaliviivakoodi: Error generating barcode", 20, y + 20);
      }

      // Save PDF
      doc.save(`Logistix_lasku_${invoiceData.invoiceNumber}.pdf`);
    };
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <img src="/assets/logistix-logos/svg/logo.svg" alt="Logo" style={styles.logo} />
        <div style={styles.invoiceDetails}>
          <h2>Lasku</h2>
          <p><strong>Laskun numero:</strong> {invoiceData.invoiceNumber}</p>
          <p><strong>Päivämäärä:</strong> {invoiceData.invoiceDate}</p>
          <p><strong>Eräpäivä:</strong> {invoiceData.dueDate}</p>
        </div>
      </div>
      <div style={styles.customerInfo}>
        <p><strong>Asiakas:</strong> {invoiceData.customerName}</p>
        <p><strong>Osoite:</strong> {invoiceData.customerAddress}</p>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Tuote</th>
            <th>Kuvaus</th>
            <th>Hinta</th>
            <th>Logistix palkkio</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price.toFixed(2).replace(".", ",")} €</td>
              <td>{calculateCommission(item.price).toFixed(2).replace(".", ",")} €</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.footer}>
        <button onClick={saveInvoice} style={styles.downloadButton}>Lataa Lasku PDF</button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    margin: "0 auto",
    padding: "20px",
    maxWidth: "800px",
    border: "1px solid #ddd",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  logo: {
    width: "50px",
    height: "50px",
  },
  invoiceDetails: {
    textAlign: "right",
  },
  customerInfo: {
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  tableHeader: {
    backgroundColor: "#f4f4f4",
  },
  tableData: {
    borderBottom: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
  },
  downloadButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default InvoicePage;