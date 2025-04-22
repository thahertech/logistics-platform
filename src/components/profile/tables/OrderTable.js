import OrderTableRow from "@/components/profile/tables/OrderTableRow";

const OrderTable = ({ orders, expandedOrder, toggleOrderDetails, handleViewDetails, handleEditShipment, handleDeleteShipment, handleDuplicateShipment }) => (
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
        {orders.map((order) => (
          <OrderTableRow
            key={order.id}
            order={order}
            isExpanded={expandedOrder === order.id}
            onToggleDetails={toggleOrderDetails}
            onViewDetails={handleViewDetails}
            onEditShipment={handleEditShipment}
            onDeleteShipment={handleDeleteShipment}
            onDuplicateShipment={handleDuplicateShipment}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderTable;