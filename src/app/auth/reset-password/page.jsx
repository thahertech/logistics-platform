'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabaseClient';
import { toast } from 'react-toastify';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);
  const accessToken = url.searchParams.get('access_token');
  const type = url.searchParams.get('type');

    const handlePasswordReset = async () => {
      if (type === 'recovery' && accessToken) {
        const { data, error } = await supabase.auth.getSession();

        if (error || !data?.session) {
          toast.error('Istunnon hakeminen epäonnistui.');
          router.push('/auth/login');
        } else {
          toast.success('Kirjautuminen onnistui. Voit nyt asettaa uuden salasanan.');
          router.push('/auth/vaihda-salasana');
        }
      } else {
        toast.error('Virheellinen linkki.');
        router.push('/auth/login');
      }

      setLoading(false);
    };

    handlePasswordReset();
  }, [router]);

  return (
    <div style={styles.container}>
      <p style={styles.text}>{loading ? 'Kirjaudutaan sisään...' : 'Uudelleenohjataan...'}</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
};
