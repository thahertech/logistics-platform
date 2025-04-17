// pages/paymentHistory.js
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';

const PaymentHistory = () => {
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            const { data, error } = await supabase
                .from('payment_history')
                .select('*'); // Fetch all columns

            if (error) {
                setError(error.message);
            } else {
                setPaymentHistory(data);
            }
            setLoading(false);
        };

        fetchPaymentHistory();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Payment History</h1>
            <ul>
                {paymentHistory.map((payment) => (
                    <li key={payment.id}>

                        <p>Amount: {payment.amount}</p>
                        <p>Date: {payment.date}</p>
                        <p>Status: {payment.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentHistory;