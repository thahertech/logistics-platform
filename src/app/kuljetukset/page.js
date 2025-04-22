'use client';
import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import TopBar from '@/components/topbar/topbar';
import FilterSidebar from '@/components/sidebar/SideBar';
import dynamic from 'next/dynamic';
import useShipments from '@/lib/hooks/useShipments';
import ShipmentCard from '@/components/shipments/ShipmentCard';
import ShipmentModal from '@/components/shipments/ShipmentModal';
import { toast } from 'react-toastify';
import PaginationControls from '@/components/page-controls/PaginationControls';
import ShipmentsGrid from '@/components/shipments/api/Utils/ShipmentsGrid';

const ShipmentsMap = dynamic(() => import('@/components/maps/ShipmentsMap'), { ssr: false });

export default function Shipments() {
  const [activeTab, setActiveTab] = useState('shipments');
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // The useShipments hook fetches shipment data and provides:
  // - shipments: an array of shipment objects
  // - loading: a boolean indicating whether the data is still being fetched
  const { shipments, loading } = useShipments();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const shipmentsToDisplay = filteredShipments.length > 0 ? filteredShipments : shipments;

  const totalPages = Math.ceil(shipmentsToDisplay.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShipments = shipmentsToDisplay.slice(indexOfFirstItem, indexOfLastItem);

  const handleApplyFilters = (filtered) => setFilteredShipments(filtered);

  const openModal = (id) => {
    const shipment = shipments.find(s => s.id === id);

    if (shipment?.locked) {
      toast.error(`Tämä kuljetus on lukittu ja sitä muokkaa toinen käyttäjä.`);
    } else {
      console.log(shipment);
      setSelectedShipment(shipment);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedShipment(null);
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-col p-4 sm:p-8 bg-black w-full text-white min-h-screen">

        {activeTab === 'map' && (
          <div className="w-full h-[400px] sm:h-[1000px] flex justify-center">
            <ShipmentsMap shipments={shipments} />
          </div>
        )}

        {activeTab === 'shipments' && (
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="w-full sm:w-1/4 sm:px-4">
              <FilterSidebar applyFilters={handleApplyFilters} shipmentData={shipments} />
            </div>

            <div className="w-full flex-1 sm:w-3/4 sm:px-4">
              {loading ? (
                <div className="flex-1 text-center m-auto">Odota...</div>
              ) : (
                <>
                  <ShipmentsGrid
                    shipments={currentShipments}
                    openModal={openModal}
                    filteredShipments={filteredShipments}
                    loading={loading}
                  />

                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'asap' && (
          <div className="flex-1 sm:px-4 mt-4">
            {loading ? (
              <div className="text-center m-auto">Ladataan kiireellisiä kuljetuksia...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shipments
                  .filter((shipment) => {
                    const pickup = new Date(shipment.pickup_date);
                    const now = new Date();
                    const inNext24h = !isNaN(pickup) && pickup > now && pickup - now <= 24 * 60 * 60 * 1000;
                    return shipment.urgent || inNext24h;
                  })
                  .map((shipment) => (
                    <ShipmentCard
                      key={shipment.id}
                      shipment={shipment}
                      onClick={() => openModal(shipment.id)}
                      className={shipment.locked ? 'bg-gray-500 opacity-50 cursor-not-allowed' : ''}
                      title={shipment.locked ? 'Tämä kuljetus on lukittu' : ''}
                    />
                  ))}
                {shipments.filter((s) => s.urgent || (new Date(s.pickup_time) - new Date()) <= 24 * 60 * 60 * 1000).length === 0 && (
                  <p className="text-center text-gray-500 mt-8">
                    Ei kiireellisiä kuljetuksia juuri nyt.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpen && selectedShipment ? (
        <ShipmentModal shipment={selectedShipment} onClose={closeModal} />
      ) : null}
    </Layout>
  );
}