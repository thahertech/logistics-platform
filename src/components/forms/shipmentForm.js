export const steps = ["Omat tiedot", "Nouto", "Vastaanottaja", "Toimitus", "Yhteenveto"];

export const shipmentForm = {
  sender: {
    name: '',
    address: '',
    city: '',
    postal_code: '',
    email: '',
    phone: '',
  },
  pickup: {
    date: '',
    time: '',
    address: '',
    postal_code: '',
    city: '',
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
    transportUnits: '',
    unitType: '',
    details: '',
    incoTerms: '',
    price: '',
    amount: '',
    status: ''
  }
};