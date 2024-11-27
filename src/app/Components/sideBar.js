import React, { useState } from 'react';
import styles from '../Styles/sideBar.module.css';
import '@/app/globals.css';
import SideBarcomponent from './filterSideBar';

const FilterSidebar = ({ applyFilters }) => {
  const [filters, setFilters] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    price: '',
    date: 'now',
    transportType: [],
    time: 'now',
    specificTime: '',
    distance: '',
    weight: '',
    vehicleCondition: '',
    paymentOptions: '',
    deliverySpeed: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFilters({ ...filters, transportType: [...filters.transportType, value] });
    } else {
      setFilters({
        ...filters,
        transportType: filters.transportType.filter((type) => type !== value),
      });
    }
  };

  const handleSubmit = () => {
    // For "Today" and "Tomorrow", you could add date manipulation logic
    if (filters.time === 'today') {
      filters.specificTime = new Date().toISOString().split('T')[1]; // Set current time
    } else if (filters.time === 'tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      filters.specificTime = tomorrow.toISOString().split('T')[1]; // Set tomorrow's time
    } else if (filters.time === 'nextWeek') {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      filters.specificTime = nextWeek.toISOString().split('T')[1]; // Set next week's time
    }
  
    applyFilters(filters);
  };
  

  const resetFilters = () => {
    setFilters({
      pickupLocation: '',
      deliveryLocation: '',
      price: '',
      date: 'now',
      transportType: [],
      time: 'now',
      specificTime: '',
      distance: '',
      weight: '',
      vehicleCondition: '',
      paymentOptions: '',
      deliverySpeed: '',
    });
    applyFilters({
      pickupLocation: '',
      deliveryLocation: '',
      price: '',
      date: 'now',
      transportType: [],
      time: 'now',
      specificTime: '',
      distance: '',
      weight: '',
      vehicleCondition: '',
      paymentOptions: '',
      deliverySpeed: '',
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const address = await reverseGeocode(latitude, longitude);
            setFilters({ ...filters, pickupLocation: address, deliveryLocation: address });
          } catch (error) {
            console.error('Error fetching address:', error);
            alert('Could not retrieve location. Please try again later.');
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to retrieve your location. Please enable location services.');
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };


  const reverseGeocode = async (lat, lon) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.display_name || 'Unknown Location';
  };


  return (
    <div className={styles.sidebar}>
    <SideBarcomponent/>
      <div className={styles.filterGroup}>
        <label htmlFor="pickupLocation">Nouto Sijainti</label>
        <input
          type="text"
          name="pickupLocation"
          value={filters.pickupLocation}
          onChange={handleInputChange}
          placeholder="Helsinki"
        />
        <button type="button" onClick={getCurrentLocation}>
          Käytä nykyistä sijaintia
        </button>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="deliveryLocation">Toimitus Sijainti</label>
        <input
          type="text"
          name="deliveryLocation"
          value={filters.deliveryLocation}
          onChange={handleInputChange}
          placeholder="Tampere"
        />
        <button type="button" onClick={getCurrentLocation}>
          Käytä nykyistä sijaintia
        </button>
      </div>


      <div className={styles.filterGroup}>
  <label htmlFor="price">Hinta</label>
  <div className={styles.sliderContainer}>
    <input
      type="range"
      min="0"
      max="5000"
      step="10"
      value={filters.priceMin}
      onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
    />
    <input
      type="range"
      min="0"
      max="5000"
      step="10"
      value={filters.priceMax}
      onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
    />
    <div className={styles.priceDisplay}>
      <span>{filters.priceMin} € - {filters.priceMax} €</span>
    </div>
  </div>
</div>


      <div className={styles.filterGroup}>
        <label htmlFor="distance">Etäisyys</label>
        <select name="distance" value={filters.distance} onChange={handleInputChange}>
          <option value="">Valitse etäisyys</option>
          <option value="50">50 km</option>
          <option value="100">100 km</option>
          <option value="200">200 km</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
  <label htmlFor="weight">Painokapasiteetti (kg)</label>
  <div className={styles.sliderContainer}>
    <input
      type="range"
      min="0"
      max="1000"
      step="1"
      value={filters.weightMin}
      onChange={(e) => setFilters({ ...filters, weightMin: e.target.value })}
    />
    <input
      type="range"
      min="0"
      max="1000"
      step="1"
      value={filters.weightMax}
      onChange={(e) => setFilters({ ...filters, weightMax: e.target.value })}
    />
    <div className={styles.weightDisplay}>
      <span>{filters.weightMin} kg - {filters.weightMax} kg</span>
    </div>
  </div>
</div>


      {/* <div className={styles.filterGroup}>
        <label htmlFor="vehicleCondition">Ajoneuvon kunto</label>
        <select name="vehicleCondition" value={filters.vehicleCondition} onChange={handleInputChange}>
          <option value="">Kaikki</option>
          <option value="new">Uusi</option>
          <option value="used">Käytetty</option>
        </select>
      </div> */}

      {/* <div className={styles.filterGroup}>
        <label htmlFor="paymentOptions">Maksuvaihtoehdot</label>
        <select name="paymentOptions" value={filters.paymentOptions} onChange={handleInputChange}>
          <option value="">Kaikki</option>
          <option value="creditCard">Luottokortti</option>
          <option value="cashOnDelivery">Käteinen toimituksessa</option>
        </select>
      </div> */}

      <div className={styles.filterGroup}>
        <label htmlFor="deliverySpeed">Toimitusnopeus</label>
        <select name="deliverySpeed" value={filters.deliverySpeed} onChange={handleInputChange}>
          <option value="">Kaikki</option>
          <option value="standard">Standardi</option>
          <option value="express">Express</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
  <label htmlFor="time">Aikataulu</label>
  <select name="time" value={filters.time} onChange={handleInputChange}>
    <option value="asap">ASAP</option>
    <option value="today">Tänään</option>
    <option value="tomorrow">Huomenna</option>
    <option value="nextWeek">Ensi viikolla</option>
    <option value="specific">Määrätty aika</option>
  </select>
  {filters.time === 'specific' && (
    <input
      type="time"
      name="specificTime"
      value={filters.specificTime}
      onChange={handleInputChange}
    />
  )}
</div>


      <div className={styles.buttonGroup}>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Suodata
        </button>
        <button
          onClick={resetFilters}
          className="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Nollaa
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
