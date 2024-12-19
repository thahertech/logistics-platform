import React, { useEffect, useState } from 'react';
import Layout from '@/app/Dashboard/Layout';
import { supabase } from '@/supabaseClient';
import Ratings from '../app/Forms/new-rating';
import UserProfile from '@/app/Components/UserProfile';
import '@/app/globals.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const { data: user, error: userError } = await supabase.auth.getUser();
                if (userError) throw new Error(`User fetch error: ${userError.message}`);
        
                if (user && user.user) {
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
                } else {
                    console.warn('No user found');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoadingProfile(false);
            }
        };
        fetchProfileData();
        
    }, []);


    const handleProfileUpdate = async (updatedProfile) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .upsert([{ ...updatedProfile, user_id: profile.user_id}]);

            if (error) throw new Error(error.message);

            setProfile(data[0]);
            alert('Profile updated successfully!');
        } catch (err) {
            console.error('Error updating profile:', err);
            alert('Failed to update profile.');
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
            <div className="flex justify-center min-h-screen">
                <div className="flex-col bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-6xl">
                    <div className="flex justify-between space-x-4 border-b border-gray-600 pb-2 mb-4">
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'profile' ? 'bg-blue-600' : 'bg-gray-700'}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profiili
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-600' : 'bg-gray-700'}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            Tilaukset
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'ratings' ? 'bg-blue-600' : 'bg-gray-700'}`}
                            onClick={() => setActiveTab('ratings')}
                        >
                            Arvostelut
                        </button>
                    </div>

                    {profile && 
                    <UserProfile profile={profile} onProfileUpdate={handleProfileUpdate} />
                }

                    {activeTab === 'orders' && (
                        <div>
                            <h3 className="text-lg font-bold mb-4">Omat tilaukset</h3>
                            {orders.length > 0 ? (
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-900 text-white">
                                            <th className="border px-4 py-2">Tilausnumero</th>
                                            <th className="border px-4 py-2">Eräpäivä</th>
                                            <th className="border px-4 py-2">Päivämäärä</th>
                                            <th className="border px-4 py-2">Status</th>
                                            <th className="border px-4 py-2">Arvio</th>
                                            <th className="border px-4 py-2">Toiminto</th>
                                            <th className="border px-4 py-2">Muokkaa</th>
                                            <th className="border px-4 py-2">Hinta</th>
                                            <th className="border px-4 py-2">Maksutilanne</th>
                                            
                                            
                                            

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.id} className="text-white">
                                                <td className="border px-4 py-2">{order.shipment_id}</td>
                                                <td className="border px-4 py-2">{new Date(order.due_date).toLocaleDateString()}</td>

                                                <td className="border px-4 py-2">{new Date(order.purchase_date).toLocaleDateString()}</td>
                                                <td className="border px-4 py-2">{order.status}</td>
                                                <td className="border px-4 py-2">
                                                    {ratings.some(rating => rating.shipment_id === order.shipment_id) ? 'Reviewed' : 'Not reviewed'}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {order.status === 'Completed' && !ratings.some(rating => rating.shipment_id === order.shipment_id) && (
                                                        <button
                                                            onClick={() => setSelectedOrder(order)}
                                                            className="bg-blue-600 text-white p-2 rounded"
                                                        >
                                                            Arvostele
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="border px-4 py-2">
                                                        <button
                                                            onClick={() => handleViewDetails(order)}
                                                            className="bg-green-600 text-white p-2 rounded"
                                                        >
                                                            Näytä tiedot
                                                        </button>
                                                    </td>

                                                    <td className="border px-4 py-2">
                                                        {order.total_price} Eur.
                                                    </td>

                                                    <td className="border px-4 py-2">
                                                        {order.payment_status} 
                                                    </td>
                                        
                                        
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center">Ei tilauksia.</p>
                            )}
                        </div>
                    )}

                    {selectedOrder && (
                        <div className="mt-4">
                            <h3 className="text-xl font-bold">Arvioi toimitus</h3>
                            <Ratings
                                onSubmit={handleRatingSubmit}
                                selectedOrder={selectedOrder}
                                resetForm={() => setSelectedOrder(null)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Profile;