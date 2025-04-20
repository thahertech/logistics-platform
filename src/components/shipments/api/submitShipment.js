import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/supabaseClient';

export function validateShipmentForm(form) {
  const requiredFields = [
    'sender.name', 'sender.email', 'sender.address', 'sender.postal_code', 'sender.city', 'sender.phone',
    'recipient.name', 'recipient.email', 'recipient.address', 'recipient.postal_code', 'recipient.city', 'recipient.phone',
    'pickup.address', 'pickup.postal_code', 'pickup.city', 'pickup.date', 'pickup.time',
    'delivery.address', 'delivery.postal_code', 'delivery.city', 'delivery.date', 'delivery.time',
    'shipment.weight', 'shipment.transportUnits', 'shipment.price', 'shipment.incoTerms',
  ];

  for (const path of requiredFields) {
    const value = path.split('.').reduce((obj, key) => obj?.[key], form);
    if (!value || value.toString().trim() === '') {
      throw new Error(`Puuttuva kenttä: ${path}`);
    }
  }

  if (isNaN(form.shipment.price) || Number(form.shipment.price) <= 0) {
    throw new Error('Hinta on virheellinen.');
  }

  // Optional: validate email format, phone number etc
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail(form.sender.email)) throw new Error('Lähettäjän sähköposti ei ole kelvollinen');
  if (!isValidEmail(form.recipient.email)) throw new Error('Vastaanottajan sähköposti ei ole kelvollinen');

  // Add more business-specific validation rules as needed
}

export async function submitShipment(form) {
  const COMMISSION_RATE = 0.9;

  // ✅ Validate first
  validateShipmentForm(form);

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !sessionData?.session?.access_token) {
    throw new Error(sessionError?.message || "No active session");
  }

  const userId = sessionData.session.user.id;

  const shipmentData = {
    user_id: userId,
    shipment_identifier: uuidv4(),
    sender_name: form.sender.name,
    sender_email: form.sender.email,
    sender_address: form.sender.address,
    sender_postal_code: form.sender.postal_code,
    sender_city: form.sender.city,
    sender_phone: form.sender.phone,
    recipient_name: form.recipient.name,
    recipient_address: form.recipient.address,
    recipient_postal_code: form.recipient.postal_code,
    recipient_city: form.recipient.city,
    recipient_email: form.recipient.email,
    recipient_phone: form.recipient.phone,
    pickup_address: form.pickup.address,
    pickup_postal_code: form.pickup.postal_code,
    pickup_city: form.pickup.city,
    pickup_date: form.pickup.date,
    pickup_time: form.pickup.time,
    pickup_latitude: form.pickup.latitude,
    pickup_longitude: form.pickup.longitude,
    delivery_address: form.delivery.address,
    delivery_postal_code: form.delivery.postal_code,
    delivery_city: form.delivery.city,
    delivery_date: form.delivery.date,
    delivery_time: form.delivery.time,
    delivery_latitude: form.delivery.latitude,
    delivery_longitude: form.delivery.longitude,
    weight: form.shipment.weight,
    transport_units: form.shipment.transportUnits,
    unit_type: form.shipment.unitType,
    details: form.delivery.details,
    status: "pending",
    price: form.shipment.price,
    amount: form.shipment.price * COMMISSION_RATE,
    agreement_type: form.shipment.incoTerms,
 
  };

  const response = await fetch(
    "https://ccjggzpkomwjzwrawmyr.supabase.co/functions/v1/new-shipment-email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionData.session.access_token}`,
      },
      body: JSON.stringify(shipmentData),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.message || "Unknown error from edge function");
  }

  return true;
}