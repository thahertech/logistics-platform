import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { toast } from 'react-toastify';

export const useProfileData = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) return toast.error('Käyttäjän haku epäonnistui');

      const userData = data.user;
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, phone_number, vat_number, yritys_nimi, user_role, address, city, postal_code')
        .eq('user_id', userData.id)
        .single();

      if (profileError) return toast.error('Profiilin haku epäonnistui');
      
      const fullProfile = {
        ...profileData,
        email: userData.email
      };

      setUser(userData);
      setProfile(fullProfile);
    };

    fetchUserAndProfile();
  }, []);

  return { user, profile };
};