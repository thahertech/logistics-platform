const OrdersContent = ({ orders, handleViewDetails }) => {
    return (
      <div>
        <h3 className="text-lg font-bold mb-4">Omat tilaukset</h3>
        {orders.length > 0 ? (
          <table className="w-full table-auto text-sm text-center ">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-3">Tilausnumero</th>
                <th className="px-4 py-3">Eräpäivä</th>
                <th className="px-4 py-3">Päivämäärä</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Arvio</th>
                <th className="px-4 py-3">Muokkaa</th>
                <th className="px-4 py-3">Hinta</th>
                <th className="px-4 py-3">Maksutilanne</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="bg-black hover:bg-gray-600 transition duration-200 divide-x">
                  <td className="px-4 py-3">{order.shipment_id}</td>
                  <td className="px-4 py-3">{new Date(order.due_date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{new Date(order.purchase_date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{order.status}</td>
                  <td className="px-4 py-3">{order.rating ? 'Reviewed' : 'Not reviewed'}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleViewDetails(order)} className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
                      Näytä tiedot
                    </button>
                  </td>
                  <td className="px-4 py-3">{order.total_price} Eur.</td>
                  <td className="px-4 py-3">{order.payment_status}</td>
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