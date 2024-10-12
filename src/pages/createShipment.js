import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Layout from '../app/dashboard/Layout';
import '../app/globals.css';

const CreateShipment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [companyName, setCompanyName] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupLocation, setPickupLocation] = useState({ lat: '', lng: '' });
  const [pickupDate, setPickupDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState({ lat: '', lng: '' });
  const [weight, setWeight] = useState('');
  const [transportUnits, setTransportUnits] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState(null);
  const getCoordinates = async (address) => {
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
        {
          key: 'pickup_location',
          value: pickupLocation,
        },
        {
          key: 'delivery_location',
          value: deliveryLocation,
        },
        {
          key: 'pickup_date',
          value: pickupDate,
        },
        {
          key: 'delivery_date',
          value: deliveryDate,
        },
        {
          key: 'transport_units',
          value: transportUnits,
        },
        {
          key: 'price',
          value: price,
        },
      ],
      images: imageUrl ? [{ src: imageUrl }] : [], // Add image URL to product data
    };
  
    console.log('Product Data:', shipmentData);
  
    try {
      let jwtToken = null;
      if (typeof window !== "undefined") {
        jwtToken = localStorage.getItem('token');
      }
  
      const response = await axios.post('http://truckup.local/wp-json/wc/v3/products', shipmentData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        alert('Ilmoitus julkaistu!');
        console.log('API Response:', response.data);
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
    let imageUrl = '';
    try {
      const formData = new FormData();
      formData.append('file', file);

      let jwtToken = localStorage.getItem('token');

      // Upload image to WordPress
      const response = await axios.post('http://truckup.local/wp-json/wp/v2/media', formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        imageUrl = response.data.source_url; // Get image URL from response
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
          </>
        );
      case 2:
        return (
          <>
            <input
              type="number"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Paino (Kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
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
              onChange={(e) => setImage(e.target.files[0])} // Store the selected file
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
            >
              Takaisin
            </button>
            {activeStep === steps.length - 1 ? (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Julkaise
              </button>
            ) : (
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleNext}
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
