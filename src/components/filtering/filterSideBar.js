import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('../maps/mapComponent'), { ssr: false });

const SideBarcomponent = ({ applyFilters }) => {
  return (
    <div className="filter-sidebar">
       <MapComponent applyFilters={applyFilters} />
    </div>
  );
};

export default SideBarcomponent;
