'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ClientTracker = () => {
  const router = useRouter();

  const trackPageview = (url) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      console.log('Tracking pageview for:', url); // Useful for debugging
      window.dataLayer.push({ event: 'pageview', page: url });
    } else {
      console.error('GTM dataLayer is not available.');
    }
  };

  useEffect(() => {
    const handleRouteChange = (url) => {
      trackPageview(url);  // Track pageview whenever route changes
    };

    // Wait for GTM to initialize (check if dataLayer is available)
    const checkGTMReady = () => {
      if (typeof window !== 'undefined' && window.dataLayer) {
        // GTM is ready, now listen for route changes
        if (router?.events) {
          router.events.on('routeChangeComplete', handleRouteChange);
          console.log('GTM initialized and route change listener added');
        }
      } else {
        console.error('GTM not yet initialized, retrying...');
        setTimeout(checkGTMReady, 1000); // Retry every 1 second
      }
    };

    checkGTMReady();

    return () => {
      if (router?.events) {
        router.events.off('routeChangeComplete', handleRouteChange);
      }
    };
  }, [router]);

  return null;
};

export default ClientTracker;