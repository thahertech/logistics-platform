import React, { useEffect } from 'react';
import '@/app/Styles/modal.modules.css';

const Modal = ({ children, onClose }) => {

  const handleClickOutside = (event) => {
    if (event.target.classList.contains('overlay')) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <div className="overlay">
      <div className="modal">
        {children}
      </div>
    </div>
  );
};

export default Modal;