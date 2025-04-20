import './globals.css';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import ClientTracker from '../components/clientTracker';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';
import { Suspense } from 'react';

export const metadata = {
  title: 'Logistix',
  description: 'Logistix - Yhdistämme lähetykset luotettaviin kuljetuspalveluihin sujuvaa logistiikkaa varten.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fi">
      <head>
        <GoogleTagManager gtmId="GTM-T7GRXLNQ" />

        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="/assets/logistix-logos/png/Logo.png" />
        <meta property="og:url" content="https://www.logistix.fi" />

        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />

        <Script
          src="https://www.gstatic.com/maps-platform/places/web/js/PlaceAutocompleteElement.js"
          type="module"
          strategy="afterInteractive"
        />
      </head>

      <body>
      <Suspense fallback={null}>
          <ClientTracker />
        </Suspense>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {children}
        <Analytics />
        <SpeedInsights />
      
      </body>

      <GoogleAnalytics gaId="G-KS6NFLFQKS" />
    </html>
  );
}