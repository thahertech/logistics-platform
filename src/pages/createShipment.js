import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Layout from '../app/dashboard/Layout';
import '../app/globals.css';
import { jwtDecode } from 'jwt-decode';



const CreateShipment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [yTunnus, setYTunnus] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupLocation, setPickupLocation] = useState({ lat: '', lng: '' });
  const [pickupDate, setPickupDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [deliveryDate, setDeliveryDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [pickupTime, setPickupTime] = useState(''); // New pickup time state
  const [deliveryTime, setDeliveryTime] = useState(''); // New delivery time state
  const [deliveryAddress, setDeliveryAddress] = useState('');
  
  const [deliveryLocation, setDeliveryLocation] = useState({ lat: '', lng: '' });
  const [weight, setWeight] = useState('');
  const [transportUnits, setTransportUnits] = useState('');
  const [unitType, setUnitType] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jwtToken = localStorage.getItem('token');
        const decoded = jwtDecode(jwtToken); // Decode token
        console.log(jwtToken)
        const userId = decoded.data.user.id; // Extract user ID from decoded token
        const response = await axios.get(`http://truckup.local/wp-json/wp/v2/users/${userId}?_fields=name,email,acf`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        const userData = response.data;
        console.log(userData);
        setCompanyName(userData.name || '');
        setContactPerson(userData.name || '');
        setEmail(userData.email || '');
        setPhoneNumber(userData.acf?.phoneNumber || '');
        setYTunnus(userData.acf?.['y-tunnus'] || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user data.');
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
        setDeliveryLocation(coords);
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

    let imageUrl = '';
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const shipmentData = {
      status: 'publish',
      name: companyName,
      type: 'simple',
      regular_price: price,
      description: details,
      weight: weight,
      short_description: details,
      meta_data: [
        { key: 'pickup_location', value: pickupLocation },
        { key: 'delivery_location', value: deliveryLocation },
        { key: 'pickup_date', value: pickupDate },
        { key: 'delivery_date', value: deliveryDate },
        { key: 'transport_units', value: transportUnits },
        { key: 'unit_type', value: unitType },
        { key: 'price', value: price },
        { key: 'y_tunnus', value: yTunnus }, // Added Y-tunnus
      ],
      images: imageUrl ? [{ src: imageUrl }] : [],
    };

    try {
      const jwtToken = localStorage.getItem('token');
      const response = await axios.post('http://truckup.local/wp-json/wc/v3/products', shipmentData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Ilmoitus julkaistu!');
        setActiveStep(0); // Reset steps
      } else {
        alert('Virhe.');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Virhe. ei toimi');
    }
  };

  const uploadImage = async (file) => {
    // Upload image
    let imageUrl = '';
    try {
      const formData = new FormData();
      formData.append('file', file);

      const jwtToken = localStorage.getItem('token');
      const response = await axios.post('http://truckup.local/wp-json/wp/v2/media', formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        imageUrl = response.data.source_url;
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
    return imageUrl;
  };

  const steps = ['Noutotiedot', 'Toimitustiedot', 'Kuljetustiedot'];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Yritys tai Nimesi"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Yhteyshenkilö"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />
            <input
              type="email"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Sähköposti"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Puhelinnumero"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Y-tunnus"
              value={yTunnus}
              onChange={(e) => setYTunnus(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Nouto Osoite"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
            />
            <input
              type="date"
              className="w-full p-2 mb-4 border rounded"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          <input
              type="time"
              className="w-full p-2 mb-4 border rounded"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              aria-label="Nouto Aika"
            />
          </>
        );
      case 1:
        return (
          <>
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Toimitus Osoite"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
            <input
              type="date"
              className="w-full p-2 mb-4 border rounded"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
            <input
              type="time"
              className="w-full p-2 mb-4 border rounded"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              aria-label="Toimitus Aika"
            />
          </>
        );
      case 2:
        return (
          <>
          <div className="flex items-center">
            <input
              type="number"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Paino (Kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <span className="ml-2 text-gray-500">kg</span>
          </div>

            <select
              className="w-full p-2 mb-4 border rounded"
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
              className="w-full p-2 mb-4 border rounded"
              placeholder="Kuljetettavat yksiköt"
              value={transportUnits}
              onChange={(e) => setTransportUnits(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Lisätietoa"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <input
              type="number"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Hinta"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="file"
              className="w-full p-2 mb-4 border rounded"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </>
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
          className="bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-lg border border-gray-300 flex flex-col p-6 rounded-lg shadow-md w-96"
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