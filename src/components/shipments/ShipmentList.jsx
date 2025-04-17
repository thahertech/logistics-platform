import ShipmentCard from './ShipmentCard';

export default function ShipmentsList({ shipments, loading, onCardClick }) {
    if (loading) return <div>Loading...</div>;
  
    return (
      <div className="grid grid-cols-1 gap-4">
        {shipments.map((shipment) => (
          <ShipmentCard
            key={shipment.id}
            shipment={shipment}
            onClick={() => onCardClick(shipment)}
          />
        ))}
      </div>
    );
  }