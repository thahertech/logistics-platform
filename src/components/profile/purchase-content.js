import { BadgeCheck, Clock, Truck, FileText, Download } from "lucide-react";
import {HelpCircle } from "lucide-react";
import { ShoppingCart } from "lucide-react"; // Import icons

import React, { useState, Fragment } from "react";
import Papa from "papaparse";
import { supabase } from "@/supabaseClient";

import PaginationControls from "@/components/page-controls/PaginationControls"; 
import OrderFilterControls from "../filtering/userFiltering/OrderFilterControls";
import PurchaseTable from "./tables/PurchaseTable";
import { usePurchases } from "@/lib/hooks/usePurchases";

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

  const { currentPurchases, totalPages } = usePurchases(
    purchases,
    filterStatus,
    sortBy,
    currentPage,
    itemsPerPage
  );


  const downloadCSV = async (shipmentId, purchaseId) => {
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
    const url = new URL('https://ccjggzpkomwjzwrawmyr.supabase.co/functions/v1/export-shipment-purchases');
    url.searchParams.append('shipment_id', shipmentId);
    url.searchParams.append('purchase_id', purchaseId);
  
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch CSV");
        }
        return response.text(); 
      })
      .then((csvData) => {

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
          <PurchaseTable
            purchases={currentPurchases}
            expandedId={expandedPurchase}
            onToggle={setExpandedPurchase}
            onViewInvoice={handleViewInvoice}
            onDownloadCSV={downloadCSV}
          />
          <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
          />
        </div>
      ) : (
        <div className="text-center py-6 text-gray-400">Ei ostotietoja.</div>
      )}
    </div>
  );
};

export default PurchasesContent;