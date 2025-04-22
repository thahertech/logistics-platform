import { supabase } from '@/supabaseClient';
import { toast } from 'react-toastify';
import { ROUTES } from '@/constants/routes';


export const handleOAuthSignIn = async (provider, setIsLoading, setError, router) => {
  try {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}${ROUTES.CALLBACK}`,
      },
    });

    if (error) {
      setError(error.message);
      toast.error(`Virhe: ${error.message}`);
    }
  } catch (error) {
    setError(error.message);
    toast.error(`Virhe: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};

export const signInWithGoogle = (setIsLoading, setError, router) =>
  handleOAuthSignIn('google', setIsLoading, setError, router);

export const signInWithApple = (setIsLoading, setError, router) =>
  handleOAuthSignIn('apple', setIsLoading, setError, router);