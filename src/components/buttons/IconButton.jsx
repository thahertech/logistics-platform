import React from 'react';
import { FaPaperPlane } from 'react-icons/fa'; 

const SubmitShipmentButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      style={{
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 15px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
      }}
    >
      <FaPaperPlane style={{ marginRight: '8px' }} /> 
      Tarkista julkaisu
    </button>
  );
};

export default SubmitShipmentButton;