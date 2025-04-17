const OrdersContent = ({ orders, handleViewDetails, userRole }) => {
  const title = userRole === 'kuljettaja' ? 'Kuljetukset' : 'Tilauspyynnöt';

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      {orders.length > 0 ? (
        <table className="w-full table-auto text-sm text-center">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3">Määränpää</th>
              <th className="px-4 py-3">Nouto</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Muokkaa</th>
              <th className="px-4 py-3">Hinta</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="bg-[rgba(0,0,0,0.37)] hover:bg-gray-600 transition duration-200 divide-x"
              >
                <td className="px-4 py-3">
                {order.delivery_address ? order.delivery_address : '-'}                </td>
                <td className="px-4 py-3">
                {order.pickup_date != null ? new Date(order.pickup_date).toLocaleDateString('fi-FI') : '-'}
                    </td>
                    <td className="px-4 py-3">
                    {order.status === 'draft' ? 'Luonnos' : order.status === 'available' ? 'Julkaistu' : '-'}
                  </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-1"
                  >
                    Näytä tiedot
                  </button>
                </td>
                <td className="px-4 py-3">
                  {order.price != null ? `${order.price} EUR` : '—'}
                </td>    
          </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-400">Ei tilauksia.</p>
      )}
    </div>
  );
};

export default OrdersContent;