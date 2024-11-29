import React from 'react';
import '../Styles/modal.modules.css';

const Modal = ({ children, onClose }) => {


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
