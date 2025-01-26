const OrderDetails = ({ selectedOrder, closeDetails, handleSaveOrder }) => {
  console.log(selectedOrder,'sädf');
  // Parse the 'items' string into a JavaScript object
const items = JSON.parse(selectedOrder.items);

// Access the delivery address fields
const fullDeliveryAddress = `${items.delivery_address}, ${items.delivery_postal_code} ${items.delivery_city}`;
const fullPickUpAddress = `${items.pickup_address}, ${items.pickup_postal_code}, ${items.pickup_city}`

// Display the address (for example, in the console)
console.log(fullDeliveryAddress);  // Ou
    return (
      <div className="mt-4">
        <h3 className="text-xl font-bold text-gray-200">Toimitus tiedot</h3>
        <div className="bg-gray-800 w-2/3 m-auto p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><strong>Tilausnumero:</strong> {selectedOrder.shipment_id}</p>
            <p><strong>Eräpäivä:</strong> {new Date(selectedOrder.due_date).toLocaleDateString()}</p>
            <p><strong>Toimitusosoite:</strong> {fullDeliveryAddress} </p>
            <p><strong>Nouto-osoite:</strong> {fullPickUpAddress} </p>

            <p><strong>Viitenumero:</strong> {selectedOrder.reference_number}</p>

            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Asiakasnimi:</strong> {selectedOrder.customer_name}</p>
            <p><strong>Sähköposti:</strong> {selectedOrder.user_email}</p>
          </div>

          <button
          onClick={() => handleSaveOrder(selectedOrder)}  // Call the function when clicked
          className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Tallenna PDF
        </button>
          <button onClick={closeDetails} className="mt-6 bg-red-600 text-white p-2 rounded hover:bg-red-700">
            Sulje
          </button>
        </div>
      </div>
    );
  };
  
  export default OrderDetails;