import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';

const useFetchKuljetusById = (id) => {
  const [kuljetus, setKuljetus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKuljetus = async () => {
      if (!id) return;
      try {
        const { data, error } = await supabase.from('shipments').select('*').eq('id', id).single();
        if (error) throw error;
        setKuljetus(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchKuljetus();
  }, [id]);

  return { kuljetus, loading, error };
};

export default useFetchKuljetusById;