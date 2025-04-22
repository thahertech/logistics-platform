import { useState } from 'react';
import { toast } from 'react-toastify';
import { supabase } from '@/supabaseClient';


const usePlaceOrder = (cart, userProfile, isAgreementChecked, isLogistixAgreementChecked) => {
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const commission = totalPrice * 0.1;
    const amountPaidToCompany = totalPrice - commission;
    return { totalPrice, commission, amountPaidToCompany };
  };

  const generateFreightLog = async (shipmentId) => {
    try {
      const response = await fetch('/api/generate-freight-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shipment_id: shipmentId }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Something went wrong');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      window.open(url, '_blank');
    } catch (err) {
      console.error('Error generating freight log:', err.message);
    }
  };

  const handlePlaceOrder = async () => {
    if (isPurchased) return;

    const { totalPrice } = calculateTotal();

    if (!userProfile || !userProfile.full_name || !userProfile.vat_number || !userProfile.yritys_nimi || !userProfile.address) {
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

    setLoading(true);

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData?.session?.access_token) {
      console.error("Error fetching session details:", sessionError);
      toast.error("Failed to authenticate user. Please log in.");
      setLoading(false);
      return;
    }

    const accessToken = sessionData.session.access_token;
    const kuljetus = cart[0];

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
        setLoading(false);
        return;
      }

      toast.success("Tilaus onnistui! Kiitos ostoksestasi.");
      generateFreightLog(kuljetus.id);
      setIsPurchased(true);
      setLoading(false);
    } catch (err) {
      console.error("Network error:", err);
      toast.error("Tilaus epäonnistui. Tarkista yhteys ja yritä uudelleen.");
      setLoading(false);
    }
  };

  return {
    isPurchased,
    loading,
    handlePlaceOrder
  };
};

export default usePlaceOrder;