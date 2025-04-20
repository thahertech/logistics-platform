import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { toast } from 'react-toastify';

export const useOrdersAndPurchases = (userId) => {
  const [orders, setOrders] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrdersAndPurchases = async () => {
      try {
        console.log('Fetching orders and purchases for user:', userId);
        if (!userId) return;

        const { data: userOrders, error: ordersError } = await supabase
          .from('shipments')
          .select('*')
          .eq('user_id', userId);

        if (ordersError) throw new Error(`Orders fetch error: ${ordersError.message}`);
        setOrders(userOrders || []);

        const { data: userPurchases, error: purchasesError } = await supabase
          .from('shipment_purchases')
          .select('*')
          .eq('user_id', userId);

        if (purchasesError) throw new Error(`Purchases fetch error: ${purchasesError.message}`);
        setPurchases(userPurchases || []);
      } catch (err) {
        setError(err.message);
        toast.error('Virhe tilauksia ja ostoksia ladattaessa: ' + err.message);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrdersAndPurchases();
  }, [userId]);

  return { orders, purchases, loadingOrders, error };
};