import React from "react";
import StatusBadge from "@/components/profile/StatusBadge";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ShipmentActions from "@/components/shipments/api/shipmentActions";
import {
  BarChart2,
  User,
  Package,
  MapPin,
  Truck,
} from "lucide-react";

const OrderTableRow = ({
  order,
  isExpanded,
  onToggleDetails,
  onViewDetails,
  onEditShipment,
  onDeleteShipment,
  onDuplicateShipment,
}) => {
  return (
    <>
      <tr
        onClick={() => onToggleDetails(order.id)}
        className="border-b border-white/10 hover:bg-white/10 transition cursor-pointer"
      >
        <td className="px-4 py-3">{`${order.delivery_address}, ${order.delivery_postal_code}` || "–"}</td>
        <td className="px-4 py-3">{`${order.pickup_address}, ${order.pickup_postal_code}` || "–"}</td>
        <td className="px-4 py-3">
          {order.pickup_date
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
              onToggleDetails(order.id);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-full transition"
          >
            Näytä tiedot
          </PrimaryButton>
        </td>
      </tr>

      {isExpanded && (
  <tr className="bg-black/60 text-white backdrop-blur-xl shadow-xl rounded-2xl border-t border-white/10">
    <td colSpan={6} className="px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-white/90">
      <h4 className="text-xl font-semibold text-indigo-300 flex items-center gap-2">
        <BarChart2 size={18} /> Yleiskatsaus </h4>
      
    <div className="flex flex-wrap gap-2 text-xs">
      <span className="bg-blue-400/20 text-blue-300 px-3 py-1 rounded-full font-medium">
        {order.weight} kg
      </span>
      {order.transport_units && (
      <span className="bg-purple-400/20 text-purple-300 px-3 py-1 rounded-full font-medium">
        {order.transport_units} yksikköä
      </span>
    )}
  {order.unit_type && (
    <span className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full font-medium">
      {order.unit_type}
    </span>
  )}
  {order.agreement_type && (
    <span className="bg-orange-400/20 text-orange-300 px-3 py-1 rounded-full font-medium">
      {order.agreement_type}
    </span>
  )}
</div>
        <div>
        <h4 className="text-indigo-100 text-lg font-bold mb-2 flex items-center gap-2">
          <User size={18} /> Lähettäjä </h4>     
          <p><span className="text-white/50">Nimi:</span> {order.sender_name || "–"}</p>
          <p><span className="text-white/50">Puhelin:</span> {order.sender_phone || "–"}</p>
          <p><span className="text-white/50">Sähköposti:</span> {order.sender_email || "–"}</p>
          <p><span className="text-white/50">Osoite:</span> {`${order.sender_address} ${order.sender_postal_code} ${order.sender_city}`|| "–"}</p>

        </div>

        <div>
        <h4 className="text-indigo-100 text-lg font-bold mb-2 flex items-center gap-2">
            <Package size={18} /> Vastaanottaja </h4>
          <p><span className="text-white/50">Nimi:</span> {order.recipient_name || "–"}</p>
          <p><span className="text-white/50">Puhelin:</span> {order.recipient_phone || "–"}</p>
          <p><span className="text-white/50">Sähköposti:</span> {order.recipient_email || "–"}</p>
          <p><span className="text-white/50">Osoite:</span> {`${order.recipient_address} ${order.recipient_postal_code} ${order.recipient_city}`|| "–"}</p>

        </div>
        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <div>
        <h4 className="text-indigo-100 text-lg font-bold mb-2 flex items-center gap-2">
          <MapPin size={18} /> Kuljetus </h4>
          <p><span className="text-white/50">Nouto:</span> {order.pickup_address}, {order.pickup_postal_code}</p>
          <p><span className="text-white/50">Päivämäärä:</span> {order.pickup_date ? new Date(order.pickup_date).toLocaleDateString("fi-FI") : "–"}</p>
        </div>

        <div>
        <h4 className="text-indigo-100 text-lg font-bold mb-2 flex items-center gap-2">
            <Truck size={18} /> Toimitus </h4>
          <p><span className="text-white/50">Osoite:</span> {order.delivery_address}, {order.delivery_postal_code}</p>
          <p><span className="text-white/50">Päivämäärä:</span> {order.delivery_date ? new Date(order.delivery_date).toLocaleDateString("fi-FI") : "–"}</p>
      
        </div>
      
      </div>
      
      

      <div className="flex flex-wrap gap-4 mt-8 text-sm">
        <div className="text-green-400 bg-white/10 px-4 py-2 rounded-xl shadow-inner font-semibold">
          {order.price != null ? `${order.price} €` : "–"}
        </div>
        <div className="text-sm text-white/80 bg-white/5 px-4 py-2 rounded-lg">
          <strong>Tila:</strong> {order.status}
        </div>
        <div className="text-sm text-white/80 bg-white/5 px-4 py-2 rounded-lg">
          <strong>Lisätiedot:</strong> {order.details || "–"}
        </div>
        <div className="text-sm text-white/80 bg-white/5 px-4 py-2 rounded-lg">

          <strong>Viimeksi päivitetty:</strong> {order.updated_at ? new Date(order.updated_at).toLocaleDateString("fi-FI") : "–"}
        </div>
      </div>
      

      <div className="mt-8">
        <ShipmentActions
          onEdit={() => onEditShipment(order)}
          onDelete={() => onDeleteShipment(order.id)}
          onDuplicate={() => onDuplicateShipment(order)}
        />
      </div>
  
    </td>
  </tr>
  
)}
    </>
  );
};

export default OrderTableRow;