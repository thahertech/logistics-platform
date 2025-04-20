import { BadgeCheck, Clock, FileText } from "lucide-react";

const PurchasesContent = ({ purchases, handleViewInvoice }) => {
    return (
      <div className="p-4 rounded-xl bg-white/5 shadow-md backdrop-blur">
        <h3 className="text-xl font-semibold mb-6 text-white">Ostot</h3>
  
        {purchases.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm text-left">
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
              <tbody className="text-white/90">
                {purchases.map((purchase) => (
                  <tr
                    key={purchase.id}
                    className="border-b border-white/10 hover:bg-white/10 transition"
                  >
                    <td className="px-4 py-3">
                      {purchase.purchase_date
                        ? new Date(purchase.purchase_date).toLocaleDateString("fi-FI")
                        : "–"}
                    </td>
                    <td className="px-4 py-3">
                      {purchase.due_date
                        ? new Date(purchase.due_date).toLocaleDateString("fi-FI")
                        : "–"}
                    </td>
                    <td className="px-4 py-3">{purchase.reference_number || "–"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                        ${
                          purchase.status === "matkalla"
                            ? "bg-green-600 text-white"
                            : purchase.status === "Odottaa noutoa"
                            ? "bg-yellow-500 text-black"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {purchase.status === "matkalla" && <BadgeCheck size={14} />}
                        {purchase.status === "Odottaa noutoa" && <Clock size={14} />}
                        {purchase.status === "matkalla"
                          ? "Maksettu"
                          : purchase.status === "Odottaa noutoa"
                          ? "Odottaa noutoa"
                          : "–"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {purchase.amount != null ? `${purchase.amount} €` : "–"}
                    </td>
                    {/* Display item details */}
                    <td className="px-4 py-3">
                      {purchase.details ? purchase.details : "Ei tietoja"}
                    </td>
                    <td className="px-4 py-3">
                      {purchase.invoice_url ? (
                        <button
                          onClick={() => handleViewInvoice(purchase.invoice_url)}
                          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-full transition"
                        >
                          <FileText size={14} />
                          Näytä kuitti
                        </button>
                      ) : (
                        "–"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400">Ei ostotietoja.</div>
        )}
      </div>
    );
  };
  
  export default PurchasesContent;