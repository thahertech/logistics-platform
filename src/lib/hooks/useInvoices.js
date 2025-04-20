import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';

export default function useInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('invoices')
      .select('id, created_at, due_date, amount, details, reference_number, status, user_id')
      .order('due_date', { ascending: false });

    if (error) {
      console.error("Error fetching invoices:", error);
    } else {
      setInvoices(data);
    }

    setLoading(false);
  }, []);

  const markInvoiceAsPaid = async (invoiceId) => {
    const { error } = await supabase
      .from('invoices')
      .update({ status: 'paid' })
      .eq('id', invoiceId);

    if (error) {
      console.error("Error updating invoice status:", error);
    }
  };

  const markInvoiceAsUnpaid = async (invoiceId) => {
    const { error } = await supabase
      .from('invoices')
      .update({ status: 'unpaid' })
      .eq('id', invoiceId);

    if (error) {
      console.error("Error updating invoice status:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();

    const channel = supabase
      .channel('invoices-changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'invoices' },
        (payload) => {
          console.log('🔄 Invoice updated:', payload);

          const updatedInvoice = payload.new;
          setInvoices(prevInvoices =>
            prevInvoices.map(invoice =>
              invoice.id === updatedInvoice.id ? updatedInvoice : invoice
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchInvoices]);

  return {
    invoices,
    loading,
    markInvoiceAsPaid,
    markInvoiceAsUnpaid
  };
}