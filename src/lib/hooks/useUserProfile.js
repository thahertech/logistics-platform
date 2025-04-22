// hooks/useUserProfile.js
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { toast } from 'react-toastify';

const useUserProfile = (user) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && user.id) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (error) {
            setError(error);
            toast.error("Failed to fetch user profile.");
          } else {
            setUserProfile(data);
          }
        } catch (err) {
          setError(err);
          toast.error("Error fetching user profile.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  return { userProfile, loading, error };
};

export default useUserProfile;