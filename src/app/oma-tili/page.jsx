'use client';
import React, { useState, Suspense } from 'react';
import Layout from '@/components/Layout/Layout';
import Head from 'next/head';
import Sidebar from '@/components/profile/profile-sidebar';
import { useProfileData } from '@/lib/hooks/useProfileData';
import { useOrdersAndPurchases } from '@/lib/hooks/useOrdersandPurchases';
import { useProfileActions } from '@/lib/hooks/useProfileActions';
import useShipments from '@/lib/hooks/useShipments';

const ProfileContent = React.lazy(() => import('@/components/profile/profile-content'));
const OrdersContent = React.lazy(() => import('@/components/profile/orders-content'));
const PurchaseContent = React.lazy(() => import('@/components/profile/purchase-content'));
const InvoiceContent = React.lazy(() => import('@/components/profile/invoice-content'));

export default function OmaTiliPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { profile, loadingProfile, error: profileError, user } = useProfileData();
  const { orders, purchases, loadingOrders, error: ordersError } = useOrdersAndPurchases(user?.id);
  const { shipments, loadingShipments, error: shipmentsError } = useShipments(user?.id);
  const { onProfileUpdate, handleSignOut, loading: profileActionsLoading } = useProfileActions(profile, (updatedProfile) => setProfile(updatedProfile));


  if (loadingProfile || loadingOrders) {
    return <div className="flex ">Odota hetki...</div>;
  }

  if (profileError || ordersError) {
    return (
      <Layout>
        <Head><title>Virhe - Logistix</title></Head>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500">{profileError || ordersError}</p>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <Head><title>Oma tili - Logistix</title></Head>
        <div className="flex flex-col min-h-screen from-gray-900 via-gray-800 to-black text-white">
          {profile && (
            <Sidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              handleSignOut={handleSignOut}
              userRole={profile.user_role}
            />
          )}
          <main className="flex-1 p-8 space-y-8 mt-3">
            {alertMessage && (
              <div className="bg-black-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                {alertMessage}
              </div>
            )}
            <Suspense fallback={<div className="w-full justify-center flex">Lataa tietoja...</div>}>
              {activeTab === 'profile' && profile && (
                <ProfileContent profile={profile} onProfileUpdate={onProfileUpdate} />
              )}
              {activeTab === 'orders' && (loadingOrders ? <div>Lataa tilaukset...</div> :
                <OrdersContent orders={orders} 
                />
              )}
              {activeTab === 'purchase' && profile && (
                <PurchaseContent
                  purchases={purchases}
                  userRole={user?.user_role}
                  handleViewDetails={setSelectedOrder}
                />
              )}
              {activeTab === 'invoices' && profile && (
                <InvoiceContent
                  purchases={purchases}
                  userRole={user?.user_role}
                  handleViewDetails={setSelectedOrder}
                />
              )}
            </Suspense>
          </main>
        </div>
      </Layout>
    </>
  );
}