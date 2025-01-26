import React, { useEffect } from 'react';
import '../../Styles/modal.modules.css';

const Modal = ({ children, onClose }) => {

  // Close the modal if clicking outside of it
  const handleClickOutside = (event) => {
    if (event.target.classList.contains('overlay')) {
      onClose(); // Close modal when clicking outside the modal area
    }
  };

  useEffect(() => {
    // Adding event listener when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="overlay">
      <div className="modal">
        <button onClick={onClose} className="modal-close-btn">X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;