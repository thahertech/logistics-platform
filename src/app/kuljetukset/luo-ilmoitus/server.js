// server.js - server-side logic to fetch session data
import { supabase } from '@/supabaseClient'; // Assuming supabase is initialized here

export const fetchData = async () => {
  try {
    const { data: sessionData, error } = await supabase.auth.getSession();

    if (error) {
      throw error; // Handle error properly
    }

    return { sessionData };
  } catch (error) {
    console.error('Error fetching session data:', error);
    throw error;
  }
};