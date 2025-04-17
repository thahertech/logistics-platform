import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import bwipjs from 'bwip-js';

const generateInvoice = async (invoiceData) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.text('Lasku', 20, 20); // "Invoice" in Finnish

  // Invoice Details
  doc.setFontSize(12);
  doc.text(`Laskun numero: ${invoiceData.invoiceNumber}`, 20, 30); // "Invoice Number"
  doc.text(`Asiakkaan nimi: ${invoiceData.customerName}`, 20, 40); // "Customer Name"
  doc.text(`Asiakkaan osoite: ${invoiceData.customerAddress}`, 20, 50); // "Customer Address"
  doc.text(`Päivämäärä: ${new Date().toLocaleDateString('fi-FI')}`, 20, 60); // "Date"

  // Table Header
  const tableHeader = ['Tuote', 'Kuvaus', 'Hinta']; // "Item", "Description", "Price"
  const tableData = invoiceData.items.map(item => [item.name, item.description, item.price]);

  // Add Table Header
  autoTable(doc, {
    head: [tableHeader],
    body: tableData,
    startY: 70,
  });

  // Total
  const total = invoiceData.items.reduce((acc, item) => acc + item.price, 0);
  doc.text(`Yhteensä: ${total.toFixed(2)} €`, 20, doc.lastAutoTable.finalY + 10); // "Total"

  // Generate Barcode
  const barcodeImage = await generateBarcode(invoiceData.invoiceNumber);
  doc.addImage(barcodeImage, 'PNG', 20, doc.lastAutoTable.finalY + 20, 100, 20); // Adjust size as needed

  // Save the PDF
  doc.save(`lasku_${invoiceData.invoiceNumber}.pdf`); // "invoice" in Finnish
};

// Function to generate barcode as an image
const generateBarcode = (data) => {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer({
      bcid: 'code128',       // Barcode type
      text: data,           // Text to encode
      scale: 3,             // Scale factor
      height: 10,           // Height of the barcode
      includetext: true,    // Include text below the barcode
      textxalign: 'center', // Center the text
    }, (err, png) => {
      if (err) {
        reject(err);
      } else {
        resolve(png);
      }
    });
  });
};

export default generateInvoice;
