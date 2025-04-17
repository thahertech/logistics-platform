'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabaseClient';
import { toast } from 'react-toastify';

export default function VerifyEmail() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const verifyAndRedirect = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        console.error('Verification failed or no session found', error);
        toast.error('Vahvistus epäonnistui tai istuntoa ei löytynyt.');
        router.push('/auth/login');
        return;
      }

      const user = session.user;

      if (user?.email_confirmed_at) {
        router.push('/oma-tili');
      } else {
        toast.error('Sähköposti ei ole vahvistettu. Tarkista sähköpostisi.');
        setTimeout(() => router.push('/auth/login'), 2000);
      }
    } catch (error) {
      console.error('Error during verification:', error);
      toast.error('Sähköpostin vahvistaminen epäonnistui. Yritä uudelleen.');
      router.push('/auth/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    verifyAndRedirect();
  }, [verifyAndRedirect]);

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