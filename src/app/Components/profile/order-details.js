const OrderDetails = ({ selectedOrder, closeDetails }) => {
    return (
      <div className="mt-4">
        <h3 className="text-xl font-bold text-gray-200">Toimitus tiedot</h3>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><strong>Tilausnumero:</strong> {selectedOrder.shipment_id}</p>
            <p><strong>Eräpäivä:</strong> {new Date(selectedOrder.due_date).toLocaleDateString()}</p>
            <p><strong>Toimitusosoite:</strong> {selectedOrder.customer_address}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Asiakasnimi:</strong> {selectedOrder.customer_name}</p>
            <p><strong>Sähköposti:</strong> {selectedOrder.user_email}</p>
          </div>
          <button onClick={closeDetails} className="mt-6 bg-red-600 text-white p-2 rounded hover:bg-red-700">
            Sulje
          </button>
        </div>
      </div>
    );
  };
  
  export default OrderDetails;