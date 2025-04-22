// import React, { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Layout from '@/components/Layout/Layout';
// import styles from '@/app/Styles/ThankYou.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTruck } from '@fortawesome/free-solid-svg-icons'; 

// const ThankYouPage = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       router.push('/kuljetukset');
//     }, 10000);

//     return () => clearTimeout(timeout);
//   }, [router]);

  
//   return (
//     <Layout>
//       <div className={styles.thankYouContainer}>
//         <h1>Kiitos ostoksestasi!</h1>
//         <p>Ostoksesi on käsitelty onnistuneesti. Saat lisätietoa sähköpostiisi pian.</p>
//         <div className={styles.truckAnimation}>
//           <FontAwesomeIcon icon={faTruck} className={styles.truckIcon} />
//         </div>
//         <button
//           className={styles.backButton}
//           onClick={() => router.push('/kuljetukset')}
//         >
//           Takaisin Kuljetuksiin
//         </button>
//       </div>
//     </Layout>
//   );
// };

// export default ThankYouPage;
