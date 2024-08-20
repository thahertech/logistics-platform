import React from 'react';
import { useRouter } from 'next/router';
import Footer from './Footer';

const Dashboard = () => {
  const router = useRouter();

  const handleDeliveriesNearbyClick = () => {
    router.push('/deliveries-nearby');
  };

  const handleCreateShipmentClick = () => {
    router.push('/create-shipment');
  };

  const handleMarketplaceClick = () => {
    router.push('/marketplace');
  };

  return (
    <div>
      <div className="relative h-screen bg-cover bg-center bg-no-repeat bg-[url('/assets/truckupBG.jpeg')] flex items-center justify-center flex-col text-white">
        <h1 className="text-6xl font-light">TruckUp</h1>
        <div className="mt-12 w-1/2 h-0.5 bg-white mb-10"></div>
      </div>

      <div className="relative min-h-[60vh] py-20 px-5 flex flex-col items-center justify-center bg-gradient-to-b from-black via-black to-transparent">
        <div className="flex flex-wrap gap-6 justify-center">
          <div className="w-full sm:w-1/2 md:w-1/3">
            <div className="relative overflow-hidden rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
              <img
                src="/assets/TruckImg.jpeg"
                alt="Kuljetukset lähellä"
                className="w-full h-full object-cover"
                onClick={handleDeliveriesNearbyClick}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white text-2xl font-bold">
                Lähellä
              </div>
            </div>
          </div>
          
          <div className="w-full sm:w-1/2 md:w-1/3">
            <div className="relative overflow-hidden rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
              <img
                src="/assets/Newimage.jpeg"
                alt="Uusi Kuljetustilaus"
                className="w-full h-full object-cover"
                onClick={handleCreateShipmentClick}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white text-2xl font-bold">
                Kuljetustilaus
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3">
            <div className="relative overflow-hidden rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
              <img
                src="/assets/Truck1.jpeg"
                alt="Avoimet kuljetukset"
                className="w-full h-full object-cover"
                onClick={handleMarketplaceClick}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white text-2xl font-bold">
                Avoimet kuljetukset
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 px-6 bg-gray-200 text-center">
        <div className="flex overflow-x-auto gap-6 scroll-snap-x-mandatory">
          <div className="flex-none w-96 h-48 bg-white shadow-md p-6 rounded-lg transform transition-transform duration-300 hover:scale-105">
            <p className="text-lg mb-4">"TruckUp has revolutionized our logistics operations. The platform is intuitive and saves us a lot of time!"</p>
            <p className="text-xl font-bold text-blue-500">Company A</p>
          </div>
        </div>
      </div>

      <div className="py-24 px-6 text-center bg-gray-200">
        <h2 className="text-4xl font-bold mb-8">Have questions or need support?</h2>
        <p className="text-xl mb-8">
          Get in touch with our team for assistance. We're here to help you with any inquiries you may have about our services or platform.
        </p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
          Contact Us
        </button>
      </div>

      <div className="relative h-[50vh] bg-cover bg-center bg-no-repeat bg-[url('/assets/Truckin4.jpg')] flex items-center justify-center text-white">
        <h2 className="text-4xl">Löydä ja myy kuljetus omilla ehdoilla</h2>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
