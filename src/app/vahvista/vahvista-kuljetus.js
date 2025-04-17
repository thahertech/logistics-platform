import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';
import styles from '@/app/Styles/VahvistaKuljetus.module.css';

const VahvistaKuljetus = () => {
  const [shipment, setShipment] = useState(null);
  const router = useRouter();

  const { shipmentId } = router.query; // Haetaan shipmentId URL-kyselyparametreistä

  // Haetaan lähetyksen tiedot, kun komponentti latautuu tai shipmentId muuttuu
  useEffect(() => {
    const shipmentId = 12; // Kiinteä arvo tällä hetkellä, korvaa routerin kyselyllä tarvittaessa
    if (shipmentId) {
      // Haetaan lähetyksen tiedot API:sta tai tietokannasta
      fetchShipmentData(shipmentId);
    }
  }, [shipmentId]);

  // Funktio lähetyksen tietojen hakemiseen palvelimelta/tietokannasta
  const fetchShipmentData = async (shipmentId) => {
    try {
      // Korvaa oikealla API-päätepisteellä tai tietojen hakulogiikalla
      const response = await fetch(`/api/get-shipment-data?shipmentId=${shipmentId}`);
      const data = await response.json();

      if (response.ok && data) {
        setShipment(data);
      } else {
        alert('Lähetyksen tietoja ei löytynyt.');
      }
    } catch (error) {
      console.error('Virhe lähetyksen tietojen hakemisessa:', error);
      alert('Tapahtui virhe. Yritä uudelleen.');
    }
  };

  // Toimituksen vahvistamisen funktio
  const confirmDelivery = async () => {
    if (!shipment) return;

    try {
      const response = await fetch(`/api/confirm-delivery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shipmentId: shipment.shipment_identifier }),
      });

      if (response.ok) {
        setShipment((prev) => ({
          ...prev,
          status: 'Toimitettu',
        }));
        alert('Toimitus vahvistettu!');
        router.push('/kuljetus-suoritettu');
      } else {
        alert('Virhe toimituksen vahvistamisessa.');
      }
    } catch (error) {
      console.error('Virhe toimituksen vahvistamisessa:', error);
      alert('Tapahtui virhe. Yritä uudelleen.');
    }
  };

  if (!shipment) {
    return <div>Ladataan...</div>;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Vahvista Kuljetus</h1>

        <p>Huomio: Vahvista vasta kohteessa.</p>
        {shipment.status !== 'Toimitettu' && (
          <div className={styles.confirmButton}>
            <button onClick={confirmDelivery}>
              Vahvista Toimitus
            </button>
          </div>
        )}

<div className={styles.status}>
          <h2>Status: {shipment.status}</h2>
        </div>


        <div className={styles.section}>
          <h2 className={styles.subTitle}>Lähetyksen Tiedot</h2>
          <p><strong>Lähetyksen tunnus:</strong> {shipment.shipment_identifier}</p>
          <p><strong>Paino:</strong> {shipment.weight}</p>
          <p><strong>Kuljetusyksiköt:</strong> {shipment.transport_units}</p>
          <p><strong>Yksikkötyyppi:</strong> {shipment.unit_type}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.subTitle}>Vastaanottajan Tiedot</h2>
          <p><strong>Vastaanottajan nimi:</strong> {shipment.recipient_name}</p>
          <p><strong>Vastaanottajan puhelin:</strong> {shipment.recipient_phone}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.subTitle}>Toimituksen Tiedot</h2>
          <p><strong>Toimitusosoite:</strong> {shipment.delivery_address}</p>
          <p><strong>Toimituskoodi:</strong> {shipment.delivery_postal_code}</p>
          <p><strong>Toimituskaupunki:</strong> {shipment.delivery_city}</p>
          <p><strong>Toimituspäivämäärä:</strong> {shipment.delivery_date}</p>
          <p><strong>Toimitusaika:</strong> {shipment.delivery_time}</p>
          <p><strong>Toimituspaikka:</strong> {shipment.delivery_latitude}, {shipment.delivery_longitude}</p>
        </div>


      </div>
    </Layout>
  );
};

export default VahvistaKuljetus;