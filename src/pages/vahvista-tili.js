import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../supabaseClient';

export default function VerifyEmail() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const verifyAndRedirect = async () => {
    setIsLoading(true);
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        console.error('Verification failed or no session found', error);
        router.push('/auth');
        return;
      }

      const user = session.user;

      if (user?.email_confirmed_at) {
        router.push('/oma-tili');
      } else {
        alert('Email verification is incomplete. Please check your email.');
        router.push('/auth');
      }
    } catch (error) {
      console.error('Error during verification:', error);
      alert('An unexpected error occurred. Please try again.');
      router.push('/auth');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyAndRedirect();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Sähköpostia vahvistetaan, odota hetki...</p>
      ) : (
        <p>Jos ei ohjaa eteenpäin, tarkista sähköposti tai kirjaudu uudelleen.</p>
      )}
    </div>
  );
}