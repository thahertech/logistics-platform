import './globals.css';

export const metadata = {
  title: 'Logistix',
  description: 'Löydä kuljetus juuri sinulle',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
