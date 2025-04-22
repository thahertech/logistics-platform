import React, { useEffect } from 'react';
import AddressAutocomplete from '../../maps/addressAutocomplete';

const PickupStep = ({ form, handleChange, handleToggle, autoFillFlags, handleAddressSelect }) => {
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const formattedDate = tomorrow.toISOString().split("T")[0];
    const defaultTime = "12:00";

    if (!form.pickup.date) handleChange('pickup', 'date')({ target: { value: formattedDate } });
    if (!form.pickup.time) handleChange('pickup', 'time')({ target: { value: defaultTime } });
  }, [form.pickup.date, form.pickup.time, handleChange]);

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  return (
    <div>
      <label className="flex items-center mb-4 text-white">
        <input type="checkbox" className="mr-2" checked={autoFillFlags.usePickupProfileDetails} onChange={handleToggle('usePickupProfileDetails')} />
        Käytä omia tietoja
      </label>
      <AddressAutocomplete
          value={form.pickup.address}
          onChange={handleChange('pickup', 'address')}
          onSelect={(data) => handleAddressSelect('pickup', data)}
      />

      <div className="flex space-x-4">
              <input
                type="date"
                min={minDate}
                className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.pickup.date}
                onChange={handleChange('pickup','date')}
              />
              <input
                type="time"
                className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.pickup.time}
                onChange={handleChange('pickup', 'time')}
              />
            </div>
          </div>
      );
};

export default PickupStep;