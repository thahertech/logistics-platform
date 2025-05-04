'use client';
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import styles from '@/app/Styles/Dashboard.module.css';
import Head from 'next/head';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = 'Logistix | Yhteys';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        setSuccess(true);
        setEmail('');
        setMessage('');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Yhteystiedot - Logistix</title>
        <meta
          name="description"
          content="Ota yhteyttä Logistixiin, olemme täällä auttamassa kaikissa kysymyksissäsi."
        />
      </Head>
      <div className={styles.hero}>
        <div className={`${styles.hero} ${styles.contactHero}`}></div>
        <div className={styles.sectionHero}>
          <h4 className={styles.sectionContent2}>
            Haluatko lisätietoja tai apua?<br /> Ota yhteyttä ja tiimimme vastaa sinulle pikaisesti.
          </h4>
        </div>

        <div className="flex justify-center mt-8">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Lähetä meille viesti</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Sähköposti
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Syötä sähköpostiosoitteesi"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Viesti
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Kirjoita viestisi tähän"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isSending}
                className="w-full"
              >
                {isSending ? 'Lähetetään...' : 'Lähetä'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {success && (
          <div className="mt-4 text-center text-green-600">
            Viesti lähetetty onnistuneesti! Tiimimme vastaa sinulle pian.
          </div>
        )}
      </div>
    </Layout>
  );
}
