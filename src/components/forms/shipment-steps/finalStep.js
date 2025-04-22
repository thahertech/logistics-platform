import React from 'react';

const FinalStep = ({ form, handleChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white bg-black/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/10 max-h-screen">

      {/* Lähettäjän tiedot */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-wide">Lähettäjän tiedot</h2>
        <Field label="Nimi" value={form.sender.name} />
        <Field label="Y-tunnus / ALV-numero" value={form.sender.vat_number} />
        <Input label="Puhelinnumero" value={form.sender.phone} onChange={handleChange('sender', 'phone')} />
        <Input label="Sähköposti" value={form.sender.email} onChange={handleChange('sender', 'email')} />
      </section>

      {/* Vastaanottajan tiedot */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-wide">Vastaanottajan tiedot</h2>
        <Field label="Nimi" value={form.recipient.name} />
        <Field label="Puhelinnumero" value={form.recipient.phone} />
        <Field label="Sähköposti" value={form.recipient.email} />
        <Field label="Toimitusosoite" value={form.recipient.address} />
      </section>

      {/* Toimitustiedot */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-wide">Toimitustiedot</h2>
        <Field label="Nouto-osoite" value={form.pickup.address} />
        <Field label="Toimitusosoite" value={form.delivery.address} />
        <Field label="Toivottu toimitusaika" value={form.delivery.time} />
        <Field label="Kuljetustyyppi" value={form.delivery.transport_type} />
      </section>

      {/* Lähetyksen tiedot */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-wide">Lähetyksen tiedot</h2>
        <Field label="Lähetyksen tyyppi" value={form.shipment.type} />
        <Field label="Paino (kg)" value={form.shipment.weight} />
        <Field label="Mitat (cm)" value={`${form.shipment.length} x ${form.shipment.width} x ${form.shipment.height}`} />
        <Field label="Erityisohjeet" value={form.shipment.instructions} />
      </section>

    </div>
  );
};

const Field = ({ label, value }) => (
  <div className="mb-4">
    <p className="text-sm text-white/70">{label}</p>
    <div className="p-2 mt-1 border border-white/20 rounded-xl bg-black/50">{value || '-'}</div>
  </div>
);

const Input = ({ label, value, onChange }) => (
  <div className="mb-4">
    <p className="text-sm text-white/70">{label}</p>
    <input
      className="w-full p-2 mt-1 border border-white/20 rounded-xl bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default FinalStep;