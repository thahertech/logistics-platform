import { MapPin, Navigation2 } from 'lucide-react';

const LShipmentSidebar = ({ pickup, delivery }) => (
  <div className="fixed top-1/4 left-0 m-4 w-80 h-2/4 p-6 space-y-12 rounded-xl shadow-lg bg-white/10 backdrop-blur-lg text-white z-50">
    <div className="flex items-start space-x-4">
      <MapPin size={36} className="text-blue-400" />
      <div>
        <p className="text-sm text-gray-300">Noutopaikka</p>
        <p className="text-lg font-semibold">
          {pickup?.postal_code || '—'}, {pickup?.city || '—'}
        </p>
      </div>
    </div>
    <div className="flex items-start space-x-4">
      <Navigation2 size={36} className="text-green-400" />
      <div>
        <p className="text-sm text-gray-300">Toimituspaikka</p>
        <p className="text-lg font-semibold">
          {delivery?.postal_code || '—'}, {delivery?.city || '—'}
        </p>
      </div>
    </div>
  </div>
);

export default LShipmentSidebar;