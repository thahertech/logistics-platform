import React, { useReducer, useState } from 'react';
import styles from '@/app/Styles/sideBar.module.css';
import { FaFilter } from 'react-icons/fa';
import { initialState, filterReducer } from '../filtering/filterReducer/filterReducer';

const FilterSidebar = ({ applyFilters, shipmentData }) => {
  const [filters, dispatch] = useReducer(filterReducer, initialState);
  const [isVisible, setIsVisible] = useState(true);

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
    const filtersToApply = { ...filters };

    console.log(filters);  

    const filteredData = shipmentData.filter((shipment) => {
      return (
        (!filtersToApply.pickupLocation || shipment.pickup_address.includes(filtersToApply.pickupLocation)) &&
        (!filtersToApply.deliveryLocation || shipment.delivery_address.includes(filtersToApply.deliveryLocation)) &&
        (!filtersToApply.price || shipment.price <= filtersToApply.price) &&
        (filtersToApply.agreement_type.length === 0 || 
         filtersToApply.agreement_type.includes(shipment.agreement_type))
      );
    });

    console.log(filteredData);

    applyFilters(filteredData);
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
    applyFilters(shipmentData);
  };

  const toggleSidebar = () => setIsVisible(!isVisible);

  const agreementTypes = [
    "EXW",
    "FCA",
    "CPT",
    "CIP",
    "DAP",
    "DPU",
    "DDP",
    "FAS",
    "CIF"
  ];

  return (
    <div className={styles.wrapper}>

      <button onClick={toggleSidebar} className={styles.toggleButton}>
        {!isVisible && <FaFilter width={16} height={15} color="#fff" />}
        {isVisible ? 'X' : ''}
      </button>

      {isVisible && (
        <div className={styles.sidebar}>
          <div className={styles.buttonGroup}>
            <button onClick={handleSubmit}> Suodata</button>
            <button onClick={resetFilters}>Tyhjennä</button>
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
      )}
    </div>
  );
};

export default FilterSidebar;