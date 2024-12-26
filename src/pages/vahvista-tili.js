import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const { token } = router.query; // Extract token

    if (token) {
      supabase.auth
        .verifyOtp({ token }) // Verify
        .then(() => {
          router.push('/auth'); // Redirect
        })
        .catch((error) => {
          console.error('Verification failed:', error.message);
        });
    }
  }, [router.query]);

  return <p>Lataa...</p>;
}