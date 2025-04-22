import { supabase } from '@/supabaseClient';
import { toast } from 'react-toastify';
import { FaPen, FaTrash, FaClone } from 'react-icons/fa';


const ShipmentActions = ({ onEdit, onDelete, onDuplicate }) => {
  return (
    <div className="flex-col gap-4 mt-4">
      <button
        onClick={onEdit}
        className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition"
      >
        <FaPen /> Muokkaa lähetystä
      </button>
      <button
        onClick={onDelete}
        className="flex items-center gap-1 text-red-500 hover:text-red-700 transition"
      >
        <FaTrash /> Poista lähetys
      </button>
      <button
        onClick={onDuplicate}
        className="flex items-center gap-1 text-green-500 hover:text-green-700 transition"
      >
        <FaClone /> Käytä pohjana
      </button>
    </div>
  );
};

export default ShipmentActions;


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