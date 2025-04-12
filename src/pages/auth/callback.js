import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabaseClient';

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleOAuthSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data?.session) {
        router.push('/auth');
      } else {
        router.push('/oma-tili');
      }
    };

    handleOAuthSession();
  }, [router]);

  return (
    <div style={styles.container}>
      <p style={styles.text}>Kirjautuu...</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    padding: 0,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: '2rem',
    textAlign: 'center',
  },
};

export default AuthCallback;