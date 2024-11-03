import './globals.css';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import AnalyticsClient from './components/analyticsClient';
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  title: 'Logistix',
  description: 'Löydä kuljetus juuri sinulle',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fi">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        {children}
        <Analytics /> {/* NextJS */}
        <SpeedInsights /> {/* NextJS */}
        <GoogleAnalytics gaId="G-KS6NFLFQKS" /> {/* Google */}
      </body>
    </html>
  );
}
