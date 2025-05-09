'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/Styles/Checkout.module.css';
import Layout from '@/components/Layout/Layout';
import { supabase } from '@/supabaseClient';
import { toast } from 'react-toastify';
import  useUser  from '@/lib/hooks/useUser';
import useUserProfile from '@/lib/hooks/useUserProfile';
import usePlaceOrder from '@/lib/hooks/usePlaceOrder';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [isLogistixAgreementChecked, setIsLogistixAgreementChecked] = useState(false);

  const router = useRouter();
  const { user, loading: userLoading, error: userError } = useUser();
  const { userProfile, loading: profileLoading, error: profileError } = useUserProfile(user);
  const { isPurchased, loading, handlePlaceOrder } = usePlaceOrder(cart, userProfile, isAgreementChecked, isLogistixAgreementChecked);



  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    } else {
      router.push('/kuljetukset');
    }
  }, [router]);

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

  if (userLoading || profileLoading) {
    return <div>Loading...</div>;
  }

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
                {userProfile && (
                  <div>
                    <h3>Omat tiedot</h3>
                    <p>Yritys: {userProfile.yritys_nimi}</p>
                    <p>Ytunnus: {userProfile.vat_number}</p>
                    <p>Puhelinnumero: {userProfile.phone_number}</p>
                    <p>Yhteyshenkilö: {userProfile.full_name}</p>
                    <p>Osoite: {userProfile.address}</p>
                    <p>Postinumero: {userProfile.postal_code}</p>
                    <p>Kaupunki: {userProfile.city}</p>
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
                  Hyväksyn Logistix palveluehdot ja säännöt - <a href="/ehdot" target="_blank">Lue lisää ehdoista</a>
                  <br/>
                </label>
              </div>

              <div className={styles.totalPrice}>
                {/* Total price section */}
              </div>

              <button 
                className={styles.placeOrderButton} 
                onClick={handlePlaceOrder}
                disabled={isPurchased}
              >
                {isPurchased ? 'Tilaus Suoritettu' : 'Vahvista tilaus'}
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;