import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../supabaseClient';
import styles from '../app/Styles/Dashboard.module.css';


const ConfirmEmail = () => {
    const router = useRouter();

    useEffect(() => {
        const confirmEmail = async () => {
            // Extract the token from the URL hash
            const hash = window.location.hash;
            const params = new URLSearchParams(hash.substring(1));
            const accessToken = params.get('access_token');

            if (accessToken) {
                // Confirm the email with the token
                const { error } = await supabase.auth.updateUser(accessToken);

                if (error) {
                    console.error('Error confirming email:', error.message);
                } else {

                    router.push('/auth'); 
                }
            } else {
                console.error('No access token found in URL.');
            }
        };

        confirmEmail();
    }, [router]);

    return <div>Confirming your email...</div>;
};

export default ConfirmEmail;