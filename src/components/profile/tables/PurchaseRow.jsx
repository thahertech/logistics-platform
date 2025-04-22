import StatusBadge from "../StatusBadge";
import { FileText } from "lucide-react";

const PurchaseRow = ({ purchase, isExpanded, onToggle, onViewInvoice }) => (
  <tr
    onClick={() => onToggle(purchase.id)}
    className="cursor-pointer border-b hover:bg-gray-50 transition"
  >
    <td className="px-4 py-3">{purchase.purchase_date}</td>
    <td className="px-4 py-3">{purchase.due_date}</td>
    <td className="px-4 py-3">{purchase.reference_number || "–"}</td>
    <td className="px-4 py-3">
      <StatusBadge status={purchase.status} />
    </td>
    <td className="px-4 py-3">
      {purchase.amount != null ? `${purchase.amount} €` : "–"}
    </td>
    <td className="px-4 py-3">{purchase.details || "Ei tietoja"}</td>
    <td className="px-4 py-3">
      {purchase.invoice_url ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewInvoice(purchase.invoice_url);
          }}
          className="flex items-center gap-1 text-blue-600 hover:underline"
        >
          <FileText size={14} />
          Näytä kuitti
        </button>
      ) : (
        "–"
      )}
    </td>
  </tr>
);

export default PurchaseRow;