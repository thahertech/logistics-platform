export const steps = ["Omat tiedot", "Nouto", "Vastaanottaja", "Toimitus", "Yhteenveto"];

export const shipmentForm = {
  sender: {
    name: '',
    address: '',
    city: '',
    postal_code: '',
    email: '',
    phone: '',
    vat_number: ''
  },
  pickup: {
    date: '',
    time: '',
    address: '',
    postal_code: '',
    city: '',
    email: '',
    phone: '',
    details: ''
  },
  recipient: {
    name: '',
    address: '',
    postal_code: '',
    city: '',
    email: '',
    phone: ''
  },
  delivery: {
    address: '',
    postal_code: '',
    city: '',
    date: '',
    time: '',
    details: ''
  },
  shipment: {
    weight: '',
    transport_units: '',
    unit_type: '',
    details: '',
    incoTerms: '',
    price: '',
    amount: '',
    status: ''
  }
};