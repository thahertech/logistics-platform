import React from 'react';
import AddressAutocomplete from '../../maps/addressAutocomplete';

const PickupStep = ({ form, handleChange, handleToggle, autoFillFlags, handleAddressSelect }) => {
  return (
    <div>
      <label className="flex items-center mb-4 text-white">
        <input type="checkbox" className="mr-2" checked={autoFillFlags.usePickupProfileDetails} onChange={handleToggle('usePickupProfileDetails')} />
        Käytä profiilin tietoja
      </label>
      <AddressAutocomplete
          value={form.pickup.address}
          onChange={handleChange('pickup', 'address')}
          onSelect={(data) => handleAddressSelect('pickup', data)}
      />

      <input type="text" className="w-full p-2 mb-4 border rounded bg-transparent text-white" placeholder="Yhteyshenkilö" value={form.pickup.contact} onChange={handleChange('pickup', 'contact')} />
      <input type="email" className="w-full p-2 mb-4 border rounded bg-transparent text-white" placeholder="Sähköposti" value={form.pickup.email} onChange={handleChange('pickup', 'email')} />
      <input type="text" className="w-full p-2 mb-4 border rounded bg-transparent text-white" placeholder="Puhelinnumero" value={form.pickup.phone} onChange={handleChange('pickup', 'phone')} />
      <div className="flex space-x-4">
        <input type="date" className="w-full p-2 mb-4 border rounded bg-transparent text-white" value={form.pickup.date} onChange={handleChange('pickup','date')} />
        <input type="time" className="w-full p-2 mb-4 border rounded bg-transparent text-white" value={form.pickup.time} onChange={handleChange('pickup', 'time')} />
      </div>
      <textarea className="w-full p-2 mb-12 border rounded bg-transparent text-white" placeholder="Lisätiedot kuljettajalle" value={form.pickup.details} onChange={handleChange('pickup','details')} />          
    </div>
  );
};

export default PickupStep;