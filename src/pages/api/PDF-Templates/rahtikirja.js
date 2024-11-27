import FreightLog from './freight-log';
import { mockShipment } from '@/app/fakeData/mockShipment';
import { generateFreightLogPDF } from '@/app/Invoicing/pdf-generator';
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
