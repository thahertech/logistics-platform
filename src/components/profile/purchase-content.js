import { BadgeCheck, Clock, Truck, FileText, Download } from "lucide-react";
import {HelpCircle } from "lucide-react";
import { ShoppingCart } from "lucide-react"; // Import icons

import React, { useState, Fragment } from "react";
import OrderFilterControls from "../filtering/userFiltering/OrderFilterControls";
import Papa from "papaparse"; // Import papaparse
import { supabase } from "@/supabaseClient"; // Import your Supabase client
import StatusBadge from "./StatusBadge";

const PurchasesContent = ({ purchases, handleViewInvoice, userRole }) => {
  const [expandedPurchase, setExpandedPurchase] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

 
  const statuses = [
    { value: "Odottaa noutoa", label: "Odottaa noutoa" },
    { value: "valmis", label: "Maksettu" },
    { value: "matkalla", label: "Matkalla" },
    { value: "delivered", label: "Määränpäässä" },
  ];

  const filteredPurchases = purchases.filter(purchases =>
    filterStatus === "all" ? true : purchases.status === filterStatus
  );
  
  const sortedPurchases = [...filteredPurchases].sort((a, b) => {
    if (sortBy === "created_at") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  const togglePurchaseDetails = (purchaseId) => {
    if (expandedPurchase === purchaseId) {
      setExpandedPurchase(null);
    } else {
      setExpandedPurchase(purchaseId);
    }
  };

  const downloadCSV = async (shipmentId, purchaseId) => {
    // Ensure the shipmentId and purchaseId are provided
    if (!shipmentId || !purchaseId) {
      alert("Please provide both shipment ID and purchase ID.");
      return;
    }
  
    const { data: { session }, error } = await supabase.auth.getSession();

    const accessToken = session.access_token;

    if (!accessToken) {
      alert("Access token is missing. Please log in.");
      return;
    }
    // Construct the URL with query parameters
    const url = new URL('https://ccjggzpkomwjzwrawmyr.supabase.co/functions/v1/export-shipment-purchases');
    url.searchParams.append('shipment_id', shipmentId);
    url.searchParams.append('purchase_id', purchaseId);
  
    fetch(url, {
      method: "GET", // Use GET since you're appending parameters to the URL
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`, // Include the Bearer token
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch CSV");
        }
        return response.text(); // Read the response as text (CSV)
      })
      .then((csvData) => {
        // Create a download link and trigger the download
        const link = document.createElement("a");
        link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvData);
        link.target = "_blank";
        link.download = "logistix_lasku.csv";
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading CSV:", error);
        alert("There was an error downloading the CSV.");
      });
  };

  const totalPages = Math.ceil(sortedPurchases.length / itemsPerPage);
const paginatedPurchases = sortedPurchases.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
  return (
    <div className="p-4 rounded-xl bg-white/5 shadow-md backdrop-blur">
      <h3 className="text-xl font-semibold mb-6 text-white">Ostot</h3>

      {purchases.length > 0 ? (
        <div className="overflow-x-auto">
          <OrderFilterControls
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            statusOptions={statuses}
          />
          <div className="flex justify-between mb-4">
         
          </div>
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
            {paginatedPurchases.map((purchase) => (
                <Fragment key={purchase.id}>
                  <tr
                    onClick={() => togglePurchaseDetails(purchase.id)}
                    className="border-b border-white/10 hover:bg-white/10 transition cursor-pointer"
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
                       <StatusBadge status={purchase.status} />
                     </td>
                    <td className="px-4 py-3">
                      {purchase.amount != null ? `${purchase.amount} €` : "–"}
                    </td>
                    <td className="px-4 py-3">
                      {purchase.details || "Ei tietoja"}
                    </td>
                    <td className="px-4 py-3">
                      {purchase.invoice_url ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewInvoice(purchase.invoice_url);
                          }}
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

                  {expandedPurchase === purchase.id && (
                    <tr>
                      <td colSpan={7} className="px-4 py-6">
                        <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-black bg-opacity-90 border border-black rounded-2xl p-6 shadow-2xl backdrop-blur-md transition-all duration-300 ease-in-out hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]">
                          <h4 className="text-2xl font-semibold text-white-300 mb-4">Lisätiedot</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-base">
                            <div>
                              <p><span className="font-medium text-zinc-400">Päivämäärä:</span> {purchase.purchase_date ? new Date(purchase.purchase_date).toLocaleDateString("fi-FI") : "–"}</p>
                              <p><span className="font-medium text-zinc-400">Eräpäivä:</span> {purchase.due_date ? new Date(purchase.due_date).toLocaleDateString("fi-FI") : "–"}</p>
                              <p><span className="font-medium text-zinc-400">Viitenumero:</span> {purchase.reference_number || "–"}</p>
                              <p><span className="font-medium text-zinc-400">Status:</span> {purchase.status || "–"}</p>
                            </div>
                            <div>
                              <p><span className="font-medium text-zinc-400">Summa:</span> {purchase.amount != null ? `${purchase.amount} €` : "–"}</p>
                              <p><span className="font-medium text-zinc-400">Tuote:</span> {purchase.details || "Ei tietoja"}</p>
                              <p><span className="font-medium text-zinc-400">Kuitti:</span>{" "}
                                {purchase.invoice_url ? (
                                  <a
                                    href={purchase.invoice_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-400 hover:text-indigo-300 underline transition"
                                  >
                                    Avaa kuitti
                                  </a>
                                ) : (
                                  "–"
                                )}
                                
                              </p>
                            </div>
                            
                          </div>
                          <button
                            onClick={(e) => {
                                      e.stopPropagation();
                                      downloadCSV(purchase.shipment_id, purchase.id);
                                    }}className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-full transition"
                          > 
                            <Download size={14} />
                            Lataa CSV
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
 
          </table>
          <div className="flex justify-between items-center w-1/3 mt-4 text-white">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
  >
    ← Edellinen
  </button>
  <span className="text-sm">Sivu {currentPage} / {totalPages}</span>
  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
  >
    Seuraava →
  </button>
</div>
        </div>
      ) : (
        <div className="text-center py-6 text-gray-400">Ei ostotietoja.</div>
      )}
    </div>
  );
};

export default PurchasesContent;