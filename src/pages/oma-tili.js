import React, { useEffect, useState } from 'react';
import Layout from '@/app/Dashboard/Layout';
import { supabase } from '@/supabaseClient';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Sidebar from '@/app/Components/profile/profile-sidebar';
import ProfileContent from '@/app/Components/profile/profile-content';
import OrdersContent from '@/app/Components/profile/orders-content';
import OrderDetails from '@/app/Components/profile/order-details';
import { FaSignOutAlt } from 'react-icons/fa';
import CustomAlert from '@/app/Components/alert-box/profile-alert';
import PaymentHistory from '@/pages/maksu-historia';
import jsPDF from 'jspdf';
import { redirect } from 'next/dist/server/api-utils';


const UserLocationMap = dynamic(() => import('../app/Components/maps/userLocationMap'), { ssr: false });

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [alertMessage, setAlertMessage] = useState('');

  const router = useRouter();


  const handleSaveOrder = (order) => {
    const doc = new jsPDF();

    // Define PDF content
    doc.setFontSize(16);
    doc.text('Tilausraportti', 20, 20);

    doc.setFontSize(12);
    doc.text(`Tilausnumero: ${order.shipment_id}`, 20, 40);
    doc.text(`Eräpäivä: ${new Date(order.due_date).toLocaleDateString()}`, 20, 50);
    doc.text(`Päivämäärä: ${new Date(order.purchase_date).toLocaleDateString()}`, 20, 60);
    doc.text(`Status: ${order.status}`, 20, 70);
    doc.text(`Hinta: ${order.total_price} EUR`, 20, 80);
    doc.text(`Maksutilanne: ${order.payment_status}`, 20, 90);
    doc.text(`Arvio: ${order.rating ? 'Reviewed' : 'Not reviewed'}`, 20, 100);

    // Save the PDF
    doc.save(`Tilaus_${order.shipment_id}.pdf`);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
        try {
            const { data: user, error: userError } = await supabase.auth.getUser();
            if (userError || !user || !user.user) {
                setError("Auth session missing!");
                router.push('/auth');
                return;
            }

            setProfile(user.user);
            console.log(user.user);

            const { data: userProfile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', user.user.id)
                .single();

            if (error) throw new Error(`Error fetching profile: ${error.message}`);

            setProfile(prevProfile => ({
                ...prevProfile,
                ...userProfile,
            }));
        } catch (err) {
            setError(err.message);
            router.push('/auth');

        } finally {
            setLoadingProfile(false);
        }
    };
    fetchProfileData();

}, [router]);

const handleProfileUpdate = async (updatedProfile) => {
    try {

        const { app_metadata, phone, aud, confirmation_sent_at, email, email_confirmed_at, identities, is_anonymous, last_sign_in_at, role, user_metadata, id, ...filteredProfile } = updatedProfile;

        const { error } = await supabase
            .from('profiles')
            .upsert([
                {
                    user_id: profile?.user_id,
                    ...filteredProfile,
                }
            ], { onConflict: ['user_id'] });

        if (error) {
            console.error("Error during upsert:", error);
            throw new Error(error.message);
        }

        // Fetch the updated profile from the database
        const { data, error: selectError } = await supabase
            .from('profiles')
            .select('*')  // Select all columns to get the updated profile
            .eq('user_id', profile?.user_id) // Filter by user_id to get the right row
            .single(); // Assumes only one row per user_id

        if (selectError) {
            console.error("Error fetching updated profile:", selectError);
            throw new Error(selectError.message);
        }

        // Log and update the profile
        console.log("Upsert successful. Updated profile:", data);
        setProfile(data);

        // Success alert
        setAlertMessage('Oma tili päivitetty!');
        } catch (err) {
        console.error('Error updating profile:', err);
    }
};

useEffect(() => {
    const fetchOrders = async () => {
        try {
            const { data: user, error: userError } = await supabase.auth.getUser();
            if (userError) throw new Error(`User fetch error: ${userError.message}`);
            if (!user) return;

            const { data: userOrders, error: ordersError } = await supabase
                .from('shipment_purchases')
                .select('*')
                .eq('user_id', user.user.id);

            if (ordersError) throw new Error(`Orders fetch error: ${ordersError.message}`);
            setOrders(userOrders || []);
            console.log(userOrders);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingOrders(false);

        }
    };
    fetchOrders();
    
}, []);
const handleViewDetails = (order) => {
    setSelectedOrder(order);
    
};

const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      console.log('Successfully signed out');
      // Redirect to login page or home page
      window.location.href = '/auth';
    }
  };

const closeDetails = () => {
    setSelectedOrder(null);
};
const handleRatingSubmit = async (ratingData) => {
    if (!selectedOrder || !profile?.user_id) return;

    try {
        const { error } = await supabase
            .from('user_ratings')
            .insert({
                user_id: profile.user_id,
                shipment_id: selectedOrder.shipment_id,
                rating: ratingData.rating,
                comment: ratingData.comment || null,
            });

        if (error) throw new Error(`Failed to submit rating: ${error.message}`);

        alert('Rating submitted successfully!');
        setSelectedOrder(null);
        setRatings(prevRatings => [...prevRatings, { ...ratingData, shipment_id: selectedOrder.shipment_id }]);
    } catch (err) {
        console.error('Error submitting rating:', err);
        setError('Failed to submit rating. Please try again.');
    }
};



  if (loadingProfile || loadingOrders) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Layout>
<div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
<Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleSignOut={handleSignOut} 
      />
<main className="flex-1 p-8 space-y-8 mt-3">
  {activeTab === 'profile' && profile && <ProfileContent profile={profile} />}
  {activeTab === 'orders' && (
    <OrdersContent orders={orders} handleViewDetails={handleViewDetails} />
  )}
 {selectedOrder && (
  <OrderDetails 
    selectedOrder={selectedOrder} 
    closeDetails={closeDetails} 
    handleSaveOrder={handleSaveOrder}
  />
)}
  {activeTab === 'map' && <UserLocationMap />}
  <button
    className="py-3 px-6 mt-6 rounded-lg bg-white hover:bg-red-500 transition duration-300 flex items-center justify-center text-black"
    onClick={handleSignOut}
  >
    <FaSignOutAlt className="mr-3 text-xl" /> Kirjaudu ulos
  </button>
</main>
    </div>
  </Layout>
  );
};

export default Profile;