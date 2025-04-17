'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'; // ✅ App Router style
import { supabase } from '@/supabaseClient';
import styles from '../../Styles/KuljetusSinglePage.module.css';
import { FaTruck, FaMapMarkerAlt, FaAddressBook } from 'react-icons/fa';
import Layout from '@/components/Layout/Layout';

const KuljetusSinglePage = () => {
  const router = useRouter();
  const { id } = useParams(); // ✅ Get id from route param
  const [kuljetus, setKuljetus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  
   useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
        return;
      }
      setUser(data.user);
    };

    fetchUser();
  }, []);

 

  useEffect(() => {
    const fetchKuljetus = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('shipments')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setKuljetus(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching kuljetus:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKuljetus();
  }, [id]);

  const isOwner = user?.id === kuljetus?.user_id;


 

  const onBuyShipment = async () => {
    if (isOwner) {
      setAlertMessage("Et voi ostaa omaa kuljetustasi!");
      setShowAlert(true);
      return;
    }
    try {
      let savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      savedCart.push(kuljetus);
      localStorage.setItem('cart', JSON.stringify(savedCart));

   setAlertMessage("Kuljetus lisätty ostoskoriin!");
   setShowAlert(true);

        setShowAlert(false);
        router.push("/maksu/checkout");
      // }, 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAlertMessage("An error occurred while adding to the cart. Please try again.");
      setShowAlert(true);

      // setTimeout(() => {
      //   setShowAlert(false); // Hide alert after 3 seconds
      // }, 3000);
    }
    };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <p>Ladataan kuljetustietoja...</p>
        </div>
      </Layout>
    );
  }

  // Error state
  if (!kuljetus) {
    return (
      <Layout>
        <div className={styles.errorContainer}>
          <p>Kuljetusta ei löytynyt.</p>
          <button
            className={styles.backButton}
            onClick={() => router.push('/kuljetukset')}
          >
            Takaisin
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.kuljetusPage}>
        <div className={styles.header}>
       
        {isOwner && (
            <div className={styles.actions}>
              <button
                className={styles.editButton}
                onClick={() => router.push(`/kuljetukset/muokkaa-kuljetus/${kuljetus.id}`)}  // Redirect to edit page
              >
                Muokkaa Kuljetusta
              </button>
            </div>
          )}

          <div className={styles.actions}>
          {!isOwner && (
              <button className={styles.buyButton} onClick={onBuyShipment}>
                Osta Kuljetus
              </button>
          )}
            <button
              className={styles.backButton}
              onClick={() => router.push('/kuljetukset')}
            >
              Takaisin
            </button>
          </div>
        </div>
        
        <div className={styles.kuljetusContent}>
          <div className={styles.detailsContainer}>


            <div className={styles.card}>
              <h2><FaMapMarkerAlt /> Nouto</h2>
              <p>
                <strong>Osoite:</strong> {kuljetus.pickup_postal_code}, {kuljetus.pickup_city}
              </p>
              <p>
                <strong>Aika:</strong> {kuljetus.pickup_time}
              </p>
            </div>

            <div className={styles.card}>
              <h2><FaMapMarkerAlt /> Toimitus</h2>
              <p>
                <strong>Osoite:</strong> {kuljetus.delivery_postal_code || ''}, {kuljetus.delivery_city || ''}
              </p>
              <p>
                <strong>Aika:</strong> {kuljetus.delivery_time}
              </p>
            </div>
        

          <div className={styles.card}>
              <h2><FaTruck /> Kuljetuksen Tiedot</h2>
              <p><strong>Hinta:</strong> {kuljetus.amount ? kuljetus.amount.toFixed(2) : 'Ei tietoa'} €</p>
              <p><strong>Paino:</strong> {kuljetus.weight} kg</p>
              <p><strong>Yksikkötyyppi:</strong> {kuljetus.transport_units} {kuljetus.unit_type}</p>
              <p>
                <strong>Incoterms: {kuljetus.agreement_type}</strong>
              </p>

              <p><strong>Lisätiedot:</strong> {kuljetus.details || 'Ei lisätietoja.'}</p>
              
             
        
            </div>
            <div className={styles.card}>
              <h2><FaAddressBook /> Lähettäjän Tiedot</h2>
              <p><strong>Yritys:</strong> {kuljetus.sender_name}</p>
              <p><strong>Puhelin:</strong> {kuljetus.sender_phone}</p>        
              </div>
              </div>
       

        
        </div>
      </div>
    </Layout>
  );
};

export default KuljetusSinglePage;