import React, { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';

const VahvistaNouto = () => {
  const [shipment, setShipment] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();
  const { shipmentId } = router.query;

  useEffect(() => {
    const fetchShipmentDetails = async () => {
        const shipmentId = 13;
        if (!shipmentId) return;
        setLoading(true);
        const { data, error } = await supabase
          .from('shipments')
          .select('*')
          .eq('id', shipmentId)
          .single();
        if (error) {
          console.error("Error fetching shipment details:", error);
        } else {
          setShipment(data);
          calculateTimeLeft(data.delivery_date);
        }
        setLoading(false);
    };

    fetchShipmentDetails();
  }, [shipmentId]);

  // Countdown Timer
  const calculateTimeLeft = (deliveryDate) => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = new Date(deliveryDate) - now;
      if (timeDifference > 0) {
        setTimeLeft({
          days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((timeDifference / (1000 * 60)) % 60),
          seconds: Math.floor((timeDifference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
        setTimeLeft({ expired: true });
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  const handleConfirmPickup = async () => {
    const shipmentId = 12;
    const { error } = await supabase
      .from('shipments')
      .update({ status: 'Luovutettu kuljettajalle' })
      .eq('id', shipmentId);

    if (error) {
      console.error("Error updating shipment status:", error);
      alert("Virhe. Yritä uudelleen.");
    } else {
      setConfirmed(true);
    }
  };

  if (loading || !shipment) {
    return <p>Ladataan lähetystietoja...</p>;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-6">Vahvista Nouto</h1>

        <div className="mt-4 mb-12">
            <h2 className="text-lg font-semibold">Aika noutoon jäljellä:</h2>
            {timeLeft.expired ? (
              <p className="text-red-500">Noutoaika on päättynyt!</p>
            ) : (
              <p>
                {timeLeft.days} pv {timeLeft.hours} h {timeLeft.minutes} min {timeLeft.seconds} s
              </p>
            )}
          </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
          <p><strong>Lähettäjä:</strong> {shipment.sender_name}</p>
          <p><strong>Vastaanottaja:</strong> {shipment.recipient_name}</p>
          <p><strong>Nouto-osoite:</strong> {shipment.pickup_address}</p>
          <p><strong>Toimitusosoite:</strong> {shipment.delivery_address}</p>
          <p><strong>Suunniteltu noutoaika:</strong> {new Date(shipment.pickup_date).toLocaleString()}</p>

          <div className="mt-6">
            {confirmed ? (
              <p className="text-blue-700 font-bold">Nouto vahvistettu!</p>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleConfirmPickup}
                disabled={timeLeft.expired}
              >
                Vahvista nouto
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VahvistaNouto;