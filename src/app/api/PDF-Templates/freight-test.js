import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import bwipjs from "bwip-js";

const InvoicePage = () => {
  const generateRandomInvoiceNumber = () => {
    return Math.floor(1000000 + Math.random() * 9000000).toString(); // 7-digit random number
  };

  const generateReferenceNumber = (baseNumber) => {
    const weights = [7, 3, 1];
    const digits = baseNumber.split("").reverse();
    const sum = digits.reduce(
      (acc, digit, index) => acc + parseInt(digit, 10) * weights[index % 3],
      0
    );
    const checksum = (10 - (sum % 10)) % 10;
    return baseNumber + checksum;
  };

  const validateIBAN = (iban) => {
    const cleanIBAN = iban.replace(/\s+/g, "").toUpperCase();
    const rearranged = cleanIBAN.slice(4) + cleanIBAN.slice(0, 4);
    const converted = rearranged.replace(/[A-Z]/g, (char) => char.charCodeAt(0) - 55);
    return BigInt(converted) % 97n === 1n;
  };

  const generateBarcodeImage = (barcodeData) => {
    const canvas = document.createElement("canvas");
    bwipjs.toCanvas(canvas, {
      bcid: "code128", // Type of barcode
      text: barcodeData, // The barcode data
      scale: 3, // Scaling factor
      height: 15, // Height of the barcode
      includetext: true, // Include text under barcode
      textxalign: "center", // Align text
    });
    return canvas.toDataURL();
  };
  

  const generateVirtuaaliviivakoodi = (iban, amount, referenceNumber, dueDate) => {
    const formattedIban = iban.replace(/^FI/, ""); // Remove "FI" prefix from IBAN
    const formattedAmount = (amount * 100).toFixed(0).padStart(8, "0"); // Amount in cents, padded
    const formattedReference = referenceNumber.padStart(23, "0"); // Reference number padded
    const formattedDate = dueDate.replace(/-/g, "").slice(2); // Convert date to YYMMDD
  
    const barcodeData = `0004${formattedIban}${formattedAmount}${formattedReference}${formattedDate}`;
    return barcodeData;
  };
  

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "", // Initialize as empty for server-rendered content
    referenceNumber: "",
    invoiceDate: new Date().toISOString().slice(0, 10),
    customerName: "Test Customer",
    customerAddress: "Testikatu 1, 00100 Helsinki",
    items: [{ name: "Service A", description: "Description A", price: 199.99 }],
    bankAccountNumber: "FI5557413620545449", // User-provided IBAN
    amount: 199.99,
    dueDate: "2024-11-30",
  });

  // Generate random values on client-side after component mounts
  useEffect(() => {
    const randomInvoiceNumber = generateRandomInvoiceNumber();
    const referenceNumber = generateReferenceNumber(randomInvoiceNumber);

    setInvoiceData((prevData) => ({
      ...prevData,
      invoiceNumber: randomInvoiceNumber,
      referenceNumber: referenceNumber,
    }));
  }, []);

  const saveInvoiceAsPDF = () => {
    const doc = new jsPDF();

    const { invoiceNumber, invoiceDate, customerName, customerAddress, items, amount, bankAccountNumber, referenceNumber, dueDate } = invoiceData;

    // Header and Logo
    const logoUrl = "/assets/logistix-logos/png/logo.png";
    const img = new Image();
    img.src = logoUrl;

    img.onload = () => {
      doc.addImage(img, "PNG", 20, 20, 50, 50);
      doc.setFontSize(16);
      doc.text("Invoice", 20, 80);
      doc.setFontSize(12);

      // Invoice Details
      doc.text(`Invoice Number: ${invoiceNumber}`, 20, 90);
      doc.text(`Invoice Date: ${invoiceDate}`, 20, 100);
      doc.text(`Due Date: ${dueDate}`, 20, 110);

      // Customer Info
      doc.text(`Customer: ${customerName}`, 20, 120);
      doc.text(`Address: ${customerAddress}`, 20, 130);

      // Table Header
      doc.text("Product", 20, 150);
      doc.text("Description", 70, 150);
      doc.text("Price (€)", 140, 150);
      let y = 160;

      // Table Rows
      items.forEach((item) => {
        doc.text(item.name, 20, y);
        doc.text(item.description, 70, y);
        doc.text(item.price.toFixed(2).replace(".", ",") + " €", 140, y);
        y += 10;
      });

      // Total Amount
      doc.text(`Total: ${amount.toFixed(2).replace(".", ",")} €`, 20, y + 10);

      // Barcode
      const barcodeData = generateVirtuaaliviivakoodi(
        invoiceData.bankAccountNumber,
        invoiceData.amount,
        invoiceData.referenceNumber,
        invoiceData.dueDate
      );
      
      const barcodeImage = generateBarcodeImage(barcodeData);
      doc.addImage(barcodeImage, "PNG", 20, y + 20, 150, 50);
      

      // Save PDF
      doc.save(`invoice_${invoiceNumber}.pdf`);
    };
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Invoice Preview</h1>
      <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
      <p><strong>Invoice Date:</strong> {invoiceData.invoiceDate}</p>
      <p><strong>Customer Name:</strong> {invoiceData.customerName}</p>
      <p><strong>Customer Address:</strong> {invoiceData.customerAddress}</p>
      <p><strong>Due Date:</strong> {invoiceData.dueDate}</p>
      <p><strong>Total Amount:</strong> €{invoiceData.amount.toFixed(2)}</p>
      <p><strong>Bank Account:</strong> {invoiceData.bankAccountNumber}</p>
      <p><strong>Reference Number:</strong> {invoiceData.referenceNumber}</p>
      <button onClick={saveInvoiceAsPDF}>Save Invoice as PDF</button>
    </div>
  );
};

export default InvoicePage;
