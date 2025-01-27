import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabaseClient';  // Make sure to import your Supabase client
import Layout from '@/app/Dashboard/Layout';
import styles from '@/app/Styles/KuljetusSinglePage.module.css';


const EditKuljetusPage = () => {
  const router = useRouter();
  const { id } = router.query;  // Get the kuljetus ID from the URL
  const [kuljetus, setKuljetus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKuljetus = async () => {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .eq('id', id)
        .single();  // Fetch the single shipment by ID

      if (error) {
        console.error('Error fetching kuljetus:', error);
      } else {
        setKuljetus(data);
      }
      setLoading(false);
    };

    if (id) {
      fetchKuljetus();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Collect the updated values from the form
    const updatedData = {
      // Add the necessary fields here
      pickup_address: e.target.pickup_address.value,
      delivery_address: e.target.delivery_address.value,
      price: e.target.price.value,
      weight: e.target.weight.value,
      unit_type: e.target.unit_type.value,
    };

    try {
      const { error } = await supabase
        .from('shipments')
        .update(updatedData)
        .eq('id', id);  // Update the kuljetus data in the table

      if (error) {
        throw error;
      }

      console.log('Kuljetus päivitetty!');
      router.push(`/kuljetukset/${id}`);  // Redirect back to the updated page
    } catch (error) {
      console.error('Error updating kuljetus:', error);
      alert('Päivitys epäonnistui');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
    <div className={styles.kuljetusPage}>
      <div className={styles.header}>
        <h1>Muokkaa Kuljetusta</h1>
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {/* Sender Information */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Lähettäjän Nimi</label>
          <input
            className={styles.formInput}
            type="text"
            name="sender_name"
            defaultValue={kuljetus.sender_name}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Lähettäjän Osoite</label>
          <input
            className={styles.formInput}
            type="text"
            name="sender_address"
            defaultValue={kuljetus.sender_address}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Postinumero</label>
          <input
            className={styles.formInput}
            type="text"
            name="sender_postal_code"
            defaultValue={kuljetus.sender_postal_code}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Kaupunki</label>
          <input
            className={styles.formInput}
            type="text"
            name="sender_city"
            defaultValue={kuljetus.sender_city}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Sähköposti</label>
          <input
            className={styles.formInput}
            type="email"
            name="sender_email"
            defaultValue={kuljetus.sender_email}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Puhelin</label>
          <input
            className={styles.formInput}
            type="text"
            name="sender_phone"
            defaultValue={kuljetus.sender_phone}
          />
        </div>
  
        {/* Recipient Information */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Vastaanottajan Nimi</label>
          <input
            className={styles.formInput}
            type="text"
            name="recipient_name"
            defaultValue={kuljetus.recipient_name}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Vastaanottajan Osoite</label>
          <input
            className={styles.formInput}
            type="text"
            name="recipient_address"
            defaultValue={kuljetus.recipient_address}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Postinumero</label>
          <input
            className={styles.formInput}
            type="text"
            name="recipient_postal_code"
            defaultValue={kuljetus.recipient_postal_code}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Kaupunki</label>
          <input
            className={styles.formInput}
            type="text"
            name="recipient_city"
            defaultValue={kuljetus.recipient_city}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Sähköposti</label>
          <input
            className={styles.formInput}
            type="email"
            name="recipient_email"
            defaultValue={kuljetus.recipient_email}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Puhelin</label>
          <input
            className={styles.formInput}
            type="text"
            name="recipient_phone"
            defaultValue={kuljetus.recipient_phone}
          />
        </div>
  
        {/* Pickup Information */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nouto Osoite</label>
          <input
            className={styles.formInput}
            type="text"
            name="pickup_address"
            defaultValue={kuljetus.pickup_address}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nouto Postinumero</label>
          <input
            className={styles.formInput}
            type="text"
            name="pickup_postal_code"
            defaultValue={kuljetus.pickup_postal_code}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nouto Kaupunki</label>
          <input
            className={styles.formInput}
            type="text"
            name="pickup_city"
            defaultValue={kuljetus.pickup_city}
          />
        </div>
        {/* <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nouto Päivä</label>
          <input
            className={styles.formInput}
            type="date"
            name="pickup_date"
            defaultValue={kuljetus.pickup_date}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nouto Aika</label>
          <input
            className={styles.formInput}
            type="time"
            name="pickup_time"
            defaultValue={kuljetus.pickup_time}
          />
        </div> */}
  
        {/* Delivery Information */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Toimitus Osoite</label>
          <input
            className={styles.formInput}
            type="text"
            name="delivery_address"
            defaultValue={kuljetus.delivery_address}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Toimitus Postinumero</label>
          <input
            className={styles.formInput}
            type="text"
            name="delivery_postal_code"
            defaultValue={kuljetus.delivery_postal_code}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Toimitus Kaupunki</label>
          <input
            className={styles.formInput}
            type="text"
            name="delivery_city"
            defaultValue={kuljetus.delivery_city}
          />
        </div>
        {/* <div className={styles.formGroup}>
          <label className={styles.formLabel}>Toimitus Päivä</label>
          <input
            className={styles.formInput}
            type="date"
            name="delivery_date"
            defaultValue={kuljetus.delivery_date}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Toimitus Aika</label>
          <input
            className={styles.formInput}
            type="time"
            name="delivery_time"
            defaultValue={kuljetus.delivery_time}
          />
        </div> */}
  
        {/* Additional Information */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Paino (kg)</label>
          <input
            className={styles.formInput}
            type="number"
            name="weight"
            defaultValue={kuljetus.weight}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Kuljetusyksiköt</label>
          <input
            className={styles.formInput}
            type="number"
            name="transport_units"
            defaultValue={kuljetus.transport_units}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Yksikkötyyppi</label>
          <input
            className={styles.formInput}
            type="text"
            name="unit_type"
            defaultValue={kuljetus.unit_type}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Hinta (€)</label>
          <input
            className={styles.formInput}
            type="number"
            name="price"
            defaultValue={kuljetus.price}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Lisätiedot</label>
          <textarea
            className={styles.formInput}
            name="details"
            defaultValue={kuljetus.details}
          />
        </div>
  
        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.editButton} type="submit">
            Päivitä Kuljetus
          </button>
          <button
            className={styles.backButton}
            type="button"
            onClick={() => router.push(`/kuljetukset/${id}`)}
          >
            Takaisin
          </button>
        </div>
      </form>
    </div>
  </Layout>
  );
};

export default EditKuljetusPage;