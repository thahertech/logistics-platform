import { MapPin, Navigation2 } from 'lucide-react';

const ShipmentSidebar = ({ pickup, delivery }) => (
  <div className="bg-white/10 backdrop-blur-lg text-white m-8 p-6 rounded-xl fixed left-0 shadow-lg w-80 space-y-12 h-1/2">
    <div className="flex items-start space-x-4">
      <MapPin size={36} className="text-blue-400" />
      <div>
        <p className="text-sm text-gray-300">Noutopaikka</p>
        <p className="text-lg font-semibold">{pickup?.postal_code || '—'}, {pickup?.city || '—'}</p>
      </div>
    </div>
    <div className="flex items-start space-x-4">
      <Navigation2 size={36} className="text-green-400" />
      <div>
        <p className="text-sm text-gray-300">Toimituspaikka</p>
        <p className="text-lg font-semibold">{delivery?.postal_code || '—'}, {delivery?.city || '—'}</p>
      </div>
    </div>
  </div>
);

export default ShipmentSidebar;