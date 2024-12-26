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

const UserLocationMap = dynamic(() => import('../app/Components/userLocationMap'), { ssr: false });

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


      <div className="flex min-h-screen bg-gray-900 text-white">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} handleSignOut={handleSignOut} />
        <main className="flex-1 p-8">
          {activeTab === 'profile' && profile && <ProfileContent profile={profile} onProfileUpdate={handleProfileUpdate} /> }
          {activeTab === 'orders' && <OrdersContent orders={orders} handleViewDetails={handleViewDetails} />}
          {selectedOrder && <OrderDetails selectedOrder={selectedOrder} closeDetails={closeDetails} />}
          {activeTab === 'map' && <UserLocationMap />}
        </main>
      </div>
    </Layout>
  );
};

export default Profile;