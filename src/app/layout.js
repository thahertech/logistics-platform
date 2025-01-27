import './globals.css';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import ClientTracker from './Components/clientTracker';


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
        </head>
      <body>

      
      <ClientTracker />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId="G-KS6NFLFQKS" />

    </html>
  );
}