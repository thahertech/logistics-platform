'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const ClientTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const trackPageview = (url) => {

    if (typeof window !== 'undefined' && window.dataLayer) {
      console.log('Tracking pageview for:', url);
      window.dataLayer.push({
        event: 'pageview',
        page: url,
      });

    } else {
      console.error('GTM dataLayer is not available.');
    }
  };

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    trackPageview(url);
  }, [pathname, searchParams]);

  return null;
};

export default ClientTracker;