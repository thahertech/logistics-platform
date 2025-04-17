import { supabase } from '@/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const shipmentData = req.body;
  
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData?.session?.access_token) {
      throw new Error(sessionError?.message || 'No active session');
    }

    const response = await fetch(
      'https://ccjggzpkomwjzwrawmyr.supabase.co/functions/v1/new-shipment-email',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
        body: JSON.stringify(shipmentData),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err?.message || 'Unknown error from edge function');
    }

    return res.status(200).json({ message: 'Shipment created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}