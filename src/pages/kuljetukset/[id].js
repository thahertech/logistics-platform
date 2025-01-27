// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import Layout from '../../app/Dashboard/Layout';
// import { supabase } from '@/supabaseClient';
// import styles from '../../app/Styles/KuljetusSinglePage.module.css';
// import { FaTruck, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
// import CustomAlert from "@/app/Components/alert-box/CustomAlert"; // Import the CustomAlert component
// import { useSession } from '@supabase/auth-helpers-react'; 

// const KuljetusSinglePage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [kuljetus, setKuljetus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null); // New state for user
  
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");

  
//    // Fetch user on component mount
//    useEffect(() => {
//     const fetchUser = async () => {
//       const { data: userData, error } = await supabase.auth.getUser();
//       if (error) {
//         console.error('Error fetching user:', error);
//         return;
//       }
//       setUser(userData);
//     };

//     fetchUser();
//   }, []);

//   // Check if the user is the owner
//   const isOwner = user?.id === kuljetus?.user_id;

//   // Fetch shipment details
//   useEffect(() => {
//     const fetchKuljetus = async () => {
//       if (!id) return;

//       try {
//         const { data, error } = await supabase
//           .from('shipments')
//           .select('*')
//           .eq('id', id)
//           .single();

//         if (error) throw error;
//         setKuljetus(data);
//       } catch (error) {
//         console.error('Error fetching kuljetus:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchKuljetus();
//   }, [id]);

//   console.log(kuljetus);

//   // Add shipment to cart
//   const onBuyShipment = async () => {
//     try {
//       let savedCart = JSON.parse(localStorage.getItem('cart')) || [];
//       savedCart.push(kuljetus);
//       localStorage.setItem('cart', JSON.stringify(savedCart));

//    setAlertMessage("Kuljetus lisätty ostoskoriin!");
//    setShowAlert(true);

//       // setTimeout(() => {
//         setShowAlert(false); // Hide alert after 3 seconds
//         router.push("/checkout");
//       // }, 3000);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       setAlertMessage("An error occurred while adding to the cart. Please try again.");
//       setShowAlert(true);

//       // setTimeout(() => {
//       //   setShowAlert(false); // Hide alert after 3 seconds
//       // }, 3000);
//     }
//     };

//   // Loading state
//   if (loading) {
//     return (
//       <Layout>
//         <div className={styles.loadingContainer}>
//           <p>Ladataan kuljetustietoja...</p>
//         </div>
//       </Layout>
//     );
//   }

//   // Error state
//   if (!kuljetus) {
//     return (
//       <Layout>
//         <div className={styles.errorContainer}>
//           <p>Kuljetusta ei löytynyt.</p>
//           <button
//             className={styles.backButton}
//             onClick={() => router.push('/kuljetukset')}
//           >
//             Takaisin
//           </button>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className={styles.kuljetusPage}>
//         <div className={styles.header}>
//           <h1>Kuljetuksen Tiedot</h1>
//         </div>
//         <div className={styles.kuljetusContent}>
//           <div className={styles.detailsContainer}>


//             <div className={styles.card}>
//               <h2><FaMapMarkerAlt /> Nouto</h2>
//               <p>
//                 <strong>Osoite:</strong> {kuljetus.pickup_address || 'Ei tietoa'},{' '}
//                 {kuljetus.pickup_postal_code || ''} {kuljetus.pickup_city || ''}
//               </p>
//               <p>
//                 <strong>Aika:</strong> {kuljetus.pickup_time || 'Ei tietoa'}
//               </p>
//             </div>

//             <div className={styles.card}>
//               <h2><FaMapMarkerAlt /> Toimitus</h2>
//               <p>
//                 <strong>Osoite:</strong> {kuljetus.delivery_address || 'Ei tietoa'},{' '}
//                 {kuljetus.delivery_postal_code || ''} {kuljetus.delivery_city || ''}
//               </p>
//               <p>
//                 <strong>Aika:</strong> {kuljetus.delivery_time || 'Ei tietoa'}
//               </p>
//             </div>
//           </div>

//           <div className={styles.card}>
//               <h2><FaTruck /> Kuljetuksen Tiedot</h2>
//               <p><strong>Hinta:</strong> {kuljetus.price ? kuljetus.price.toFixed(2) : 'Ei tietoa'} €</p>
//               <p><strong>Paino:</strong> {kuljetus.weight || 'Ei tietoa'} kg</p>
//               <p><strong>Yksikkötyyppi:</strong> {kuljetus.unit_type || 'Ei tietoa'}</p>
//               <p><strong>Lisätiedot:</strong> {kuljetus.details || 'Ei lisätietoja.'}</p>
//               <p>
//                 <strong>Erityiskäsittely:</strong>{' '}
//                 {kuljetus.special_handling || 'Ei erityiskäsittelyä'}
//               </p>
//               <p>
//                 <strong>Vakuutus:</strong>{' '}
//                 {kuljetus.insurance ? 'Sisältää vakuutuksen' : 'Ei vakuutusta'}
//               </p>
//             </div>

//  {isOwner && (
//             <div className={styles.actions}>
//               <button
//                 className={styles.editButton}
//                 onClick={() => router.push(`/kuljetukset/muokkaa-kuljetus/${kuljetus.id}`)}  // Redirect to edit page
//               >
//                 Muokkaa Kuljetusta
//               </button>
//             </div>
//           )}

//           <div className={styles.actions}>
//             <button className={styles.buyButton} onClick={onBuyShipment}>
//               Osta Kuljetus
//             </button>
//             <button
//               className={styles.backButton}
//               onClick={() => router.push('/kuljetukset')}
//             >
//               Takaisin
//             </button>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default KuljetusSinglePage;