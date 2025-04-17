'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient'; // Your Supabase client instance

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession(); // Get the current session
    if (session) {
      setUser(session.user); // If session exists, set the user
    }

    // Listen for changes to the session
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return user;
};