import React, { useState, Fragment } from "react";
import OrderFilterControls from "../filtering/userFiltering/OrderFilterControls";
import { toast } from "react-toastify";
import { useShipmentHandlers } from '@/components/shipments/api/Utils/shipmentUtils';
import OrderTableRow from "@/components/profile/tables/OrderTableRow";
import Pagination from "@/components/page-controls/PaginationControls";
import { useOrders } from "@/lib/hooks/useOrders";
import OrderTable from "./tables/OrderTable";

const OrdersContent = ({ orders, handleViewDetails, userRole }) => {
  const { handleEditShipment, handleDeleteShipment, handleDuplicateShipment } = useShipmentHandlers();

  const title = userRole === 'kuljettaja' ? 'Kuljetukset' : 'Tilauspyynnöt';
  const [sortBy, setSortBy] = useState("created_at");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const statuses =
  [
      { value: "draft", label: "Luonnos" },
      { value: "available", label: "Julkaistu" },
      { value: "matkalla", label: "Valmis" },
      { value: "purchased", label: "Odottaa noutoa" },
    ];
  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const { currentOrders, totalPages } = useOrders(orders, filterStatus, sortBy, currentPage, itemsPerPage);
  
  return (
    <div className="p-4 rounded-xl bg-white/5 shadow-md backdrop-blur">
      <h3 className="text-xl font-semibold mb-6 text-white">{title}</h3>

    <div className="flex gap-4 mb-4 text-white">
      <OrderFilterControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        statusOptions={statuses}
      />
    </div>
    {orders.length > 0 ? (
        <>
          <OrderTable
            orders={currentOrders}
            expandedOrder={expandedOrder}
            toggleOrderDetails={toggleOrderDetails}
            handleViewDetails={handleViewDetails}
            handleEditShipment={handleEditShipment}
            handleDeleteShipment={handleDeleteShipment}
            handleDuplicateShipment={handleDuplicateShipment}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="text-center py-6 text-gray-400">Ei tilauksia.</div>
      )}
    </div>
  );
};

export default OrdersContent;