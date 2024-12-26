import React, { useEffect } from 'react';

const CustomAlert = ({ message }) => {
  useEffect(() => {
    if (!message) return;

    const alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert');
    alertBox.innerText = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.classList.add('show');
    }, 10);

    setTimeout(() => {
      alertBox.classList.remove('show');

      setTimeout(() => {
        alertBox.remove();
      }, 500);
    }, 3000);

    return () => {
      alertBox.remove();
    };
  }, [message]);

  return null;
};

export default CustomAlert;