import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Layout from '../app/Dashboard/Layout';
import '../app/globals.css';
import { supabase } from '@/supabaseClient';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid'; 
import { motion } from "framer-motion";



const CreateShipment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();


  const [shipmentIdentifier, setShipmentIdentifier] = useState('')
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('thaher.alamir@hotmail.com');
  const [phoneNumber, setPhoneNumber] = useState('0406893349');
  const [yTunnus, setYTunnus] = useState('901234-3');
  const [senderAddress, setSenderAddress] = useState('meritullinraitti 7 B');
  const [senderPostalCode, setSenderPostalCode] = useState('90100');
  const [senderCity, setSenderCity] = useState('Oulu');

  const [pickupAddress, setPickupAddress] = useState('Oulu');
  const [pickupLocation, setPickupLocation] = useState({ lat: '', lng: '' });
  const [pickupDate, setPickupDate] = useState('2023-10-16 10:00:00+00');
  const [pickupTime, setPickupTime] = useState('2023-10-16 10:00:00+00');
  const [pickupPostalCode, setPickupPostalCode] = useState('90100');
  const [pickupCity, setPickupCity] = useState('Oulu');
  const [pickupLatitude, setPickupLatitude] = useState('12.49023');
  const [pickupLongitude, setPickupLongitude] = useState('30.239');

  const [recipientName, setRecipientName] = useState('Mikko');
  const [recipientAddress, setRecipientAddress] = useState('OULU');
  const [recipientPostalCode, setRecipientPostalCode] = useState('90100');
  const [recipientCity, setRecipientCity] = useState('OULU');
  const [recipientEmail, setRecipientEmail] = useState('thaher.alamir@hotmail.com');
  const [recipientPhone, setRecipientPhone] = useState('0405892839');

  const [deliveryAddress, setDeliveryAddress] = useState('meritullinraitti 7 b 33');
  const [deliveryPostalCode, setDeliveryPostalCode] = useState('90100');

  const [deliveryDate, setDeliveryDate] = useState('2023-10-16 10:00:00+00');
  const [deliveryTime, setDeliveryTime] = useState('2023-10-16 10:00:00+00');
  const [deliveryCity, setDeliveryCity] = useState('OULU');
  const [deliveryLatitude, setDeliveryLatitude] = useState('10.390');
  const [deliveryLongitude, setDeliveryLongitude] = useState('25.590');
  
  const [weight, setWeight] = useState(2);
  const [transportUnits, setTransportUnits] = useState(1);
  const [unitType, setUnitType] = useState('');
  const [details, setDetails] = useState('');

  const [price, setPrice] = useState(1);
  const [amount, setAmount] = useState(2);
  const [status, setStatus] = useState('pending');

  const [items, setItems] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: user, error: userError } = await supabase.auth.getUser();
        if (userError) {
          throw new Error(`User fetch error: ${userError.message}`);
        }
  
        if (user) {
          console.log('User data:', user);

          const { data: userProfile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
          } else {
            console.log('Profile details:', userProfile);

            setCompanyName(userProfile.yritys_nimi || '');
            setContactPerson(userProfile.full_name || '');
            setEmail(user.user.email || '');
            setPhoneNumber(userProfile?.phone_number || '');
            setYTunnus(userProfile?.vat_number || '');
          }
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);



  const getCoordinates = async (address) => {
    // Fetch coordinates from address
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
          limit: 1,
        },
      });

      if (response.data.length > 0) {
        return { lat: response.data[0].lat, lng: response.data[0].lon };
      } else {
        alert('Could not find coordinates for the address.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      alert('Failed to fetch coordinates for the address.');
      return null;
    }
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      const coords = await getCoordinates(pickupAddress);
      if (coords) {
        setPickupLocation(coords);
        setActiveStep((prev) => prev + 1);
      }
    } else if (activeStep === 1) {
      const coords = await getCoordinates(deliveryAddress);
      if (coords) {
        setActiveStep((prev) => prev + 1);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  const validPrice = parseFloat(price);
  const validAmount = parseFloat(amount);

  if (isNaN(validPrice)) {
    validPrice = 0;
  }
  if (isNaN(validAmount)) {
    validAmount = 0;
  }



  const formattedPrice = validPrice.toFixed(2); 
  const formattedAmount = validAmount.toFixed(2);


    const pickupTimestamp = `${pickupDate} ${pickupTime}:00`; 
    const deliveryTimestamp = `${deliveryDate} ${deliveryTime}:00`;
  
    const validPickupTimestamp = dayjs(pickupTimestamp, 'YYYY-MM-DD HH:mm:ss').isValid()
      ? pickupTimestamp
      : null; 
    const validDeliveryTimestamp = dayjs(deliveryTimestamp, 'YYYY-MM-DD HH:mm:ss').isValid()
      ? deliveryTimestamp
      : null;
      

      const generatedShipmentId = uuidv4();
      setShipmentIdentifier(generatedShipmentId);

  const shipmentData = {
    shipment_identifier: generatedShipmentId,
    sender_name: companyName,
    sender_email: email,
    sender_address: senderAddress,
    sender_postal_code: senderPostalCode,
    sender_city: senderCity,
    sender_phone: phoneNumber,
    recipient_name: recipientName,
    recipient_address: recipientAddress,
    recipient_postal_code: recipientPostalCode,
    recipient_city: recipientCity,
    recipient_email: recipientEmail,
    recipient_phone: recipientPhone,
    pickup_address: senderAddress,
    pickup_postal_code:pickupPostalCode,
    pickup_city:pickupCity,
    pickup_date:pickupDate,
    pickup_time: validPickupTimestamp,
    pickup_latitude: pickupLatitude,
    pickup_longitude: pickupLongitude,
        delivery_address: deliveryAddress,
         delivery_postal_code: deliveryPostalCode,
         delivery_city: deliveryCity,
         delivery_date: deliveryDate,
         delivery_time: validDeliveryTimestamp,
         delivery_latitude: deliveryLatitude,
         delivery_longitude: deliveryLongitude,
         weight: weight,
         transport_units: transportUnits,
         unit_type: unitType,
         price: price,
         details: details,
         amount: amount,
         status: "pending"
  };

    console.log(shipmentData);
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
      if (sessionError || !sessionData?.session?.access_token) {
        console.error("Error fetching session details:", sessionError);
        alert("Failed to authenticate user. Please log in.");
        return;
      }
  
      const accessToken = sessionData.session.access_token;
  try {

    const response = await fetch('https://ccjggzpkomwjzwrawmyr.supabase.co/functions/v1/new-shipment-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(shipmentData),
    });

    console.log(response);
    const edgeFunctionResponse = await response.json();
    console.log(edgeFunctionResponse);
  
    const { data, error } = await supabase
    .from('shipments')
    .insert([shipmentData])
    .select();

  if (error) {
    throw error;
  }

  
    if (data) {
      alert('Ilmoitus julkaistu!');
  
      const newShipmentId = data[0]?.id; 
      if (newShipmentId) {
        router.push(`/kuljetukset/${newShipmentId}`); 
      } else {
        console.error('Failed to retrieve shipment ID');
        alert('Virhe. ei voitu ohjata.');
      }
    }
  } catch (error) {
    console.error('Error inserting shipment data:', error);
    alert('Virhe. ei toimi');
  }
};  

const steps = ["Noutotiedot", "Toimitustiedot", "Kuljetustiedot"];



const renderStepContent = (step) => {
  switch (step) {
    case 0:
      return (
        <div>
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded text-black"
            placeholder="Yritys tai Nimesi"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded text-black"
            placeholder="Yhteyshenkilö"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
          />
          <input
            type="email"
            className="w-full p-2 mb-4 border rounded text-black"
            placeholder="Sähköposti"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            className="w-full p-2 mb-4 border rounded text-black"
            placeholder="Puhelinnumero"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded text-black"
            placeholder="Y-tunnus"
            value={yTunnus}
            onChange={(e) => setYTunnus(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded text-black"
            placeholder="Nouto Osoite"
            value={senderAddress}
            onChange={(e) => setSenderAddress(e.target.value)}
          />
          <div className="flex space-x-4">
            <input
              type="text"
              className="w-1/2 p-2 mb-4 border rounded text-black"
              placeholder="Postinumero"
              value={senderPostalCode}
              onChange={(e) => setSenderPostalCode(e.target.value)}
            />
            <input
              type="text"
              className="w-1/2 p-2 mb-4 border rounded text-black"
              placeholder="Kaupunki"
              value={senderCity}
              onChange={(e) => setSenderCity(e.target.value)}
            />
          </div>
          <input
            type="date"
            className="w-full p-2 mb-4 border rounded text-black"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
          <input
            type="time"
            className="w-full p-2 mb-4 border rounded text-black"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            aria-label="Nouto Aika"
          />
        </div>
      );
    case 1:
      return (
        <div>
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded text-black"
            placeholder="Toimitus Osoite"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
          <div className="flex space-x-4">
            <input
              type="date"
              className="w-1/2 p-2 mb-4 border rounded text-black"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
            <input
              type="time"
              className="w-1/2 p-2 mb-4 border rounded text-black"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              aria-label="Toimitus Aika"
            />
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          <div className="flex items-center">
            <input
              type="number"
              className="w-full p-2 mb-4 border rounded text-black"
              placeholder="Paino (Kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <select
            className="w-full p-2 mb-4 border rounded text-black"
            value={unitType}
            onChange={(e) => setUnitType(e.target.value)}
          >
            <option value="">Valitse yksikkö tyyppi</option>
            <option value="Kolli">Kolli</option>
            <option value="Eurolava">Eurolava</option>
            <option value="Lava">Lava</option>
            <option value="Kärry">Kärry</option>
            <option value="Kontti">Kontti</option>
            <option value="Rullakko">Rullakko</option>
            <option value="Pikkukontti">Pikkukontti</option>
            <option value="Lava-auto">Lava-auto</option>
            <option value="Bulk">Bulk</option>
            <option value="Raskas kuorma">Raskas kuorma</option>
          </select>
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded text-black"
            placeholder="Kuljetettavat yksiköt"
            value={transportUnits}
            onChange={(e) => setTransportUnits(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded text-black"
            placeholder="Lisätietoa"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <input
            type="number"
            className="w-full p-2 mb-4 border rounded text-black"
            placeholder="Hinta"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      );
    default:
      return 'Tuntematon vaihe';
  }
};

  return (
     <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-black-800">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-lg border border-gray-300 flex flex-col p-6 rounded-lg shadow-md w-2/4"
        >
          <h2 className="text-lg font-bold mb-4 text-white">Luo Kuljetustilaus</h2>
          <div className="mb-4">
            <div className="flex justify-between">
              {steps.map((label, index) => (
                <div
                  key={label}
                  className={`text-center ${activeStep === index ? 'text-blue-500' : 'text-gray-500'}`}
                >
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          {renderStepContent(activeStep)}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className={`bg-gray-300 text-white px-4 py-2 rounded ${activeStep === 0 ? 'hidden' : ''}`}
              onClick={handleBack}
              aria-label="Takaisin"
            >
              Takaisin
            </button>
            {activeStep === steps.length - 1 ? (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                aria-label="Julkaise"
              >
                Julkaise
              </button>
            ) : (
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleNext}
                aria-label="Seuraava"
              >
                Seuraava
              </button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateShipment;