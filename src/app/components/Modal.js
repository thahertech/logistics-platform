import React from 'react';

const Modal = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg max-w-sm w-full">
        <button onClick={onClose} className="text-red-500 float-right">X</button>
        {product && (
          <>
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            {product.images.length > 0 && (
              <img src={product.images[0]?.src} alt={product.name} className="w-full h-auto mb-2" />
            )}
            <p><strong>Price:</strong> {product.price} €</p>
            <p><strong>Toimituspvm:</strong> {product.acf?.toimituspvm || 'N/A'}</p>
            <p><strong>Noutopvm:</strong> {product.acf?.noutopvm || 'N/A'}</p>
            <p><strong>Paino:</strong> {product.acf?.paino || 'N/A'} kg</p>
            <p>{product.tags['slug']}</p>
            <div 
              className="mt-2" 
              dangerouslySetInnerHTML={{ __html: product.description }} 
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
