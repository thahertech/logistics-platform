import { supabase } from '@/supabaseClient';
import { toast } from 'react-toastify';

// Lock shipment for editing
export const lockShipmentForEditing = async (shipmentId) => {
  try {
    const { data, error } = await supabase
      .from('shipments')
      .update({ locked: true })
      .eq('id', shipmentId);

    if (error) {
      throw error;
    } else {
      toast.success('Ilmoitus piilotettu');
    }
  } catch (error) {
    toast.error('Error locking shipment for editing');
    console.error(error);
  }
};

// Unlock shipment after edit
export const unlockShipmentAfterEdit = async (shipmentId) => {
  try {
    const { data, error } = await supabase
      .from('shipments')
      .update({ locked: false })
      .eq('id', shipmentId);

    if (error) {
      throw error;
    } else {
      toast.success('Ilmoitus on julkinen');
    }
  } catch (error) {
    toast.error('Error unlocking shipment');
    console.error(error);
  }
};

// Fetch shipment data
export const fetchShipmentData = async (shipmentId) => {
  try {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('id', shipmentId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    toast.error('Failed to fetch shipment data');
    console.error(error);
    return null;
  }
};