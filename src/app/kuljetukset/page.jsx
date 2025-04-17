'use client';
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Layout from '../../components/Layout/Layout';
import '../globals.css';
import Modal from '../../components/modals/Modal';
import FilterSidebar from '@/components/sidebar/SideBar';
import { supabase } from '../../supabaseClient';
import { useRouter } from 'next/navigation';
import { FaTruck } from 'react-icons/fa';
import Head from 'next/head';
import TopBar from '@/components/topbar/topbar';
import dynamic from 'next/dynamic';

const ShipmentsMap = dynamic(() => import('@/components/maps/ShipmentsMap'), { ssr: false });

export default function Shipments() {
  const [activeTab, setActiveTab] = useState('shipments');
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    price: '',
    date: 'now',
    transportType: [],
    time: 'now',
    specificTime: '',
    agreement_type: [],
  });
  const router = useRouter();

  useEffect(() => {
    document.title = 'Logistix | Kuljetukset';
  }, []);
  const fetchShipments = useCallback(async () => {
    setLoading(true);
    
    const today = new Date().toISOString().split("T")[0];
  
    const { data, error } = await supabase
      .schema('public')
      .from('shipments')
      .select('*')
      .eq('status', 'available')
      .gte('pickup_date', today)
      .order('pickup_date', { ascending: true });
  
    if (error) {
      console.error("Error fetching shipments:", error);
    } else {
      setShipments(data);
      setFilteredShipments(data);
    }
    
    setLoading(false);
  }, []);

  const handleApplyFilters = (filteredData) => {
    setFilteredShipments(filteredData);
  };

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  const closeModal = () => setIsModalOpen(false);

  const openModal = (shipment) => {
    setSelectedShipment(shipment);
    setIsModalOpen(true);
  };

  const navigateToProductDetails = (shipmentId) => router.push(`/kuljetukset/${shipmentId}`);

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
 

      <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-col p-8 bg-black w-full text-white min-h-screen">

        {activeTab === "map" && (
        <Suspense fallback={<div>Ladataan karttaa…</div>}>

          <div className="w-full h-[1000px]">
            <ShipmentsMap />
          </div>
          </Suspense>
        )}

        <div className="flex flex-col sm:flex-row mt-4">

          <div className="filter flex-0  px-4">
            <FilterSidebar applyFilters={handleApplyFilters} shipmentData={shipments} />
          </div>

          <div className="flex-1 px-4">
            {loading ? (
              <div className="flex-1 text-center m-auto">Odota...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredShipments.map((shipment) => (
                  <div
                    key={shipment.id}
                    className="bg-gray-900 p-6 rounded-lg shadow-lg cursor-pointer"
                    onClick={() => openModal(shipment)}
                  >
                    <p className="text-gray-400 mb-2">
                      {shipment.pickup_city} — {shipment.delivery_city} |{' '}
                      {new Date(shipment.pickup_date).toLocaleDateString('fi-FI', {
                       
                        month: '2-digit',
                        day: '2-digit',
                      })} {' '}
                    </p>
                    <p className="text-white text-end text-xl mb-2">{shipment.amount} €</p>
                    <p className="text-gray-400 text-center mb-2">
                      {shipment.weight} kg | {shipment.transport_units} kpl {shipment.unit_type} | {' '}
                      {shipment.agreement_type}
                    </p>
                  </div>
                ))}
                {!filteredShipments.length && !loading && (
  <p className="text-center text-gray-500 mt-8">Ei löytynyt kuljetuksia valituilla suodattimilla.</p>
)}
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && selectedShipment && (
        <Modal onClose={closeModal} pickupLocation={selectedShipment.pickup_city} deliveryLocation={selectedShipment.delivery_city} >
          <div className="modal-container p-6 rounded-lg">
            <div className="modal-header mb-4 border-b border-gray-700 pb-2"><FaTruck />
            <div className="flex justify-between">
            <div className="modal-address mt-6 text-gray-300">
                <p><strong>Nouto</strong> {new Date(selectedShipment.pickup_time).toLocaleString('fi-FI', {
                       
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })} {' '}</p>
                <p><strong></strong> { selectedShipment.pickup_postal_code + ", " + selectedShipment.pickup_city} </p>
            </div>
            <div className="modal-address mt-6 text-gray-300">

                <p><strong>Toimitus</strong> {new Date(selectedShipment.delivery_date).toLocaleString(
                  'fi-FI',
                  {
                    month: '2-digit',
                    day: '2-digit',

                  }
                )}</p>
                <p><strong></strong> { selectedShipment.recipient_postal_code + ", " + selectedShipment.recipient_city} </p>

              </div></div>
              <div className="modal-price font-xl mt-6 text-gray-300 flex justify-end">

              <p className="text-xl  bg-opacity-60 p-[10px] rounded-[10px] text-gray-400 mb-4 font-medium">{selectedShipment.amount} €</p>
              </div>
            </div>
            <div className="modal-actions flex flex-col justify-end sm:flex-row gap-4">

              <button className="bg-blue-500 hover:bg-blue-600  text-white px-4 py-2 rounded" onClick={() => navigateToProductDetails(selectedShipment.id)}>
                Näytä tiedot
              </button>
            </div>
            <div className="modal-details-container">
              <div className="flex-row modal-contact-info mb-6 text-gray-300">
                <p className="text-gray-400 mb-4">{selectedShipment.details}</p>
              </div>
            </div>
          </div>
          <p className="text-white-400 text-center p-2 bg-black bg-opacity-30 mb-0">{selectedShipment.weight} kg | {selectedShipment.transport_units}, {selectedShipment.unit_type} | {selectedShipment.agreement_type}</p>
        </Modal>
      )}
    </Layout>
  );
};
