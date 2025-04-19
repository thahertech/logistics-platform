import React from 'react';

const FinalStep = ({ form, handleChange }) => {
  return (
    <div className="flex flex-col justify-between text-white space-y-8 bg-gray-900 p-6 rounded-xl shadow-lg">

      <section>
        <h2 className="text-xl font-bold mb-2">Lähettäjän tiedot</h2>
        <Field label="Nimi" value={form.sender.name} />
        <Field label="Y-tunnus / ALV-numero" value={form.sender.vat_number} />
        <Input label="Puhelinnumero" value={form.sender.phone} onChange={handleChange('sender', 'phone')} />
        <Input label="Sähköposti" value={form.sender.email} onChange={handleChange('sender', 'email')} />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Vastaanottajan tiedot</h2>
        <Field label="Nimi" value={form.recipient.name} />
        <Field label="Puhelinnumero" value={form.recipient.phone} />
        <Field label="Sähköposti" value={form.recipient.email} />
        <Field label="Toimitusosoite" value={form.recipient.address} />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Toimitustiedot</h2>
        <Field label="Nouto-osoite" value={form.pickup.address} />
        <Field label="Toimitusosoite" value={form.delivery.address} />
        <Field label="Toivottu toimitusaika" value={form.delivery.time} />
        <Field label="Kuljetustyyppi" value={form.delivery.transport_type} />
      </section>

      {/* Lähetys */}
      <section>
        <h2 className="text-xl font-bold mb-2">Lähetyksen tiedot</h2>
        <Field label="Lähetyksen tyyppi" value={form.shipment.type} />
        <Field label="Paino (kg)" value={form.shipment.weight} />
        <Field label="Mitat (cm)" value={`${form.shipment.length} x ${form.shipment.width} x ${form.shipment.height}`} />
        <Field label="Erityisohjeet" value={form.shipment.instructions} />
      </section>
      
    </div>
  );
};

const Field = ({ label, value }) => (
  <div className="mb-2">
    <p className="text-sm text-gray-400">{label}</p>
    <div className="p-2 border rounded bg-gray-800">{value || '-'}</div>
  </div>
);

const Input = ({ label, value, onChange }) => (
  <div className="mb-2">
    <p className="text-sm text-gray-400">{label}</p>
    <input
      className="w-full p-2 border rounded bg-gray-800"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default FinalStep;