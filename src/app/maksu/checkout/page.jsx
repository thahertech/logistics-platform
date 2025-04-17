'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/Styles/Checkout.module.css';
import Layout from '@/components/Layout/Layout';
import { supabase } from '@/supabaseClient';
import { toast } from 'react-toastify';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [isLogistixAgreementChecked, setIsLogistixAgreementChecked] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    } else {
      router.push('/kuljetukset'); // Redirect if no items in the cart
    }
  }, [router]);

   // Fetch user details
   useEffect(() => {
    const fetchUserDetails = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData?.session?.access_token) {
        console.error("Error fetching session details:", sessionError);
        toast.error("Failed to authenticate user. Please log in.");
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('yritys_nimi, phone_number, address, full_name, vat_number, full_name')
        .eq('user_id', sessionData.session.user.id)
        .single();

      if (userError) {
        console.error("Error fetching user details:", userError);
        toast.error("Failed to fetch user details.");
        return;
      }

      setUserDetails(userData);
    };

    fetchUserDetails();
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const commission = totalPrice * 0.1;
    const amountPaidToCompany = totalPrice - commission;
    return { totalPrice, commission, amountPaidToCompany };
  };

  const generateFinnishReferenceNumber = (baseNumber) => {
    const weights = [7, 3, 1];
    const digits = baseNumber.toString().split('').reverse();
    let sum = 0;

    digits.forEach((digit, index) => {
      sum += parseInt(digit) * weights[index % weights.length];
    });

    const checkDigit = (10 - (sum % 10)) % 10;
    return `${baseNumber}${checkDigit}`;
  };

  const handlePlaceOrder = async () => {
    const kuljetus = cart[0];


    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData?.session?.access_token) {
      console.error("Error fetching session details:", sessionError);
      toast.error("Failed to authenticate user. Please log in.");
      return;
    }

    const accessToken = sessionData.session.access_token;

     // Check if user has completed their profile details (example: name, address)
  if (!userDetails || !userDetails.full_name || !userDetails.vat_number || !userDetails.yritys_nimi || !userDetails.address) {
    toast.error("Täytä ensin käyttäjätiedot.");
    return;
  }

  if (!isAgreementChecked) {
    toast.error("Sinun täytyy hyväksyä kuljetuksen ehdot.");
    return;
  }
  if (!isLogistixAgreementChecked) {
    toast.error("Sinun täytyy hyväksyä Logistix palveluehdot.");
    return;
  }

    const { totalPrice } = calculateTotal();
  
    try {
      const response = await fetch(
        "https://ccjggzpkomwjzwrawmyr.supabase.co/functions/v1/placeOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            kuljetus,
            user: sessionData.session.user,
            totalPrice,
            agreementAccepted: true,
          }),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error placing order:", errorDetails);
        toast.error("Tilaus epäonnistui. Tarkista tiedot ja yritä uudelleen.");
        return;
      }

      const data = await response.json();
      toast
        .success("Tilaus onnistui! Kiitos ostoksestasi.");



      setIsPurchased(true);
      localStorage.removeItem("cart");
      setCart([]);
    } catch (err) {
      console.error("Network error:", err);
      toast.error("Tilaus epäonnistui. Tarkista yhteys ja yritä uudelleen.");
    }
  };

  return (
    <Layout>
      <div className={styles.checkout}>
        <div className={styles.checkoutContainer}>
          <h2 className={styles.checkoutTitle}>Ostoskori</h2>
          {cart.length === 0 ? (
            <div>
              <p className={styles.emptyCartMessage}>Ostoskori on tyhjä.</p>
              <button 
                className={styles.backButton} 
                onClick={() => router.push('/kuljetukset')}
              >
                Palaa takaisin
              </button>
            </div>
          
          ) : (
            <div className={styles.cartItems}>
              {cart.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  <h3>{item.pickup_city || 'Unnamed Shipment'} — {item.delivery_city}</h3>
                  <p>Hinta: {item.amount.toFixed(2)} €</p>
                  <p>Paino: {item.weight} kg</p>
                  <div className={styles.cartGroup}>
                    <h2>{item.details}</h2>
                    <p>Nouto {item.pickup_time}</p>   
                  </div>             
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveItem(index)}
                  >
                    Poista
                  </button>
                </div>
              ))}
                          <input
              type="checkbox"
              id="agreementCheckbox"
              checked={isAgreementChecked}
              onChange={() => setIsAgreementChecked(!isAgreementChecked)}
            />
            <label htmlFor="agreementCheckbox">
              Hyväksyn tämän kuljetuksen <a href="/shipment-terms" target="_blank">ehdot</a>
              <br/>
            </label>
          

        <div className={styles.userDetails}>
                    {userDetails && (
                      <div>
                        <h3>Omat tiedot</h3>
                        <p>Yritys: {userDetails.yritys_nimi}</p>
                        <p>Ytunnus: {userDetails.vat_number}</p>
                        <p>Puhelinnumero: {userDetails.phone_number}</p>
                        <p>Yhteyshenkilö: {userDetails.full_name}</p>
                        <p>Osoite: {userDetails.address}</p>
                        <p>Postinumero: {userDetails.postal_code}</p>
                        <p>Kaupunki: {userDetails.city}</p>
                      </div>
                    )}
                    <button className={styles.editBtn}><a href="/oma-tili">muokkaa tiedot</a></button>
                  </div>

<div className={styles.agreementSection}>


            <input
              type="checkbox"
              id="logistixAgreement"
              checked={isLogistixAgreementChecked}
              onChange={() => setIsLogistixAgreementChecked(!isLogistixAgreementChecked)}
            />
            <label htmlFor="logistixAgreement">
              Hyväksyn Logistix palveluehdot ja säännöt - <a href="/ehdot" target="_blank"> Lue lisää ehdoista</a>
              <br/>
            </label>
          </div>
          

          <div className={styles.totalPrice}>
            <h3>Yhteensä: {calculateTotal().amountPaidToCompany.toFixed(2)} €</h3>
 
            <button
              className={styles.placeOrderButton}
              onClick={handlePlaceOrder}
            >
              Vahvista osto
            </button>
          </div>
          <div className={styles.reminderLabel}>
          <p>Ostamalla kuljetuksen olet sitoutunut toimittamaan tuotteen ehtojen mukaisesti</p>
          <p>Varmista, että antamasi tiedot ovat oikein</p>
          </div>
     </div>
)}
        </div>
      </div>
    
    </Layout>
  );
};

export default Checkout;