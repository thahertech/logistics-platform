import React, { useState, useEffect } from 'react';
import Layout from '../../dashboard/Layout';
import styles from '../../Styles/orderForm.module.css';
import CartItem from '../../cartTEMP/cartItem';
import BillingForm from './billingForm';
import PdfPreview from '../pdfPreview';
import { supabase } from '@/supabaseClient';

const OrderForm = () => {
    const [cartItems, setCartItems] = useState([]);
    const [billingDetails, setBillingDetails] = useState({
        sähköposti: '',
        yritys: '',
        osoite: '',
        postinumero: '',
        kaupunki: '',
        maa: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const fetchCartData = async () => {
            const { data, error } = await supabase
                .from('cart')
                .select('*')
                .eq('user_id', supabase.auth.getUser()?.id);

            if (error) {
                setError('Ostoskoria ei voitu ladata.');
                setLoading(false);
                return;
            }

            setCartItems(data || []);
            setLoading(false);
        };

        fetchCartData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        const errors = validateBillingDetails(billingDetails);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        if (cartItems.length === 0) {
            setMessage('Ostoskorisi on tyhjä.');
            return;
        }

        const lineItems = cartItems.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
        }));

        const orderData = {
            user_id: supabase.auth.user()?.id,
            billing: billingDetails,
            line_items: lineItems,
            status: 'pending', // Order status
        };

        // Insert order into Supabase
        const { data, error } = await supabase
            .from('orders')
            .insert([orderData]);

        if (error) {
            console.error(error);
            setMessage('Tilauksen tekeminen epäonnistui. Yritä uudelleen.');
            return;
        }

        // Assuming you have a function to generate a PDF
        const pdfResponse = await generatePdf(data.id, billingDetails, cartItems);
        setPdfUrl(pdfResponse.url);

        setMessage(`Tilaus onnistui! Tilausnumero: ${data.id}`);
        setCartItems([]);
        setBillingDetails({
            sähköposti: '',
            yritys: '',
            osoite: '',
            postinumero: '',
            kaupunki: '',
            maa: '',
        });
    };

    const validateBillingDetails = (details) => {
        const errors = {};
        if (!details.sähköposti) {
            errors.sähköposti = 'Sähköposti on pakollinen.';
        } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,7}$/.test(details.sähköposti)) {
            errors.sähköposti = 'Sähköposti on virheellinen.';
        }
        if (!details.yritys) {
            errors.yritys = 'Yritys on pakollinen.';
        }
        if (!details.osoite) {
            errors.osoite = 'Osoite on pakollinen.';
        }
        if (!details.postinumero) {
            errors.postinumero = 'Postinumero on pakollinen.';
        }
        if (!details.kaupunki) {
            errors.kaupunki = 'Kaupunki on pakollinen.';
        }
        if (!details.maa) {
            errors.maa = 'Maa on pakollinen.';
        }
        return errors;
    };

    return (
        <Layout>
            <main className={styles.mainContent}>
                <div className={styles.leftColumn}>
                    {loading && <p>Ladataan ostoskorin tietoja...</p>}
                    {error && <p className={styles.error}>{error}</p>}
                    {!loading && cartItems.length === 0 && <p>Ostoskorisi on tyhjä.</p>}
                    {!loading && cartItems.length > 0 && (
                        <form className={styles.orderForm} onSubmit={handleSubmit}>
                            <BillingForm billingDetails={billingDetails} setBillingDetails={setBillingDetails} />
                            <button type="submit" className={styles.submitButton}>Lähetä tilaus</button>
                            {message && <p className={styles.message}>{message}</p>}
                            {Object.keys(formErrors).map((key) => (
                                <p key={key} className={styles.error}>{formErrors[key]}</p>
                            ))}
                        </form>
                    )}
                </div>
                <div className={styles.rightColumn}>
                    <h3>Tilausyhteenveto</h3>
                    {cartItems.length > 0 && (
                        <div className={styles.cartDetails}>
                            {cartItems.map((item, index) => (
                                <CartItem key={item.product_id || index} item={item} />
                            ))}
                        </div>
                    )}
                </div>
                <PdfPreview pdfUrl={pdfUrl} />
            </main>
        </Layout>
    );
};

export default OrderForm;
