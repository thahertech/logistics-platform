import React from 'react';

const Modal = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

    const deliveryDateMeta = product.meta_data.find(meta => meta.key === 'delivery_date');
    const deliveryDate = deliveryDateMeta ? deliveryDateMeta.value : 'ei saatavilla'

    const pickupDateMeta = product.meta_data.find(meta => meta.key === 'pickup_date');
    const pickupDate = pickupDateMeta ? pickupDateMeta.value : 'ei saatavilla'

    const transport_UnitsMeta = product.meta_data.find(meta => meta.key === 'transport_units');
    const transport_units = transport_UnitsMeta ? transport_UnitsMeta.value : 'ei saatavilla'
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg max-w-sm w-full">
        <button onClick={onClose} className="text-red-500 float-right">X</button>
        {product && (
          <>
          <h2 className="text-gray-600 mb-1"><strong>Toimitus: </strong> {deliveryDate}</h2>
          {product.images.length > 0 && (
              <img src={product.images[0]?.src} alt={product.name} className="w-full h-auto mb-2" />
            )}
            <p><strong></strong>Hinta: {product.price} €</p>
            <p><strong>Nouto:</strong> {pickupDate}</p>
            <p><strong>Määrä:</strong> {transport_units}</p>

            <p><strong></strong> {product.weight || 'N/A'} kg</p>
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
