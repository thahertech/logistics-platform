"use client";

import { useEffect } from 'react';
import Script from 'next/script';
import ReactGA from 'react-ga4';

const AnalyticsClient = () => {
  useEffect(() => {
    ReactGA.initialize('G-KS6NFLFQKS');
    ReactGA.send('pageview');

    const handleRouteChange = (url) => {
      ReactGA.send({ hitType: 'pageview', page: url });
    };

    window.addEventListener('popstate', () => handleRouteChange(window.location.pathname));

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <>
      <Script
        id="gtag"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-KS6NFLFQKS`}
      />
      <Script id="gtag-init">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KS6NFLFQKS', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
};

export default AnalyticsClient;
