import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
const UserProfile = ({ userId }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {

                // Get the current session and user details
                const { data: user, error: userError } = await supabase.auth.getUser();
                if (userError) {
                    throw new Error(`User fetch error: ${userError.message}`);
                }
                console.log('here');

                setProfile(user.user);
                console.log(user.user);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchProfileData();
        }
    }, [userId]);

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!profile) return <p>No profile data available.</p>;

    return (
        <div className="profile-details">
            <h2>{profile.name}</h2>
            <p>Username: {profile.username}</p>
            <p>Sähköposti: {profile.email}</p>
            {profile.avatar_url && <img src={profile.avatar_url} alt={`${profile.full_name}'s avatar`} />}
            <p>Last updated: {new Date(profile.profile_updated_at).toLocaleString()}</p>
        </div>
    );
};

export default UserProfile;
