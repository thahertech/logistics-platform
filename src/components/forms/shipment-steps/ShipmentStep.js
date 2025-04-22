import React from 'react';

const ShipmentStep = ({ form, handleChange, autoFillFlags, handleToggle }) => {
  return (
    <div>
      <label className="flex items-center mb-4 text-white">
        <input
          type="checkbox"
          className="mr-2"
          checked={autoFillFlags.sameAsRecipient}
          onChange={handleToggle('sameAsRecipient')}
        />
        Toimitusosoite sama kuin vastaanottaja osoite
      </label>

      {!autoFillFlags.sameAsRecipient && (
        <div>
        <input
          type="text"
          className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Toimitusosoite"
          value={form.delivery.address}
          onChange={handleChange('delivery', 'address')}
        />
            <input
          type="text"
          className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Postinumero"
          value={form.delivery.postal_code}
          onChange={handleChange('delivery', 'postal_code')}
        />
             <input
          type="text"
          className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Kaupunki"
          value={form.delivery.city}
          onChange={handleChange('delivery', 'city')}
        />
</div>
      )}

      <input
        type="text"
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Paino (Kg)"
        value={form.shipment.weight}
        onChange={handleChange('shipment', 'weight')}
      />
      <input
        type="text"
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Kuljetettavat yksiköt"
        value={form.shipment.transportUnits || ''}
        onChange={handleChange('shipment', 'transportUnits')}
      />
      <input
        type="text"
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Hintaehdotus"
        value={form.shipment.price}
        onChange={handleChange('shipment', 'price')}
      />

      <select
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={form.shipment.incoTerms || ''} 
        onChange={handleChange('shipment', 'incoTerms')}
      >
        <option value="">Valitse incoterms</option>
        <option value="EXW">Noudettuna - Ex Works</option>
        <option value="FCA">Vapaasti rahdinkuljettajalla - FCA</option>
        <option value="CPT">Kuljetus maksettuna - CPT</option>
        <option value="CIP">Kuljetus ja vakuutus maksettuina - CIP</option>
        <option value="DAP">Toimitettuna määräpaikalle - DAP</option>
        <option value="DPU">Toimitettuna ajoneuvosta purettuna - DPU</option>
      </select>

      <select
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={form.shipment.unitType}
        onChange={handleChange('shipment', 'unitType')}
      >
        <option value="">Valitse yksikkö tyyppi</option>
        <option value="Kolli">Kolli</option>
        <option value="Eurolava">Eurolava</option>
        <option value="Lava">Lava</option>
        <option value="Kärry">Kärry</option>
        <option value="Kontti">Kontti</option>
        <option value="Rullakko">Rullakko</option>
        <option value="Pikkukontti">Pikkukontti</option>
        <option value="Lava-auto">Lava-auto</option>
      </select>
      <textarea 
        className="w-full bg-white/10 border border-white/20 mb-4 text-white placeholder-white/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Lisätiedot kuljettajalle" value={form.shipment.details} onChange={handleChange('shipment','details')} />          

    </div>
  );
};

export default ShipmentStep;