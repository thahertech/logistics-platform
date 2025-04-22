import { useState } from 'react';
import { toast } from 'react-toastify';
import {supabase} from '@/supabaseClient';  // Adjust path if needed

export const useProfileActions = (profile, setProfile) => {
  const [loading, setLoading] = useState(false);

  const onProfileUpdate = async (updatedProfile) => {
    setLoading(true);
    try {
      const { app_metadata, aud, confirmation_sent_at, email, email_confirmed_at, identities, is_anonymous, last_sign_in_at, phone, role, user_metadata, id, ...profileData } = updatedProfile;

      const { data, error } = await supabase
        .from('profiles')
        .upsert([
          {
            user_id: profile.user_id,
            ...profileData,
            updated_at: new Date().toISOString()
          }
        ], { onConflict: ['user_id'] });

      if (error) throw new Error('Error updating profile: ' + error.message);
      toast.success('Profiili päivitetty!');
      setProfile(updatedProfile);  // Update profile state
    } catch (err) {
      toast.error('Profiilin päivitys epäonnistui: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Uloskirjautuminen epäonnistui: ' + error.message);
    } else {
      toast.success('Uloskirjautuminen onnistui');
      window.location.href = '/auth/login';
    }
    setLoading(false);
  };

  return { onProfileUpdate, handleSignOut, loading };
};