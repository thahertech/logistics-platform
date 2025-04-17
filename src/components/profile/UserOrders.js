// import React from 'react';

// const UserOrders = ({ orders, ratings, setSelectedOrder }) => (
//     <div>
//         <h3 className="text-lg font-bold mb-4">Omat tilaukset</h3>
//         {orders.length > 0 ? (
//             <table className="w-full border-collapse">
//                 <thead>
//                     <tr className="bg-gray-900 text-white">
//                         <th className="border px-4 py-2">Tilausnumero</th>
//                         <th className="border px-4 py-2">Lähettäjä</th>
//                         <th className="border px-4 py-2">Vastaanottaja</th>
//                         <th className="border px-4 py-2">Päivämäärä</th>
//                         <th className="border px-4 py-2">Paino (kg)</th>
//                         <th className="border px-4 py-2">Hinta (€)</th>
//                         <th className="border px-4 py-2">Status</th>
//                         <th className="border px-4 py-2">Arvio</th>
//                         <th className="border px-4 py-2">Toiminto</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orders.map((order) => (
//                         <tr key={order.id} className="text-white">
//                             <td className="border px-4 py-2">{order.shipment_id}</td>
//                             <td className="border px-4 py-2">{order.sender_name}</td>
//                             <td className="border px-4 py-2">{order.recipient_name}</td>
//                             <td className="border px-4 py-2">
//                                 {new Date(order.purchase_date).toLocaleDateString()}
//                             </td>
//                             <td className="border px-4 py-2">{order.weight}</td>
//                             <td className="border px-4 py-2">{order.price}</td>
//                             <td className="border px-4 py-2">{order.status}</td>
//                             <td className="border px-4 py-2">
//                                 {ratings.some((rating) => rating.shipment_id === order.shipment_id)
//                                     ? 'Arvosteltu'
//                                     : 'Ei arvioitu'}
//                             </td>
//                             <td className="border px-4 py-2 flex space-x-2">
//                                 {order.status === 'Completed' &&
//                                     !ratings.some((rating) => rating.shipment_id === order.shipment_id) && (
//                                         <button
//                                             onClick={() => setSelectedOrder(order)}
//                                             className="bg-blue-600 text-white p-2 rounded"
//                                         >
//                                             Arvostele
//                                         </button>
//                                     )}
//                                 <button
//                                     onClick={() => console.log('View Details', order.id)}
//                                     className="bg-gray-600 text-white p-2 rounded"
//                                 >
//                                     Näytä tiedot
//                                 </button>
//                                 {order.status !== 'Completed' && (
//                                     <button
//                                         onClick={() => console.log('Cancel Order', order.id)}
//                                         className="bg-red-600 text-white p-2 rounded"
//                                     >
//                                         Peruuta
//                                     </button>
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         ) : (
//             <p className="text-center">Ei tilauksia.</p>
//         )}
//     </div>
// );

// export default UserOrders;