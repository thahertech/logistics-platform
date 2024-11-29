import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { generateBarcode } from './barcodeGenerator';
import { mockShipment } from '../fakeData/mockShipment';
import { logoBase64 } from './logoBase64';

export const generateFreightLogPDF = (shipment) => {
    const doc = new jsPDF();

    doc.addImage(logoBase64, 'PNG', 20, 10, 20, 20); // logo dimensions (20x20)

    // Title in the Center
    doc.setFontSize(14);
    doc.text("RAHTIKIRJA / FRAKTSEDEL", 105, 20, null, null, 'center');

    // 1. Header Section
    doc.setFontSize(10);
    doc.autoTable({
        startY: 40,
        theme: 'grid',
        tableLineColor: [0, 0, 0],
        tableLineWidth: 0.1,
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [220, 220, 220], fontStyle: 'bold' },
        body: [
            ["Lähettäjä / Avsändare", shipment.sender],
            ["Asiakasnro / Kundnr", shipment.customerNumber],
            ["Lähetyspäivämäärä / Avsändningsdatum", shipment.shipmentDate],
            ["Numero / Num", shipment.number],
            ["Sopimusnro / Avtalsnr", shipment.contractNumber],
            ["Toimituspäivämäärä / Leveransdatum", shipment.deliveryDate]
        ]
    });

    // 2. Recipient Section
    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        theme: 'grid',
        tableLineColor: [0, 0, 0],
        tableLineWidth: 0.1,
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [220, 220, 220], fontStyle: 'bold' },
        body: [
            ["Vastaanottaja / Mottagare", shipment.recipient],
            ["Määräpaikka / Bestämmelseort", shipment.destination],
            ["Lähtöpaikka / Avsändningsort", shipment.origin],
            ["Kuljetusohjeet / Transportinstruktioner", shipment.transportInstructions],
            ["Rahdinmaksaja / Fraktbetalare", shipment.payer]
        ]
    });

    // 3. Shipment Details
    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        theme: 'grid',
        tableLineColor: [0, 0, 0],
        tableLineWidth: 0.1,
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [220, 220, 220], fontStyle: 'bold' },
        body: [
            ["Kolliluku ja -laji / Kolliantal och -slag", shipment.packageCount],
            ["Sisältö ja mitat / Innehåll och yttermått", shipment.contents],
            ["Brutto, kg", shipment.grossWeight],
            ["Tilavuus m³", shipment.volume]
        ]
    });

    // 4. Instructions
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.setFont("Helvetica", "bold");
    doc.text("Lisäohjeet / Tilläggsinstruktioner:", 10, finalY);
    doc.setFont("Helvetica", "normal");
    doc.text(shipment.additionalInstructions, 100, finalY);

    // 5. Insert Barcode
    const barcodeBase64 = generateBarcode(shipment.number);
    doc.addImage(barcodeBase64, 'PNG', 10, finalY + 20, 60, 20);

    doc.save("freight_log.pdf");
};