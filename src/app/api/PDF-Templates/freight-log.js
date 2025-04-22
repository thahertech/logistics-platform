import React from 'react';;
import Barcode from 'react-barcode';
import '@/app/Styles/PDF.modules.css';

const FreightLog = ({ shipment }) => {
    console.log(shipment);
    return (
        <div className="freight-log">
            <h2>RAHTIKIRJA / FRAKTSEDEL</h2>

            <div className="freight-section">
                <div><strong>Lähettäjä / Avsändare:</strong> {shipment.sender}</div>
                <div><strong>Asiakasnro / Kundnr:</strong> {shipment.customerNumber}</div>
                <div><strong>Lähetyspäivämäärä / Avsändningsdatum:</strong> {shipment.shipmentDate}</div>
                <div><strong>Numero / Num:</strong> {shipment.number}</div>
                <div><strong>Sopimusnro / Avtalsnr:</strong> {shipment.contractNumber}</div>
                <div><strong>Toimituspäivämäärä / Leveransdatum:</strong> {shipment.deliveryDate}</div>
            </div>

            <div className="freight-section">
                <div><strong>Vastaanottaja / Mottagare:</strong> {shipment.recipient}</div>
                <div><strong>Määräpaikka / Bestämmelseort:</strong> {shipment.destination}</div>
                <div><strong>Lähtöpaikka / Avsändningsort:</strong> {shipment.origin}</div>
                <div><strong>Kuljetusohjeet / Transportinstruktioner:</strong> {shipment.transportInstructions}</div>
                <div><strong>Rahdinmaksaja / Fraktbetalare:</strong> {shipment.payer}</div>
            </div>

            <div className="freight-section">
                <div><strong>Kolliluku ja -laji / Kolliantal och -slag:</strong> {shipment.packageCount}</div>
                <div><strong>Sisältö ja mitat / Innehåll och yttermått:</strong> {shipment.contents}</div>
                <div><strong>Brutto, kg:</strong> {shipment.grossWeight}</div>
                <div><strong>Tilavuus m³:</strong> {shipment.volume}</div>
            </div>

            <div className="freight-section">
                <strong>Lisäohjeet / Tilläggsinstruktioner:</strong> {shipment.additionalInstructions}
            </div>

            {/* Barcode Section */}
            <div className="barcode">
                <Barcode value={shipment.number} width={2} height={50} />
            </div>
        </div>
    );
};

export default FreightLog;
