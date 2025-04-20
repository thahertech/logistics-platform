'use client';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { supabase } from '@/supabaseClient';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Sidebar from '@/components/profile/profile-sidebar';
import ProfileContent from '@/components/profile/profile-content';
import OrdersContent from '@/components/profile/orders-content';
import OrderDetails from '@/components/profile/order-details';
import PurchaseContent from '@/components/profile/purchase-content';
import { ROUTES } from '@/constants/routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OmaTiliPage() {

  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [alertMessage, setAlertMessage] = useState('');
  const router = useRouter();


  useEffect(() => {
      let isMounted = true;
  
      const fetchProfileData = async () => {
          try {
              const { data: user, error: userError } = await supabase.auth.getUser();
  
              if (userError || !user?.user) {
                  toast.error("Istunto vanhentui. Kirjaudu sisään uudelleen.");
  
                  const { error: refreshError } = await supabase.auth.refreshSession();
  
                  if (refreshError) {
                      if (isMounted) {
                          setError("Istunto vanhentui. Kirjaudu sisään uudelleen.");
                          toast.error("Istunto vanhentui. Kirjaudu sisään uudelleen.");
                          router.push(ROUTES.LOGIN);
                      }
                      return;
                  }
              }
  
              const authUser = user?.user;
              if (!authUser) {
                  if (isMounted) router.push(ROUTES.LOGIN);
                  return;
              }
  
              const { data: userProfile, error } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('user_id', authUser.id)
                  .single();
  
              if (error) {
                  toast.error("Profiilin lataaminen epäonnistui.");
              }
  
              if (isMounted) {
                  setProfile({
                      ...authUser,
                      ...userProfile,
                  });
              }
          } catch (err) {
              console.error("Profile fetch failed:", err);
              if (isMounted) {
                toast.error("Jotain meni pieleen. Kirjaudu sisään uudelleen.");
                  router.push(ROUTES.LOGIN);
              }
          } finally {
              if (isMounted) {
                  setLoadingProfile(false);
              }
          }
      };

      fetchProfileData();

      return () => {
          isMounted = false;
      };
  }, [router]);

const onProfileUpdate = async (updatedProfile) => {
  try {
    const { app_metadata, aud, confirmation_sent_at, email, email_confirmed_at, identities, is_anonymous, last_sign_in_at, phone, role, user_metadata, id, ...profileData } = updatedProfile;

      const { data, error } = await supabase
          .from('profiles')
          .upsert([
              {
                  user_id: profile.user_id,
                  ...profileData,
                  updated_at: new Date().toISOString()

              }
          ], { onConflict: ['user_id'] });

      if (error) throw new Error('Error updating profile: ' + error.message);
      setProfile(updatedProfile);

      toast.success('Profiili päivitetty!');
      
    
    } catch (err) {
      toast.error('Profiilin päivitys epäonnistui: ' + err.message);
    }
};

const handleDeleteOrder = async (orderId) => {
  try {
      const { error } = await supabase
          .from('shipments')
          .delete()
          .eq('id', orderId);

      if (error) throw new Error(`Error deleting order: ${error.message}`);

      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      toast.success('Tilaus poistettu!');
    } catch (err) {
      setError(err.message);
      toast.error('Virhe poistettaessa tilausta: ' + err.message);
    }
};

const handleViewDetails = (order) => {
  setSelectedOrder(order);
};

useEffect(() => {
    const fetchOrders = async () => {
        try {
            const { data: user, error: userError } = await supabase.auth.getUser();
            if (userError) throw new Error(`User fetch error: ${userError.message}`);
            if (!user) return;

            const { data: userOrders, error: ordersError } = await supabase
                .from('shipments')
                .select('*')
                .eq('user_id', user.user.id);

            if (ordersError) throw new Error(`Orders fetch error: ${ordersError.message}`);
            setOrders(userOrders || []);
        } catch (err) {
            setError(err.message);
            toast.error('Virhe tilauksia ladattaessa: ' + err.message);
        } finally {
            setLoadingOrders(false);

        }
    };
    fetchOrders();
}, []);

useEffect(() => {
  const fetchPurchases = async () => {
      try {
          const { data: user, error: userError } = await supabase.auth.getUser();
          if (userError) throw new Error(`User fetch error: ${userError.message}`);
          if (!user) return;

          const { data: userPurchases, error: ordersError } = await supabase
              .from('shipment_purchases')
              .select('*')
              .eq('user_id', user.user.id);

          if (ordersError) throw new Error(`Orders fetch error: ${ordersError.message}`);
          setPurchases(userPurchases || []);
      } catch (err) {
          setError(err.message);
          toast.error('Virhe tilauksia ladattaessa: ' + err.message);
      } finally {
          setLoadingOrders(false);

      }
  };
  fetchPurchases();
}, []);


const handleEditDetails = (order) => {
    setSelectedOrder(order);
    console.log("Editing order:", order);

    router.push(`/kuljetukset/muokkaa-kuljetus/${order.id}`);
}

const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Uloskirjautuminen epäonnistui: ' + error.message);
    } else {
      toast.success('Uloskirjautuminen onnistui');
      window.location.href = '/auth/login';
    }
};

const closeDetails = () => {
    setSelectedOrder(null);
};

useEffect(() => {
    document.title = 'Logistix | Oma tili';
  }, []);

if (loadingProfile || loadingOrders) {
    return;
  }

  if (error) {
    return (
      <>
      <ToastContainer position="top-right" marginTop={"200px"} autoClose={3000} />
  
      <Layout>
        <Head><title>Virhe - Logistix</title></Head>

        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500">{error}</p>
        </div>
      </Layout>
    </>
    );
  }
  return (
    <>
    <ToastContainer position="top-right" marginTop={"200px"} autoClose={3000} />

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
                  {activeTab === 'profile' && profile && (
                    
                      <ProfileContent profile={profile} onProfileUpdate={onProfileUpdate} />
                      
                  )} 

                   {activeTab === 'orders' && profile && (
                      <OrdersContent
                        orders={orders}
                        userRole={profile?.user_role}
                        handleViewDetails={setSelectedOrder}
                      />
                    )}
                    {activeTab === 'purchase' && profile && (
                      <PurchaseContent
                        purchases={purchases}
                        userRole={profile?.user_role}
                        handleViewDetails={setPurchases}
                    />
                      )}

                {selectedOrder && (
                  <OrderDetails
                    selectedOrder={selectedOrder}
                    closeDetails={closeDetails}
                    handleEditDetails={handleEditDetails}
                    handleDeleteOrder={handleDeleteOrder}
                  />
                )}

                  </main>
              </div>
      </Layout>
    </>
  );
};
