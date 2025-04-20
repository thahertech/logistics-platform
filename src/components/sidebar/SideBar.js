import React, { useReducer, useState, useEffect } from 'react';
import styles from '@/app/Styles/sideBar.module.css';
import { FaFilter } from 'react-icons/fa';
import { initialState, filterReducer } from '../filtering/filterReducer/filterReducer';

const FilterSidebar = ({ applyFilters, shipmentData }) => {
  const [filters, dispatch] = useReducer(filterReducer, initialState);
  const [isVisible, setIsVisible] = useState(true);
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const uniqueCities = Array.from(
      new Set(shipmentData.map((s) => s.pickup_city).filter(Boolean))
    );
    setCities(uniqueCities);
  }, [shipmentData]);

  useEffect(() => {
    const filtered = shipmentData.filter((s) => {
      const matchesPickupCity = selectedCity ? s.pickup_city === selectedCity : true;
      const matchesDeliveryCity = filters.delivery_city ? s.delivery_city === filters.delivery_city : true;
      
      return matchesPickupCity && matchesDeliveryCity;
    });
    applyFilters(filtered);
  }, [selectedCity, filters.delivery_city]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    dispatch({
      type: 'UPDATE_FILTER',
      field: 'agreement_type',
      value: checked
        ? [...filters.agreement_type, value]
        : filters.agreement_type.filter((type) => type !== value),
    });
  };

  const handleSubmit = () => {
    const filteredData = shipmentData.filter((shipment) => {
      return (
        (!filters.pickupLocation || shipment.pickup_address.includes(filters.pickupLocation)) &&
        (!filters.deliveryLocation || shipment.delivery_address.includes(filters.deliveryLocation)) &&
        (!filters.price || shipment.price <= filters.price) &&
        (filters.agreement_type.length === 0 || 
         filters.agreement_type.includes(shipment.agreement_type)) &&
        (!filters.delivery_city || shipment.delivery_city === filters.delivery_city) &&
        (!filters.pickup_city || shipment.pickup_city === filters.pickup_city)
      );
    });
    
    applyFilters(filteredData);
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
    setSelectedCity('');
    applyFilters(shipmentData);
  };

  const toggleSidebar = () => {
    setSidebarVisible(prevState => !prevState);
  };

  const agreementTypes = [
    "EXW", "FCA", "CPT", "CIP", "DAP", "DPU", "DDP", "FAS", "CIF"
  ];

  return (
    <div className={styles.wrapper}>
      <button onClick={toggleSidebar} className={styles.toggleButton}>
        {!isSidebarVisible && <FaFilter />}
        {isSidebarVisible ? 'X' : ''}
      </button>

      <div className={`${styles.sidebar} ${isSidebarVisible ? '' : 'closed'}`}>
        <div className={styles.buttonGroup}>
          <button onClick={handleSubmit}>Suodata</button>
          <button onClick={resetFilters}>Tyhjennä</button>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Noutokaupunki</label>
          <select
            className={styles.select}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Kaikki kaupungit</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Toimituskaupunki</label>
          <select
            className={styles.select}
            value={filters.delivery_city || ''}
            onChange={(e) => {
              dispatch({
                type: 'UPDATE_FILTER',
                field: 'delivery_city',
                value: e.target.value,
              });
            }}
          >
            <option value="">Kaikki kaupungit</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Incotermit</label>
          {agreementTypes.map((term) => (
            <label key={term}>
              <input
                type="checkbox"
                name="agreement_type"
                value={term}
                checked={filters.agreement_type?.includes(term) || false}
                onChange={handleCheckboxChange}
              />
              {term}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;