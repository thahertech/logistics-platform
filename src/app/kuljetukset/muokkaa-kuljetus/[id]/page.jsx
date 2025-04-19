// 'use client';
// import React, { useState, useEffect } from 'react';
// import dayjs from 'dayjs';
// import Layout from '@/components/Layout/Layout';
// import { supabase } from '@/supabaseClient';
// import { useRouter } from 'next/navigation';
// import { v4 as uuidv4 } from 'uuid';
// import { toast } from 'react-toastify';
// import { renderStepContent } from "@/components/forms/shipment-steps/renderStepContent";
// import { useShipmentForm } from '@/lib/hooks/useShipmentForm';
// import { steps } from 'src/components/forms/shipmentForm';
// import '@/app/globals.css';

// const EditShipment = ({ shipmentData }) => {
//   const {
//     form,
//     handleChange,
//     handleNext,
//     handleBack,
//     handleSaveDraft,
//     activeStep,
//   } = useShipmentForm();

//   const [shipmentIdentifier, setShipmentIdentifier] = useState('');
//   const [userID, setUserID] = useState('');

//   const router = useRouter();

//   useEffect(() => {
//     if (shipmentData) {
//       form.sender = shipmentData.sender;
//       form.sender.address = shipmentData.sender_address;
//       form.recipient = shipmentData.recipient;
//       form.recipient.address = shipmentData.recipient_address;
//       form.pickup.address = shipmentData.pickup.address;
//       form.delivery = shipmentData.delivery;
//       form.shipment.weight = shipmentData.weight;
//       form.shipment.transportUnits = shipmentData.transport_units;
//       form.shipment.price = shipmentData.price;
//       form.shipment.details = shipmentData.details;
//       form.shipment.incoTerms = shipmentData.agreement_type;
//     } else {
//       const today = new Date();
//       const formattedDate = today.toISOString().split('T')[0];
//       form.pickup.date = formattedDate;
//     }
//   }, [shipmentData, form]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const pickupTimestamp = `${form.pickupDate} ${form.pickupTime}:00`;
//     const deliveryTimestamp = `${form.deliveryDate} ${form.deliveryTime}:00`;

//     const validPickupTimestamp = dayjs(pickupTimestamp, 'YYYY-MM-DD HH:mm:ss').isValid()
//       ? pickupTimestamp
//       : null;
//     const validDeliveryTimestamp = dayjs(deliveryTimestamp, 'YYYY-MM-DD HH:mm:ss').isValid()
//       ? deliveryTimestamp
//       : null;

//     const generatedShipmentId = uuidv4();
//     setShipmentIdentifier(generatedShipmentId);

//     const shipmentData = {
//       user_id: userID,
//       shipment_identifier: generatedShipmentId,
//       sender_name: form.sender.name,
//       sender_email: form.sender.email,
//       sender_address: form.sender.address,
//       sender_postal_code: form.sender.postal_code,
//       sender_city: form.sender.city,
//       sender_phone: form.sender.phone,
//       recipient_name: form.recipient.name,
//       recipient_address: form.recipient.address,
//       recipient_postal_code: form.recipient.postal_code,
//       recipient_city: form.recipient.city,
//       recipient_email: form.recipient.email,
//       recipient_phone: form.recipient.phone,
//       pickup_address: form.pickup.address,
//       pickup_postal_code: form.pickup.postal_code,
//       pickup_city: form.pickup.city,
//       pickup_date: form.pickupDate,
//       pickup_time: validPickupTimestamp,
//       pickup_latitude: form.pickup.latitude,
//       pickup_longitude: form.pickup.longitude,
//       delivery_address: form.delivery.address,
//       delivery_postal_code: form.delivery.postal_code,
//       delivery_city: form.delivery.city,
//       delivery_date: form.delivery.date,
//       delivery_time: validDeliveryTimestamp,
//       delivery_latitude: form.delivery.latitude,
//       delivery_longitude: form.delivery.longitude,
//       weight: form.shipment.weight,
//       transport_units: form.shipment.transportUnits,
//       status: 'pending',
//       price: form.shipment.price,
//       details: form.shipment.details,
//       amount: form.shipment.price * 0.9,
//       agreement_type: form.shipment.incoTerms,
//     };

//     const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

//     if (sessionError) {
//       console.error(sessionError);
//       toast.error(`Session error: ${sessionError.message}`);
//       return;
//     }

//     const accessToken = sessionData.session.access_token;

//     try {
//       const response = await fetch('https://ccjggzpkomwjzwrawmyr.supabase.co/functions/v1/new-shipment-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(shipmentData),
//       });

//       const edgeFunctionResponse = await response.json();

//       if (edgeFunctionResponse?.message) {
//         toast.success('Ilmoitus julkaistu!');
//       }
//     } catch (error) {
//       toast.error(`Error inserting shipment data: ${error?.message || 'Unknown error'}`);
//     }
//   };

//   useEffect(() => {
//       document.title = 'Logistix | Muokkaa ilmoitus';
//     }, []);

//   return (
//     <Layout>
//       <div className="flex flex-col items-center justify-center h-screen bg-black-800">
//         <h2 className="text-lg font-bold mb-4 text-white">Muokkaa Lähetystä</h2>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-lg border border-gray-300 flex flex-col p-6 rounded-lg shadow-md w-2/4"
//         >
//           <div className="mb-4 flex justify-between items-center">
//             {steps.map((label, index) => (
//               <div key={label} className="text-center flex flex-col items-center">
//                 <div
//                   className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-bold 
//                   ${activeStep >= index ? 'bg-blue-500' : 'bg-gray-400'}`}
//                 >
//                   {index + 1}
//                 </div>
//                 <span className={`text-xs mt-2 ${activeStep >= index ? 'text-blue-500' : 'text-gray-300'}`}>
//                   {label}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <div className="mb-6">
//             {renderStepContent({
//               step: activeStep,
//               form,
//               handleChange,
//             })}
//           </div>

//           <div className="flex justify-between">
//             <button
//               type="button"
//               onClick={handleBack}
//               disabled={activeStep === 0}
//               className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
//             >
//               Takaisin
//             </button>
//             <div className="flex gap-4">
//               <button
//                 type="button"
//                 onClick={handleSaveDraft}
//                 className="bg-yellow-600 text-white px-4 py-2 rounded"
//               >
//                 Tallenna luonnos
//               </button>
//               {activeStep < steps.length - 1 ? (
//                 <button
//                   type="button"
//                   onClick={handleNext}
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Seuraava
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="bg-green-600 text-white px-4 py-2 rounded"
//                 >
//                   Lähetä
//                 </button>
//               )}
//             </div>
//           </div>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default EditShipment;