import { supabase } from '@/supabaseClient';
import { toast } from 'react-toastify';
import { isValidEmail } from '../validateEmail';
import { ROUTES} from '@/constants/routes';

export const handleForgotPassword = async (formData, setError, setIsLoading) => {
  setIsLoading(true);
  if (!isValidEmail(formData.email)) {
    toast.error('Anna sähköposti');
    setIsLoading(false);
    return;
  }

  const redirectURL = process.env.NODE_ENV === 'production'
    ? `https://logistix.fi/${ROUTES.FORGOT_PASSWORD}`
    : `http://localhost:3000/auth/reset-password`;

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(formData.email.trim(), {
      redirectTo: redirectURL,
    });
    if (error) throw error;
    toast.success('Salasanan palautuslinkki lähetetty! Tarkista sähköposti');
  } catch (error) {
    toast.error('Ei onnistunut. Yritä uudelleen');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};