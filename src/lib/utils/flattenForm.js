export const flattenForm = (form) => {
    const flattened = {};
  
    for (const section in form) {
      for (const field in form[section]) {
        if (field === 'vat_number' && section === 'sender') continue;
        if (field === 'street' && section === 'sender') continue;
        if (field === 'street' && section === 'pickup') continue;
        if (field === 'street' && section === 'recipient') continue;
        if (field === 'amount' && section === 'shipment') continue;
        if (field === 'status' && section === 'shipment') continue;
        if (field === 'unitType' && section === 'shipment') continue;
        if (field === 'details' && section === 'shipment') continue;
        if (field === 'incoTerms' && section === 'shipment') continue;
        if (field === 'email' && section === 'pickup') continue;
        if (field === 'phone' && section === 'pickup') continue;
        if (field === 'details' && section === 'delivery') continue;
        if (field === 'details' && section === 'pickup') continue;
        if (field === 'price'  && section === 'shipment') continue;
        if (field === 'transportUnits'  && section === 'shipment') continue;
        if (field === 'agreement_type' && section === 'shipment') continue;
        if (field === 'shipment_identifier' && section === 'shipment') continue;
        if (field === 'user_id' && section === 'shipment') continue;
        if (field === 'transport_units' && section === 'shipment') continue;
        if (field === 'unit_type' && section === 'shipment') continue;
        if (field === 'weight' && section === 'shipment') continue;
        flattened[`${section}_${field}`] = form[section][field];
      }

    }
    return flattened;
  };