import { BadgeCheck, Clock, Truck, ShoppingCart, HelpCircle } from "lucide-react"; // Import icons
import React, { useState, Fragment } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import OrderFilterControls from "../filtering/userFiltering/OrderFilterControls";
import StatusBadge from "./StatusBadge";
const OrdersContent = ({ orders, handleViewDetails, userRole }) => {
  const title = userRole === 'kuljettaja' ? 'Kuljetukset' : 'Tilauspyynnöt';
  const [sortBy, setSortBy] = useState("created_at");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // or any other value you want
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

  const filteredOrders = orders.filter(order =>
    filterStatus === "all" ? true : order.status === filterStatus
  );
  
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "created_at") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentOrders = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
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
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm text-left">
            <thead className="bg-gray-900 text-gray-100 rounded-t-xl">
              <tr>
                <th className="px-4 py-3">Määränpää</th>
                <th className="px-4 py-3">Sijainti</th>
                <th className="px-4 py-3">Nouto</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Hinta</th>
                <th className="px-4 py-3">Muokkaa</th>
              </tr>
            </thead>
            <tbody className="text-white/90">
            {currentOrders.map((order) => (
                <Fragment key={order.id}>
                  <tr
                    onClick={() => toggleOrderDetails(order.id)}
                    className="border-b border-white/10 hover:bg-white/10 transition cursor-pointer"
                  >
                    <td className="px-4 py-3">{`${order.delivery_address}, ${order.delivery_postal_code}` || "–"}</td>
                    <td className="px-4 py-3">{`${order.pickup_address}, ${order.pickup_postal_code}` || "–"}</td>
                    <td className="px-4 py-3">
                      {order.pickup_date != null
                        ? new Date(order.pickup_date).toLocaleDateString("fi-FI")
                        : "–"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3">
                      {order.price != null ? `${order.price} EUR` : "–"}
                    </td>
                    <td className="px-4 py-3">
                      <PrimaryButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(order);
                      }
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-full transition"
                      >
                        Näytä tiedot
                      </PrimaryButton>
                  
                    </td>
                  </tr>

                  {expandedOrder === order.id && (
                    <tr className="bg-black text-white shadow-xl rounded-lg">
                      <td colSpan={5} className="px-4 py-6">
                        <div className="space-y-4 p-6 bg-opacity-80 backdrop-blur-md rounded-xl shadow-lg">
                          <h4 className="text-xl font-bold text-indigo-100">Lisätiedot</h4>
                          <p className="text-lg"><strong>Delivery Address:</strong> {order.delivery_address}</p>
                          <p className="text-lg"><strong>Pickup Date:</strong> {order.pickup_date ? new Date(order.pickup_date).toLocaleDateString("fi-FI") : "N/A"}</p>
                          <p className="text-lg"><strong>Status:</strong> {order.status}</p>
                          <p className="text-lg"><strong>Price:</strong> {order.price ? `${order.price} EUR` : "–"}</p>
                          <p className="text-lg"><strong>More Info:</strong> {order.more_info || "No additional info"}</p>
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
        <div className="text-center py-6 text-gray-400">Ei tilauksia.</div>
      )}
    </div>
  );
};

export default OrdersContent;