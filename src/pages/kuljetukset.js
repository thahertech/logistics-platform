// import React, { useState, useEffect, useCallback } from 'react';
// import Layout from '../app/Dashboard/Layout';
// import '../app/globals.css';
// import '../app/Styles/sideBar.module.css';
// import Modal from '../app/Components/modals/Modal';
// import FilterSidebar from '@/app/Components/filtering/sideBar';
// import { supabase } from '../supabaseClient';
// import { useRouter } from 'next/router';
// import { FaTruck } from 'react-icons/fa';
// import Head from 'next/head';
// import TopBar from '@/app/Components/topbar/topbar';
// import styles from '../app/Styles/topBar.modules.css';
  
// const Products = () => {
//   const [activeTab, setActiveTab] = useState('products');
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [cartItems, setCartItems] = useState([]);
//   const [isItemAdded, setIsItemAdded] = useState(false);
//   const [filters, setFilters] = useState({

//     pickupLocation: '',
//     deliveryLocation: '',
//     price: '',
//     date: 'now',
//     transportType: [],
//     time: 'now',
//     specificTime: '',
//   });
//   const router = useRouter();

//   const fetchShipments = useCallback(async () => {
//     setLoading(true);
//     const { data, error } = await supabase
//       .schema('public')
//       .from('shipments')
//       .select('*')
//       .eq('status', 'available')
//       .order('created_at', { ascending: false });
  
//     if (error) {
//       console.error("Error fetching shipments:", error);
//     } else {
//       setProducts(data);
//       setFilteredProducts(data);
//     }
//     setLoading(false);
//   }, []);
//   useEffect(() => {
//     fetchShipments();
//   }, [fetchShipments]);

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   useEffect(() => {
//     const filtered = products.filter((product) => {
//       const { pickupLocation, deliveryLocation, price } = filters;
//       return (
//         (!pickupLocation || product.pickup_address.includes(pickupLocation)) &&
//         (!deliveryLocation || product.delivery_address.includes(deliveryLocation)) &&
//         (!price || product.price <= price)
//       );
//     });
//     setFilteredProducts(filtered);
//   }, [filters, products]);

//   const closeModal = () => setIsModalOpen(false);

//   const openModal = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const addToCart = (item) => {
//     setCartItems((prevItems) => {
//       const itemExists = prevItems.some((cartItem) => cartItem.id === item.id);
//       return itemExists ? prevItems : [...prevItems, item];
//     });
//     setIsItemAdded(true);
//   };

//   const handleCheckout = () => {
//     if (isItemAdded) {
//       router.push('/checkout');  // Navigate to the checkout page
//     } else {
//       addToCart(selectedProduct);
//       router.push('/checkout');  // Navigate to the checkout page

//     }
//   };

// console.log(selectedProduct);

//   const navigateToProductDetails = (productId) => router.push(`/kuljetukset/${productId}`);

//   return (
//     <Layout>
//       <Head>
//         <title>Logistix - kuljetukset</title>
//         <meta name="description" content="Löydä kuljetuksia — Logistiikka markkinapaikka" />
//       </Head>

//       <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />

//       <div className="flex flex-col p-8 bg-black w-full text-white min-h-screen">

//         <div className="flex flex-col sm:flex-row flex-auto">
//           <div className="filter">
//             <FilterSidebar applyFilters={setFilters} />
//           </div>
//           <div className="flex-1">
//             {loading ? (
//               <div>Odota...</div> // Add a loading spinner or message
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
//                 {filteredProducts.map((product) => (
//                   <div
//                     key={product.id}
//                     className="bg-gray-900 p-6 rounded-lg shadow-lg cursor-pointer"
//                     onClick={() => openModal(product)}
//                   >
//                     <p className="text-gray-400 mb-2">{product.pickupTime}</p>
//                     <h3 className="text-white mb-2">{new Date(product.pickup_date).toLocaleString()}</h3>
//                     <p className="text-white mb-2">{product.price} €</p>
//                     <p className="text-gray-400 mb-2">{product.pickup_city}</p>
//                     <p className="text-gray-400 mb-2">{product.delivery_city}</p>
//                     <p className="text-gray-400 mb-2">{product.weight} kg</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {isModalOpen && selectedProduct && (
//         <Modal onClose={closeModal} pickupLocation={selectedProduct.pickup_city} deliveryLocation={selectedProduct.delivery_city} >
//           <div className="modal-container p-6 rounded-lg">
          
//             <div className="modal-header mb-4 border-b border-gray-700 pb-2"><FaTruck />
              
//               <h3 className="text-xl text-gray-400 font-bold mb-4">{selectedProduct.shipment_identifier}</h3>
//               <p className="text-lg text-gray-400 mb-4 font-medium">{selectedProduct.price} €</p>
//               <p className="text-gray-400 mb-4">Paino: {selectedProduct.weight} kg</p>
//               <p className="text-gray-400 mb-4">Yksikkö: {selectedProduct.transport_units}, {selectedProduct.unit_type}</p>
//               <p className="text-gray-400 mb-4">{selectedProduct.details}</p>
//             </div>
//             <div className="modal-actions flex flex-col sm:flex-row gap-4">
//               <div className="modal-address mt-6 text-gray-300">
//                 <p><strong>Noutoaika:</strong> {new Date(selectedProduct.pickup_date).toLocaleString()}</p>
//                 <p><strong>Toimitusaika:</strong> {new Date(selectedProduct.delivery_date).toLocaleString()}</p>
//               </div>

//     <button
//       className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//       onClick={handleCheckout}>
//         Siirry kassalle
//     </button>

//               <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigateToProductDetails(selectedProduct.id)}>
//                 Näytä tiedot
//               </button>
//             </div>
//             <div className="modal-details-container">
//               <div className="flex-row modal-contact-info mb-6 text-gray-300">
//                 <h4 className="text-lg font-semibold text-white">Lähettäjän tiedot</h4>
//                 <p><strong>Nimi:</strong> {selectedProduct.sender_name}</p>
//                 <p><strong>Sähköposti:</strong> {selectedProduct.sender_email}</p>
//                 <p><strong>Puhelin:</strong> {selectedProduct.sender_phone}</p>
//                 <p><strong>Osoite:</strong> {selectedProduct.sender_address}</p>

//                 <h4 className="text-lg font-semibold text-white mt-4">Vastaanottajan tiedot</h4>
//                 <p><strong>Nimi:</strong> {selectedProduct.recipient_name}</p>
//                 <p><strong>Sähköposti:</strong> {selectedProduct.recipient_email}</p>
//                 <p><strong>Puhelin:</strong> {selectedProduct.recipient_phone}</p>
//                 <p><strong>Osoite:</strong> {selectedProduct.recipient_address}</p>
//               </div>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </Layout>
//   );
// };

// export default Products;