import React from 'react';
import AddressAutocomplete from '../../maps/addressAutocomplete';

const SenderStep = ({ form, handleChange, handleToggle, autoFillFlags, handleAddressSelect }) => {
  return (
    <div className="flex-col justify-between">
      <label className="flex items-center gap-5 mb-4 text-white py-2">
        <input type="checkbox" checked={autoFillFlags.useSenderProfileDetails} onChange={handleToggle('useSenderProfileDetails')} />
        Käytä profiilin tietoja
      </label>
      <input type="text" className="p-2 w-full mb-4 border rounded bg-transparent text-white" placeholder="Yritys tai Nimesi" value={form.sender.name} onChange={handleChange('sender', 'name')} />
      <input type="text" className="p-2 w-full mb-4 border rounded bg-transparent text-white" placeholder="Y-tunnus" value={form.sender.vat_number} onChange={handleChange('sender', 'vat_number')} />
      <input type="tel" className="w-full p-2 mb-4 border rounded bg-transparent text-white" placeholder="Puhelinnumero" value={form.sender.phone} onChange={handleChange('sender', 'phone')} />
      <input type="email" className="w-full p-2  mb-4 border rounded bg-transparent text-white" placeholder="Sähköposti" value={form.sender.email} onChange={handleChange('sender', 'email')} />

      <AddressAutocomplete
          value={form.sender.address}
          onChange={handleChange('sender', 'address')}
          onSelect={(data) => handleAddressSelect('sender', data)}
      />
      <input 
        type="text" 
        className="w-full p-2 mb-4 border rounded bg-transparent text-white" 
        placeholder="Kaupunki" 
        value={form.sender.city} 
        onChange={handleChange('sender', 'city')} 
      />
      <input 
        type="text" 
        className="w-full p-2 mb-4 border rounded bg-transparent text-white" 
        placeholder="Postinumero" 
        value={form.sender.postal_code} 
        onChange={handleChange('sender', 'postal_code')} 
      />
    </div>
  );
};

export default SenderStep;