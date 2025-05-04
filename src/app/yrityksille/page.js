'use client';
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { Rocket, Leaf, ShieldCheck, LayoutDashboard, BadgeCheck, Briefcase } from 'lucide-react'; // Import new icons
import styles from '@/app/styles/page.module.css';

import Image from 'next/image';
import Head from 'next/head';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"



const MeidanPalvelusta = () => {
  const [selectedRole, setSelectedRole] = useState('Kuljettaja');

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = 'Logistix | Yrityksille';
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

    <><Layout>
      <Head>
        <title>Logistiikkaratkaisut Yrityksille - Logistix</title>
        <meta name="description" content="Vähennä logistiikkakustannuksia ja paranna ympäristöystävällisyyttä Logistixin avulla." />
      </Head>
      <div className="video-container-2">
        <div className={styles.companiesherocontent}>
        <video autoPlay controls={false} loop muted playsInline className="background-video-2" preload="auto">
        <source src="/assets/backgrounds/traffic.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
        </video>

            <h2>    Tehokas ja kestävä logistiikkaratkaisu</h2>
            <h4>
              Logistix tarjoaa innovatiivisen alustan yrityksille, jotka haluavat säästää aikaa, rahaa sekä luontoa.
            </h4>
        </div>
      </div>


     

    <Tabs defaultValue="delivery" className=" mx-auto py-4">
    <TabsList className="grid w-full sm:w-1/3 my-24 bg-white/20 mx-auto grid-cols-2">
          <TabsTrigger value="delivery">Kuljettaja</TabsTrigger>
        <TabsTrigger value="owner">Lähettäjä</TabsTrigger>
      </TabsList>
      <TabsContent value="delivery">
       
          <div className={styles.imageContainer}>
            <div className={styles.phaseContainer}>

      <Image
        src="/assets/animations/kuljettaja.png"
        alt="customer-journey Kuljettaja"
        width={2000}
        height={700}
        className={styles.customerImage} />
      <Image
        src="/assets/animations/etsitoimitus.png"
        alt="customer-journey Kuljettaja"
        width={2000}
        height={700}
        className={styles.customerImage} />
      <Image
        src="/assets/animations/kuljetusnouto.png"
        alt="customer-journey Kuljettaja"
        width={2000}
        height={700}
        className={styles.customerImage} />
      <Image
        src="/assets/animations/toimitus.png"
        alt="customer-journey Kuljettaja"
        width={2000}
        height={700}
        className={styles.customerImage} />
      <Image
        src="/assets/animations/kohteessa.png"
        alt="customer-journey Kuljettaja"
        width={2000}
        height={700}
        className={styles.customerImage} />

      <div className={styles.phaseDescriptions}>
        <div className={styles.phase}>
          <strong>Kuljettaja</strong>
          <p>Luo käyttäjä ja vahvista sähköposti.</p>
        </div>
        <div className={styles.phase}>
          <strong>Selaa kuljetuspyyntöjä</strong>
          <p>Valitse kuljetus ja odota vahvistusta.</p>
        </div>
        {/* <div className={styles.phase}>
      <strong>Vahvistettu</strong>
      <p>Vahvista kuljetustehtävä ja tarkista yksityiskohdat.</p>
    </div> */}
        <div className={styles.phase}>
          <strong>Nouto</strong>
          <p>Automaatti-ilmoitukset lastatessa ja purkaessa.</p>
        </div>
        <div className={styles.phase}>
          <strong>Kuljetus</strong>
          <p>Toimita kuljetus turvallisesti ja aikataulussa.</p>
        </div>
        <div className={styles.phase}>
          <strong>Purku</strong>
          <p>Automaattinen laskutus.</p>
        </div>
      </div>
</div>
</div>
   
      </TabsContent>
      <TabsContent value="owner">
    <div className={styles.imageContainer}>
          <div className={styles.phaseContainer}>
            <Image
              src={"/assets/animations/tavaranlähettäjä.png"}
              alt="customer-journey Lähettäjä"
              width="2000"
              height="700"
              className={styles.customerImage} />
            <Image
              src={"/assets/animations/etsitoimitus.png"}
              alt="customer-journey Lähettäjä"
              width="2000"
              height="700"
              className={styles.customerImage} />
            <Image
              src={"/assets/animations/tavaranluovutus.png"}
              alt="customer-journey Lähettäjä"
              width={400}
              height={700}
              className={styles.customerImage} />
            <Image
              src="/assets/animations/toimitus.png"
              alt="customer-journey Kuljettaja"
              width={2000}
              height={700}
              className={styles.customerImage} />
            <Image
              src={"/assets/animations/kohteessa.png"}
              alt="customer-journey Lähettäjä"
              width="2000"
              height="700"
              className={styles.customerImage} />
            <div className={styles.phaseDescriptions}>
              <div className={styles.phase}>
                <strong>Lähettäjä</strong>
                <p>Luo käyttäjä ja vahvista sähköposti.</p>
              </div>
              <div className={styles.phase}>
                <strong>Luo ilmoitus</strong>
                <p>Aseta hintakatto ja alusta kilpailuttaa lähetyksen.</p>
              </div>
              {/* <div className={styles.phase}>
              <strong>Hyväksytty</strong>
              <p>Saat sähköpostiin tilausvahvistuksen.</p>
            </div> */}
              <div className={styles.phase}>
                <strong>Lastaus</strong>
                <p>Liitä automaattinen rahtikirja lähetykseen.</p>
              </div>
              <div className={styles.phase}>
                <strong>Kuljetus</strong>
                <p>Ilmoitukset lähtiessä ja perilllä.</p>
              </div>
              <div className={styles.phase}>
                <strong>Purku</strong>
                <p>Automaattilasku logistix-tilille.</p>
              </div>
            </div>
          </div>
      </div> 
       
      </TabsContent>
    </Tabs>

<div className={styles.sectionYrityksilleContainer}>


    <div className={styles.sectionYrityksille}>

        <p className={styles.sectionContentYrityksille}>
          Logistiikka-alalla yksi suurimmista ongelmista on tyhjien ajokilometrien määrä, mikä johtaa
          sekä korkeisiin kustannuksiin että ympäristöhaittoihin.
          <br />
          <br />Kuljetusyritykset ajavat usein tyhjää,
          koska kuljetusreiteillä ei ole täysiä lastauksia tai paluukuormia, mikä lisää polttoaineenkulutusta
          ja päästöjä.
        </p>
        <p className={styles.sectionContentYrityksille}>
          Alustamme mahdollistaa kuljetusyrityksille tehokkaamman
          reittien suunnittelun ja vähentää tyhjiä kilometrejä yhdistämällä lähettäjät ja kuljetusyritykset
          helposti.
          <br />
          <br /> Tämä ei ainoastaan pienennä kuljetuskustannuksia, vaan tarjoaa myös lähettäjille mahdollisuuden
          tehdä ympäristöystävällisempiä valintoja kilpailukykyisin hinnoin. 
          <br />
          <br />
          Kustannustehokkaat, kilpailutetut ja kestävämmät kuljetukset
          hyödyttävät sekä yrityksiä että ympäristöä.
          </p>
          </div>
     
          {/* <div className={styles.masonryItem}>
        <div className={styles.MasonryContainer}>

      <h2 className={styles.sectionTitle}>Toimintatapa</h2>
      <p className={styles.sectionContent}>
        1. <strong>Julkaise toimitus</strong>: Lähettäjä voi julkaista toimitustarpeen nopeasti.
        <br />
        <br /> 2. <strong>Etsi toimitus</strong>: Kuljetusyritys selaa avoimia toimituksia ja tarjoaa.
        <br />
        <br /> 3. <strong>Hyväksy toimitus</strong>: Varmistuksen jälkeen automaattinen dokumentointi
      </p>
    </div> */}

          {/* <Card className="bg-black/20 max-w-[600px] p-4 flex-col">
            <h2 className={styles.sectionTitle}>Miksi Logistix</h2>
            <ul className={styles.benefitsList}>
              <li>
                Nopeus: Kilpailuta ja julkaise muutamalla klikkauksella.
              </li>
              <li>
                Ekologisuus: Vähemmän tyhjiä ajokilometrejä ja kestävämpi logistiikka.
              </li>
              <li>
                Riskitön kokeilu: Maksat vain toteutuneista kuljetuksista, eikä tarvetta sitoutua.
              </li>
              <li>
                Helppokäyttöisyys: Käyttäjäystävällinen alusta, joka sopii kaiken kokoisille yrityksille.
              </li>
              <li>
                Tyytyväisyystakuu: Jos et säästä 10 % kuljetuskustannuksissa ensimmäisten 6kk aikana, maksamme osuutemme takaisin.
              </li>
            </ul>
          </Card>
          </div>
          */}

  <div className={styles.yrityksetContactSection}>

        <p className={styles.yrityksetContactSectionContent}>
          Haluatko lisätietoa palveluistamme? <br/>
          Lähetä meille viesti, niin olemme sinuun yhteydessä.
        </p>

   
        <div className="flex justify-center mt-8">
          <Card className="max-w-[600px] w-full ">
            <CardHeader>
              <CardTitle>Vapaa sana</CardTitle>
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
                    placeholder="Syötä sähköpostiosoite"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Viesti
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Kirjoita viesti"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required />
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
</div>

    </Layout>
    </>
  );
};

export default MeidanPalvelusta;
