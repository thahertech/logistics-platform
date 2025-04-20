import { BadgeCheck, Clock, Truck, ShoppingCart, HelpCircle } from "lucide-react";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    draft: "bg-gray-800 text-white",
    available: "bg-white text-[#003366] border border-[#003366]",
    matkalla: "bg-[#003366] text-white",
    purchased: "bg-black text-white",
    default: "bg-gray-500 text-white"
  };

  const statusLabels = {
    draft: "Luonnos",
    available: "Julkaistu",
    matkalla: "Matkalla",
    valmis: "valmis",
    purchased: "Odottaa noutoa",
    default: "–"
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "draft":
        return <BadgeCheck size={14} />;
      case "available":
        return <Clock size={14} />;
      case "matkalla":
        return <Truck size={14} />;
      case "purchased":
        return <ShoppingCart size={14} />;
      default:
        return <HelpCircle size={14} />;
    }
  };

  const statusClass = statusStyles[status] || statusStyles.default;
  const statusLabel = statusLabels[status] || statusLabels.default;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
      {getStatusIcon(status)} {statusLabel}
    </span>
  );
};

export default StatusBadge;