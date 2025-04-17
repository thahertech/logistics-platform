import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Layout from '@/components/Layout/Layout';
import styles from '@/app/Styles/Kuljetussuoritettu.module.css';

const KuljetusSuoritettu = () => {
  const [userLocation, setUserLocation] = useState(null);

  // Function to get the user's current geolocation
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Could not get your location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  if (!userLocation) {
    return (
        <Layout>
  
            <div className={styles.backButton}>
              <button onClick={() => window.location.href = '/'}>
                Palaa etusivulle
              </button>
            </div>

        </Layout>
      );
    }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Kuljetus Suoritettu</h1>
        <p className={styles.message}>Toimitus on onnistuneesti vahvistettu! Kiitos, että käytit palveluamme.</p>

        <div className={styles.mapContainer}>
          <LoadScript     googleMapsApiKey= {`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}       >
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '400px' }}
              center={userLocation}
              zoom={15}
            >
              <Marker position={userLocation} />
            </GoogleMap>
          </LoadScript>
        </div>

        <div className={styles.backButton}>
          <button onClick={() => window.location.href = '/'}>
            Palaa etusivulle
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default KuljetusSuoritettu;