import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Layout from '../app/dashboard/Layout';
import '../app/globals.css';


const CreateShipment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [companyName, setCompanyName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupDate, setPickupDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [deliveryDate, setDeliveryDate] = useState('');
  const [truckRequirements, setTruckRequirements] = useState('');
  const [weight, setWeight] = useState('');
  const [transportUnits, setTransportUnits] = useState('');
  const [details, setDetails] = useState('');
  const [price, setPrice] = useState('');
  const [deleteAfter, setDeleteAfter] = useState('48h');

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (activeStep === 2) {
        const fullAddress = `${street}, ${city}, ${postalCode}`;
        let lat, lng;
    
        try {
          const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
              q: fullAddress,
              format: 'json',
              limit: 1,
            },
          });
    
          if (response.data.length > 0) {
            lat = response.data[0].lat;
            lng = response.data[0].lon;
          } else {
            alert('Could not find coordinates for the address.');
            return;
          }
        } catch (error) {
          console.error('Error fetching coordinates:', error);
          alert('Failed to fetch coordinates for the address.');
          return;
        }
    
        const jwtToken = localStorage.getItem('jwtToken');
    
        try {
          const shipmentData = {
            // Ensure these keys match your ACF field names
            nimi: companyName, // Add this field
            sijainti: {
              lat: lat, // Assuming you want to send lat/lng to the Google Map field
              lng: lng,
            },
            nouto: pickupDate,
            toimitus: deliveryDate,
            paino: weight,
            // Add any other fields needed
            kuljetettavatYksiköt: transportUnits,
            details,
            price,
          };
    
          const response = await axios.post('http://truckup.local/wp-json/wp/v2/kuljetus', shipmentData, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              'Content-Type': 'application/json',
            },
          });
    
          if (response.status === 201) {
            alert('Shipment created successfully!');
            setActiveStep(0); // Reset the form on successful submission
          } else {
            alert('Failed to create shipment');
          }
        } catch (error) {
          console.error('Error creating shipment:', error);
          alert('Failed to create shipment');
        }
      }
    };
    
  

  const steps = ['Noutotiedot', 'Kuljetustiedot', 'Toimitustiedot'];

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
              placeholder="Katuosoite"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Kaupunki"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Postinumero"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </>
        );
      case 1:
        return (
          <>
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Toimitusosoite"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <input
              type="date"
              className="w-full p-2 mb-4 border rounded"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
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
              type="text"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Kuljetuksen tiedot"
              value={truckRequirements}
              onChange={(e) => setTruckRequirements(e.target.value)}
            />
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
              type="number"
              className="w-full p-2 mb-4 border rounded"
              placeholder="Hinta"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              className="w-full p-2 mb-4 border rounded"
              placeholder="Lisätiedot"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <select
              className="w-full p-2 mb-4 border rounded"
              value={deleteAfter}
              onChange={(e) => setDeleteAfter(e.target.value)}
            >
              <option value="48h">48 Hours</option>
              <option value="72h">72 Hours</option>
              <option value="1w">1 Week</option>
              <option value="2w">2 Weeks</option>
            </select>
          </>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-black-800">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-lg border border-gray-300 flex flex-col p-6 rounded-lg shadow-md w-96"
        >
          <h2 className="text-lg font-bold mb-4 text-white">Kuljetustilaus</h2>
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