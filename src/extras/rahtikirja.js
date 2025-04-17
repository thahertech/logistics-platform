import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { generateBarcode } from '@/app/invoice/barcodeGenerator';
import { mockShipment } from '@/app/data/mockShipment';
import { logoBase64 } from '@/app/invoice/logoBase64';

const startNewSection = (doc) => {
    const remainingHeight = doc.internal.pageSize.height - doc.lastAutoTable.finalY;
    return remainingHeight < 30 ? 10 : doc.lastAutoTable.finalY + 10; // Start a new section if space is less than 30
};

const generateFreightLogPDF = (shipment) => {
    const doc = new jsPDF();

    // 1. Add Logo - Adjusting position and size for better layout
    doc.addImage(logoBase64, 'PNG', 10, 10, 30, 30); // Logo positioned at (10, 10) and sized to 30x30

    // 2. Title - Centered
    doc.setFontSize(14);
    doc.text("RAHTIKIRJA / FRAKTSEDEL", 105, 20, null, null, 'center'); // Centered at X=105, Y=20

// 3. Header Section (Sender info)
doc.autoTable({
    startY: 20,
    theme: 'grid',
    tableLineColor: [0, 0, 0], 
    tableLineWidth: 0.1,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [220, 220, 220], fontStyle: 'bold' },
    body: [
        ["Sender / Lähettäjä", shipment.sender],
        ["Customer No / Asiakasnro", shipment.customerNumber],
        ["Shipment Date / Lähetyspäivämäärä", shipment.shipmentDate],
        ["Shipment No / Numero", shipment.number],
        ["Contract No / Sopimusnro", shipment.contractNumber],
        ["Delivery Date / Toimituspäivämäärä", shipment.deliveryDate]
    ]
});

// 4. Recipient Section (Including Carrier and Signature details)
doc.autoTable({
    startY: startNewSection(doc),
    theme: 'grid',
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.1,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [220, 220, 220], fontStyle: 'bold' },
    body: [
        ["Recipient / Vastaanottaja", shipment.recipient],
        ["Destination / Määräpaikka", shipment.destination],
        ["Place of Origin / Lähtöpaikka", shipment.origin],
        ["Transport Instructions / Kuljetusohjeet", shipment.transportInstructions],
        ["Freight Payer / Rahdinmaksaja", shipment.payer],
        ["Carrier / Kuljettaja", shipment.carrierName],  // Added Carrier info
        ["Carrier Address / Kuljettajan osoite", shipment.carrierAddress],  // Carrier address
        ["Place and Date / Paikka ja päivämäärä", shipment.placeDate]  // Date and place of signing
    ]
});



    // 5. Shipment Details Section
    doc.autoTable({
        startY: startNewSection(doc), // Dynamically calculate starting position
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

    // 6. CMR-specific Clauses Section
    const finalY = doc.lastAutoTable.finalY + 20;

doc.autoTable({
    startY: startNewSection(doc),
    theme: 'grid',
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.1,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [220, 220, 220], fontStyle: 'bold' },
    body: [
        ["CMR Clause", "Liability and conditions based on CMR Convention (refer to the relevant CMR articles)."],
        ["Signatures / Allekirjoitukset", "Sender: ________________\nCarrier: ________________\nRecipient: ________________"]
    ]
});

    // 7. Insert Barcode
    const barcodeBase64 = generateBarcode(shipment.number);
    doc.addImage(barcodeBase64, 'PNG', 10, finalY + 20, 60, 20); // Insert barcode below instructions

    // 8. Save PDF
    doc.save("freight_log.pdf");
};

const FreightLogPage = () => {
    // Assuming `mockShipment` is an example shipment data. You can replace this with real data or API call.
    const shipment = mockShipment;

    return (
        <div style={{ padding: '20px' }}>
            <button
                onClick={() => generateFreightLogPDF(shipment)}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                }}
            >
                Generate Freight Log PDF
            </button>
        </div>
    );
};

export default FreightLogPage;