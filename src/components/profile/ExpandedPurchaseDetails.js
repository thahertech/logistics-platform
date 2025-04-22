import { Download } from "lucide-react";

const ExpandedPurchaseDetails = ({ purchase, onDownloadCSV }) => (
  <tr>
    <td colSpan={7} className="px-4 py-6 bg-gray-50">
      <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
        <h4 className="text-2xl font-semibold mb-4">Lisätiedot</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p><span className="font-medium">Ostotapahtuman ID:</span> {purchase.id}</p>
            <p><span className="font-medium">Toimituksen ID:</span> {purchase.shipment_id}</p>
            <p><span className="font-medium">Päivämäärä:</span> {purchase.purchase_date}</p>
            <p><span className="font-medium">Eräpäivä:</span> {purchase.due_date}</p>
          </div>
          <div>
            <p><span className="font-medium">Viitenumero:</span> {purchase.reference_number || "–"}</p>
            <p><span className="font-medium">Summa:</span> {purchase.amount != null ? `${purchase.amount} €` : "–"}</p>
            <p><span className="font-medium">Status:</span> {purchase.status}</p>
            <p><span className="font-medium">Tuotetiedot:</span> {purchase.details || "Ei tietoja"}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDownloadCSV(purchase.shipment_id, purchase.id);
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
        >
          <Download size={16} /> Lataa CSV
        </button>
      </div>
    </td>
  </tr>
);

export default ExpandedPurchaseDetails;