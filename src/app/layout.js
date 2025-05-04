import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import ClientTracker from '../components/clientTracker';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';
import { Suspense } from 'react';
import "@/app/globals.css";

//import ToastifyClient from '../components/ToastifyClient';

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
            id="segment-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics._writeKey="9OvAFcPGzsA6Q5oFKkmd7J9p5lpHYy7E";analytics.SNIPPET_VERSION="4.13.2";
                analytics.load("9OvAFcPGzsA6Q5oFKkmd7J9p5lpHYy7E");
                analytics.page();
                }}();
              `,
            }}
          />
      </head>

      <body>
      <Suspense fallback={null}>
          <ClientTracker />
        </Suspense>

    /*    <ToastifyClient
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        /> */
        {children}
        <Analytics />
        <SpeedInsights />
      
      </body>

      <GoogleAnalytics gaId="G-KS6NFLFQKS" />
    </html>
  );
}
