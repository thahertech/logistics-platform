import './globals.css';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import AnalyticsClient from './Components/analyticsClient';
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  title: 'Logistix',
  description: 'Logistix - Yhdistämme lähetykset luotettaviin kuljetuspalveluihin sujuvaa logistiikkaa varten.',
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="fi">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="/assets/logistix-logos/png/Logo.png" />
        <meta property="og:url" content="https://www.logistix.fi" />

        {/* Google Tag */}
        {GTM_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GTM_ID}');
                `,
              }}
            ></script>
          </>
        )}
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}