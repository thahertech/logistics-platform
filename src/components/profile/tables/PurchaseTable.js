import PurchaseRow from "./PurchaseRow";
import ExpandedPurchaseDetails from "../ExpandedPurchaseDetails";
import { Fragment } from "react";
const PurchaseTable = ({
  purchases,
  expandedId,
  onToggle,
  onViewInvoice,
  onDownloadCSV,
}) => (
  <table className="w-full">
    <thead className="bg-gray-900 text-gray-100 rounded-t-xl">
      <tr>
        <th className="px-4 py-3">Päivämäärä</th>
        <th className="px-4 py-3">Eräpäivä</th>
        <th className="px-4 py-3">Viite</th>
        <th className="px-4 py-3">Status</th>
        <th className="px-4 py-3">Summa</th>
        <th className="px-4 py-3">Tuote</th>
        <th className="px-4 py-3">Kuitti</th>
      </tr>
    </thead>
    <tbody>
            {purchases.map((purchase) => (
                <Fragment key={purchase.id}>
                <PurchaseRow
                    purchase={purchase}
                    isExpanded={expandedId === purchase.id}
                    onToggle={onToggle}
                    onViewInvoice={onViewInvoice}
                />
                {expandedId === purchase.id && (
                    <tr key={`${purchase.id}-expanded`}>
                    <td colSpan="7">
                        <ExpandedPurchaseDetails
                        purchase={purchase}
                        onDownloadCSV={onDownloadCSV}
                        />
                    </td>
                    </tr>
                )}
                </Fragment>
            ))}
            </tbody>
  </table>
);
export default PurchaseTable;