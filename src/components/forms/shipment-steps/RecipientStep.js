import React from 'react';
import AddressAutocomplete from '../../maps/addressAutocomplete';

const RecipientStep = ({ form, handleChange, handleAddressSelect }) => {
  return (
    <div>
      <AddressAutocomplete
          value={form.recipient.address}
          onChange={handleChange('recipient', 'address')}
          onSelect={(data) => handleAddressSelect('recipient', data)}
      />
      <input type="text" className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Postinumero" value={form.recipient.postal_code} onChange={handleChange('recipient','postal_code')} />
      <input type="text" className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Kaupunki" value={form.recipient.city} onChange={handleChange('recipient', 'city')} />
      <input type="text" 
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Vastaanottaja" value={form.recipient.name} onChange={handleChange('recipient', 'name')} />
      <input type="text"
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Puhelinnumero" value={form.recipient.phone} onChange={handleChange('recipient', 'phone')} />
      <input type="text"
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Sähköposti" value={form.recipient.email} onChange={handleChange('recipient','email')} />
      {/* <textarea className="w-full p-2 mb-12 border rounded bg-transparent text-white" placeholder="Lisätiedot kuljettajalle" value={form.details} onChange={handleChange('recipient','details')} />           */}
      <div className="flex space-x-4">
        <input type="date"
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={form.delivery.date} onChange={handleChange('delivery','date')} />
        <input type="time" 
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={form.delivery.time} onChange={handleChange('delivery','time')} />
      </div>
    </div>
  );
};

export default RecipientStep;