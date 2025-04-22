import React from 'react';
import AddressAutocomplete from '../../maps/addressAutocomplete';

const SenderStep = ({ form, handleChange, handleToggle, autoFillFlags, handleAddressSelect }) => {
  return (
    <div className="flex-col justify-between">
      {/* Autofill checkbox */}
      <label className="flex items-center gap-5 mb-4 text-white py-2">
        <input type="checkbox" checked={autoFillFlags.useSenderProfileDetails} onChange={handleToggle('useSenderProfileDetails')} />
        Käytä profiilin tietoja
      </label>

      {/* Etunimi (First Name) */}
      <label className="text-gray-400 mb-2" htmlFor="sender-name">Etunimi</label>
      <input
        type="text"
        id="sender-name"
        name="sender.name"
        placeholder="Nimi"
        autoComplete="given-name"
        value={form.sender.name}
        onChange={handleChange('sender', 'name')}
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Puhelinnumero (Phone Number) */}
      <label className="text-gray-400 mb-2" htmlFor="sender-phone">Puhelinnumero</label>
      <input
        type="tel"
        id="sender-phone"
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Puhelinnumero"
        autoComplete="tel"
        value={form.sender.phone}
        onChange={handleChange('sender', 'phone')}
      />

      {/* Sähköposti (Email) */}
      <label className="text-gray-400 mb-2" htmlFor="sender-email">Sähköposti</label>
      <input
        type="email"
        id="sender-email"
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Sähköposti"
        autoComplete="email"
        value={form.sender.email}
        onChange={handleChange('sender', 'email')}
      />

      {/* Address Autocomplete */}
      <label className="text-gray-400 mb-2" htmlFor="sender-address">Osoite</label>
      <AddressAutocomplete
        id="sender-address"
        value={form.sender.address}
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={handleChange('sender', 'address')}
        onSelect={(data) => handleAddressSelect('sender', data)}
        
      />

      <label className="text-gray-400 mb-2" htmlFor="sender-city">Kaupunki</label>
      <input
        type="text"
        id="sender-city"
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Kaupunki"
        value={form.sender.city}
        onChange={handleChange('sender', 'city')}
      />

      {/* Postinumero (Postal Code) */}
      <label className="text-gray-400 mb-2" htmlFor="sender-postal-code">Postinumero</label>
      <input
        type="text"
        id="sender-postal-code"
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Postinumero"
        value={form.sender.postal_code}
        onChange={handleChange('sender', 'postal_code')}
      />
    </div>
  );
};

export default SenderStep;