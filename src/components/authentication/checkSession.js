import { supabase } from '@/supabaseClient';

export const checkSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error fetching session:', error.message);
    return null;
  }
  return session;
};