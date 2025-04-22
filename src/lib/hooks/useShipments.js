import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';

export default function useShipments() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShipments = useCallback(async () => {
    setLoading(true);
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from('shipments')
      .select('id, urgent, pickup_city, delivery_city, delivery_postal_code, pickup_date, delivery_date, weight, transport_units, unit_type, agreement_type, amount, pickup_postal_code, recipient_postal_code, recipient_city, pickup_time, delivery_time, pickup_latitude, pickup_longitude, delivery_latitude, delivery_longitude, details, locked')
      .eq('status', 'available')
      .gte('pickup_date', today)
      .order('pickup_date', { ascending: true });

    if (error) {
      console.error("Error fetching shipments:", error);
    } else {
      setShipments(data);
    }

    setLoading(false);
  }, []);

  const lockShipment = async (shipmentId) => {
    const { error } = await supabase
      .from('shipments')
      .update({ locked: true })
      .eq('id', shipmentId);

    if (error) {
      console.error("Error locking shipment:", error);
    }
  };

  const unlockShipment = async (shipmentId) => {
    const { error } = await supabase
      .from('shipments')
      .update({ locked: false })
      .eq('id', shipmentId);

    if (error) {
      console.error("Error unlocking shipment:", error);
    }
  };

  useEffect(() => {
    fetchShipments();

      const channel = supabase
      .channel('shipments-changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'shipments' },
        (payload) => {
          console.log('🔄 Shipment updated:', payload);
  
          const updatedShipment = payload.new;
          setShipments(prevShipments =>
            prevShipments.map(shipment =>
              shipment.id === updatedShipment.id ? updatedShipment : shipment
            )
          );
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'shipments' },
        (payload) => {
          console.log('📦 New shipment added:', payload);
  
          const newShipment = payload.new;
          setShipments(prevShipments => [...prevShipments, newShipment]);
        }
      )
      .subscribe();
  
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchShipments]);

  return {
    shipments,
    loading,
    lockShipment,
    unlockShipment
  };
}