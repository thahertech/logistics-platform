import FreightLog from './freight-log';
import { mockShipment } from '@/app/data/mockShipment';
import { generateFreightLogPDF } from '@/app/invoice/pdf-generator';
import PDFstyles from '@/app/Styles/PDF.modules.css';

const Rahtikirja = () => {
    return (
        <div className="App">
            <FreightLog shipment={mockShipment} />
            <button onClick={() => generateFreightLogPDF(mockShipment)}>
                Download as PDF
            </button>
        </div>
    );
};

export default Rahtikirja;
