const OrderDetails = ({ selectedOrder, closeDetails , handleEditDetails, handleDeleteOrder}) => {


const fullDeliveryAddress = `${selectedOrder.delivery_address}, ${selectedOrder.delivery_postal_code} ${selectedOrder.delivery_city}`;
const fullPickUpAddress = `${selectedOrder.pickup_address}, ${selectedOrder.pickup_postal_code}, ${selectedOrder.pickup_city}`

console.log(fullDeliveryAddress);

    return (
      <div className="mt-4">
        <h3 className="text-xl font-bold text-gray-200">Toimitus tiedot</h3>
        <div className="bg-gray-800 w-2/3 m-auto p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><strong>Tilausnumero:</strong> {selectedOrder.shipment_identifier}</p>
            <p><strong>Eräpäivä:</strong> {selectedOrder.due_date ? new Date(selectedOrder.due_date).toLocaleDateString() : ''}</p>
            <p><strong>Toimitusosoite:</strong> {fullDeliveryAddress} </p>
            <p><strong>Nouto-osoite:</strong> {fullPickUpAddress} </p>

            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Asiakasnimi:</strong> {selectedOrder.sender_name}</p>
            <p><strong>Sähköposti:</strong> {selectedOrder.sender_email}</p>
          </div>

          <button
          onClick={() => handleSaveOrder(selectedOrder)}
          className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Tallenna PDF
        </button>

        <button
          onClick={() => handleSaveOrder(selectedOrder)}
          className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Lataa lasku
        </button>

        <button
          onClick={() => handleEditDetails(selectedOrder)}
          className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Muokkaa kuljetus
        </button>
        <button
    onClick={() => handleDeleteOrder(selectedOrder.id)}
    className="mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700"
>
    Poista
</button>
          <button onClick={closeDetails} className="mt-6 bg-red-600 text-white p-2 rounded hover:bg-red-700">
            Sulje
          </button>

        </div>
      </div>
    );
  };
  
  export default OrderDetails;