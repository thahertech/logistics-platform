// import React from 'react';

// const Step3Form = ({
//   weight,
//   setWeight,
//   unitType,
//   setUnitType,
//   transportUnits,
//   setTransportUnits,
//   details,
//   setDetails,
//   price,
//   setPrice,
//   image,
//   setImage
// }) => {
//   return (
//     <div>
//       <div className="flex items-center">
//         <input
//           type="number"
//           className="w-full p-2 mb-4 border rounded"
//           placeholder="Paino (Kg)"
//           value={weight}
//           onChange={(e) => setWeight(e.target.value)}
//         />
//         <span className="ml-2 text-gray-500">kg</span>
//       </div>

//       <select
//         className="w-full p-2 mb-4 border rounded"
//         value={unitType}
//         onChange={(e) => setUnitType(e.target.value)}
//       >
//         <option value="">Valitse yksikkö tyyppi</option>
//         <option value="Kolli">Kolli</option>
//         <option value="Eurolava">Eurolava</option>
//         <option value="Lava">Lava</option>
//         <option value="Kärry">Kärry</option>
//         <option value="Kontti">Kontti</option>
//         <option value="Rullakko">Rullakko</option>
//         <option value="Pikkukontti">Pikkukontti</option>
//         <option value="Lava-auto">Lava-auto</option>
//         <option value="Bulk">Bulk</option>
//         <option value="Raskas kuorma">Raskas kuorma</option>
//       </select>
//       <input
//         type="text"
//         className="w-full p-2 mb-4 border rounded"
//         placeholder="Kuljetettavat yksiköt"
//         value={transportUnits}
//         onChange={(e) => setTransportUnits(e.target.value)}
//       />
//       <input
//         type="text"
//         className="w-full p-2 mb-4 border rounded"
//         placeholder="Lisätietoa"
//         value={details}
//         onChange={(e) => setDetails(e.target.value)}
//       />
//       <input
//         type="number"
//         className="w-full p-2 mb-4 border rounded"
//         placeholder="Hinta"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//       />
//       <input
//         type="file"
//         className="w-full p-2 mb-4 border rounded"
//         accept="image/*"
//         onChange={(e) => setImage(e.target.files[0])}
//       />
//     </div>
//   );
// };

// export default Step3Form;
