import { supabase } from '@/supabaseClient'; // Make sure this path is correct

export async function POST(req) {
  try {
    const body = await req.json();
    const { form } = body;

    // Process the shipment data here, like storing it in the database
    // This is an example; adapt it to your actual business logic
    const shipmentData = {
      ...form,
      status: 'pending',
    };

    const { error } = await supabase
      .from('shipments')
      .insert([shipmentData]);

    if (error) throw new Error('Failed to insert shipment data');

    return new Response(JSON.stringify({ message: 'Shipment created successfully!' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}