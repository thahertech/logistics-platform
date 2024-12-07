'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ClientTracker = () => {
  const router = useRouter();

  const trackPageview = (url) => {
    if (window?.dataLayer) {
      window.dataLayer.push({ event: 'pageview', page: url });
    }
  };

  useEffect(() => {
    // On the client-side
    if (typeof window !== 'undefined' && router?.events) {
      const handleRouteChange = (url) => {
        trackPageview(url);
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      // Cleanup function to avoid memory leaks
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router]);

  return null;
};

export default ClientTracker;