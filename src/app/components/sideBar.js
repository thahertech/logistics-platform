import React, { useState } from 'react';
import styles from '../Styles/sideBar.module.css';

const FilterSidebar = ({ applyFilters }) => {
  const [filters, setFilters] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    price: '',
    date: 'now',
    transportType: []
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
        transportType: filters.transportType.filter((type) => type !== value)
      });
    }
  };

  const handleSubmit = () => {
    applyFilters(filters);
  };

  return (
    <div className={styles.sidebar}>

      {/* Nouto sijainti */}
      <div className={styles.filterGroup}>
        <label htmlFor="pickupLocation">Nouto Sijainti</label>
        <input
          type="text"
          name="pickupLocation"
          value={filters.pickupLocation}
          onChange={handleInputChange}
          placeholder="Helsinki"
        />
      </div>

      {/* Toimitus sijainti */}
      <div className={styles.filterGroup}>
        <label htmlFor="deliveryLocation">Toimitus Sijainti</label>
        <input
          type="text"
          name="deliveryLocation"
          value={filters.deliveryLocation}
          onChange={handleInputChange}
          placeholder="Tampere"
        />
      </div>

      {/* Hinta */}
      <div className={styles.filterGroup}>
        <label htmlFor="price">Hinta</label>
        <input
          type="number"
          name="price"
          value={filters.price}
          onChange={handleInputChange}
          placeholder="Hinta"
        />
      </div>

      {/* Päivämäärä */}
      <div className={styles.filterGroup}>
        <label htmlFor="date">Päivämäärä</label>
        <select name="date" value={filters.date} onChange={handleInputChange}>
          <option value="now">Nyt</option>
          <option value="tomorrow">Huomenna</option>
          <option value="nextWeek">Ensi viikko</option>
        </select>
      </div>

      {/* Kuljetustyyppi */}
      <div className={styles.filterGroup}>
        <label>Kuljetustyyppi</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="kylmä"
              checked={filters.transportType.includes('kylmä')}
              onChange={handleCheckboxChange}
            />
            Kylmä
          </label>
          <label>
            <input
              type="checkbox"
              value="arvo"
              checked={filters.transportType.includes('arvo')}
              onChange={handleCheckboxChange}
            />
            Arvo
          </label>
          <label>
            <input
              type="checkbox"
              value="kaasu"
              checked={filters.transportType.includes('kaasu')}
              onChange={handleCheckboxChange}
            />
            Kaasu
          </label>
        </div>
      </div>

      <button className={styles.submitbutton}
      onClick={handleSubmit}>Suodata</button>
    </div>
  );
};

export default FilterSidebar;
