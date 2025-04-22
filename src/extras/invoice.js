import JsBarcode from "jsbarcode";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useRouter } from 'next/router';
import virtuaaliviivakoodi from "virtuaaliviivakoodi";
import { supabase } from '@/supabaseClient';
import Image from "next/image";
const InvoicePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [invoiceData, setInvoiceData] = useState(null);

  console.log("Router query ID:", id);
  
  useEffect(() => {
    const fetchInvoiceData = async () => {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from('shipments')
          .select('*')
          .eq('id', id);
  
        if (error) throw error;
  
        if (data) {
          const invoice = data[0];
          console.log("Fetched invoice data:", invoice);
          invoice.items = Array.isArray(invoice.items) 
            ? invoice.items 
            : invoice.items 
              ? JSON.parse(invoice.items) 
              : [];
          setInvoiceData(invoice);
        }
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };
  
    fetchInvoiceData();

  }, [id]);

  if (!invoiceData && id) {
    return <div>Loading...</div>;
  }
  if (!invoiceData) {
    return <div>No invoice found.</div>;
  }

  const calculateCommission = (price) => price * 0.1;

  const generateVirtuaaliviivakoodi = () => {
    const rawDate = invoiceData.due_date;
    const dateObj = new Date(rawDate);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = String(dateObj.getFullYear()).slice(2);

    invoiceData.due_date_formatted = `${year}${month}${day}`;
    try {
      const options = {
        iban: invoiceData.bank_account.replace(/\s/g, ""),
        reference: invoiceData.reference_number,
        cents: Math.round(invoiceData.amount * 100),
        due: invoiceData.due_date_formatted.toString().replace(/-/g, "."),
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

    const logoUrl = "/assets/logistix-logos/png/logo.png";
    const img = new Image();
    img.src = logoUrl;

    img.onload = () => {
      doc.addImage(img, "PNG", 20, 20, 50, 50);

      doc.setFontSize(12);
      doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 80, 40);
      doc.text(`Date: ${invoiceData.delivery_date}`, 80, 50);
      doc.text(`Due Date: ${invoiceData.due_date}`, 80, 60);
      doc.text(`Customer: ${invoiceData.customerName}`, 80, 70);
      doc.text(`Address: ${invoiceData.customerAddress}`, 80, 80);

      // Add items table
      doc.text("Product", 20, 100);
      doc.text("Description", 70, 100);
      doc.text("Price (€)", 140, 100);
      doc.text("Logistix Commission (€)", 180, 100);

      let y = 110;

      const items = Array.isArray(invoiceData.items) 
        ? invoiceData.items 
        : typeof invoiceData.items === "string" 
          ? JSON.parse(invoiceData.items) 
          : [];

      if (items.length === 0) {
        doc.text("No products", 20, y);
        y += 10;
      } else {
        items.forEach((item) => {
          const commission = calculateCommission(item.price);
          doc.text(item.delivery_address || "N/A", 20, y);
          doc.text(item.recipient_email || "N/A", 70, y);
          doc.text(item.price ? item.price.toFixed(2).replace(".", ",") + " €" : "N/A", 140, y);
          doc.text(item.price ? commission.toFixed(2).replace(".", ",") + " €" : "N/A", 180, y);
          y += 10;
        });
      }

      const totalAmountWithCommission = invoiceData.items.reduce((total, item) => total + item.price + calculateCommission(item.price), 0);
      doc.text(`Total: ${totalAmountWithCommission.toFixed(2).replace(".", ",")} €`, 20, y + 10);

      const barcodeData = generateVirtuaaliviivakoodi();
      let barcodeTextY = y + 30;

      const startX = 5;
      const tableWidth = 80;
      const endX = startX + tableWidth;

      const paymentInfoY = barcodeTextY + 60; 
      const paymentInfoData = [
        ["Receiver", "Thaher Al Amir"],
        ["IBAN", "FI55 5741 3620 5454 49"],
        ["Reference", invoiceData.referenceNumber],
        ["Due Date", invoiceData.dueDate],
        ["Amount (€)", totalAmountWithCommission.toFixed(2).replace(".", ",")],
      ];

      const tableColumnWidths = [30, 70];
      const rowHeight = 5;

      doc.setFontSize(12);
      doc.setFillColor(200, 200, 200);

      let startY = paymentInfoY;

      paymentInfoData.forEach((row, index) => {
        const rowY = startY + Math.floor(index / 2) * (rowHeight + 5);
        const colX = startX + (index % 2) * (tableColumnWidths[0] + tableColumnWidths[1]);

        doc.rect(colX, rowY, tableColumnWidths[0] + tableColumnWidths[1], rowHeight + 5);
        doc.text(row[0], colX + 5, rowY + 6);
        doc.text(row[1], colX + 5 + tableColumnWidths[0], rowY + 6);
      });

      if (barcodeData) {
        const barcodeCanvas = document.createElement("canvas");
        JsBarcode(barcodeCanvas, barcodeData, {
          format: "CODE128",
          displayValue: true,
          height: 50,
          width: 2,
        });

        const barcodeImage = barcodeCanvas.toDataURL("image/png");
        const pageWidth = doc.internal.pageSize.width;
        const barcodeWidth = pageWidth * 0.7;
        const barcodeHeight = 50;
        const barcodeX = (pageWidth - barcodeWidth) / 2;

        doc.addImage(barcodeImage, "PNG", barcodeX, y + 20, barcodeWidth, barcodeHeight);
      } else {
        doc.text("Virtuaaliviivakoodi: Error generating barcode", 20, y + 20);
      }

      doc.save(`Logistix_invoice_${invoiceData.invoiceNumber}.pdf`);
    };
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <Image src="/assets/logistix-logos/svg/logo.svg" alt="Logo" style={styles.logo} />
        <div style={styles.invoiceDetails}>
          <h2>Invoice</h2>
          <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
          <p><strong>Date:</strong> {invoiceData.invoiceDate}</p>
          <p><strong>Due Date:</strong> {invoiceData.dueDate}</p>
        </div>
      </div>
      <div style={styles.customerInfo}>
        <p><strong>Customer:</strong> {invoiceData.customerName}</p>
        <p><strong>Address:</strong> {invoiceData.customerAddress}</p>
      </div>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th>Product</th>
              <th>Description</th>
              <th>Price (€)</th>
              <th>Commission (€)</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.length > 0 ? (
              invoiceData.map((invoiceData, index) => (
                <tr key={index}>
                  <td>{invoiceData.details || "N/A"}</td>
                  <td>{invoiceData.price ? invoiceData.price.toFixed(2) + " €" : "N/A"}</td>
                  <td>{calculateCommission(invoiceData.price).toFixed(2) + " €"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={styles.footer}>
        <button onClick={saveInvoice} style={styles.downloadButton}>Download Invoice PDF</button>
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
    backgroundColor: "#f9f9f9", // Subtle background color
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
  tableContainer: {
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#f4f4f4",
    textAlign: "left",
  },
  tableData: {
    borderBottom: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  downloadButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
};

export default InvoicePage;