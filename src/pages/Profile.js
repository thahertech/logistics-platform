import React, { useEffect, useState } from 'react';
import Layout from '@/app/Dashboard/Layout';
import { useForm } from 'react-hook-form';
import { supabase } from '@/supabaseClient';
import Ratings from '../app/Forms/ratings';  // Assuming you have this component
import UserProfile from '@/app/Components/UserProfile';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [orders, setOrders] = useState([]);
    const [ratings, setRatings] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Get the current session and user details
                const { data: user, error: userError } = await supabase.auth.getUser();
                if (userError) {
                    throw new Error(`User fetch error: ${userError.message}`);
                }
                console.log('here');


                if (!user) {
                    throw new Error('No user found');
                }

                setUserDetails(user.user.identities[0]);
                console.log(user.user.identities[0]);

            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [reset]);

    const onSubmit = async (data) => {
        if (!userDetails) return;

        try {
            console.log('here');
            const { data: updatedUser, error } = await supabase
                .from('users')
                .update(data)
                .eq('id', userDetails.id);

            if (error) throw error;
            alert('Profile updated successfully!');
        } catch (error) {
            setError('Failed to update profile.');
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <Layout>
            <div className="bg-black text-white justify-center p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl text-center font-bold mb-6">Profiili</h2>

                <div className="flex justify-between mb-4">
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

                {userDetails && <UserProfile userId={userDetails.id} />}

                {activeTab === 'profile' && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block mb-2">Nimi:</label>
                            <input type="text" {...register('name')} className="border border-gray-600 rounded w-full p-2 bg-gray-700" />
                        </div>
                        {/* Other form fields */}
                        <button type="submit" className="bg-blue-600 text-white rounded p-2 w-full">Päivitä profiili</button>
                    </form>
                )}
                {activeTab === 'orders' && (
                    <div>
                        <h3 className="text-lg font-bold mb-4">Omat tilaukset</h3>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <div key={order.id} className="border rounded-lg p-4 mb-4 bg-gray-800 shadow">
                                    <p><strong>Tilausnumero:</strong> {order.order_number}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <p><strong>Yhteensä:</strong> {order.total_amount} €</p>
                                    <p><strong>Päivämäärä:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">Ei tilauksia.</p>
                        )}
                    </div>
                )}

                {activeTab === 'ratings' && (
                    <div>
                        <h3 className="text-lg font-bold mb-4">Omat arvostelut</h3>
                        {ratings.length > 0 ? (
                            ratings.map((rating) => (
                                <div key={rating.id} className="border rounded-lg p-4 mb-4 bg-gray-800 shadow">
                                    <p><strong>Arvosana:</strong> {rating.rating} ⭐</p>
                                    <p><strong>Palaute:</strong> {rating.feedback_content}</p>
                                    <p className="text-sm text-gray-500">Päivämäärä: {new Date(rating.created_at).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">Ei arvosteluja.</p>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Profile;
