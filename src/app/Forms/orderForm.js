import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Dashboard/Layout';
import styles from '../Styles/orderForm.module.css';
import CartItem from '../Cart/cartItem';
import BillingForm from '../Components/billingForm';
import PdfPreview from '../Components/pdfPreview';

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

    const fetchCartData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token ei löydy.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('http://truckup.local/wp-json/wc/store/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const items = response.data.items || [];
            setCartItems(items);
            await fetchProductDetails(items);
        } catch (err) {
            setError('Ostoskoria ei voitu ladata.');
        } finally {
            setLoading(false);
        }
    };

    const fetchProductDetails = async (items) => {
        const token = localStorage.getItem('token');
        const productIds = items.map(item => item.id); // Extract product IDs

        try {
            // Fetch product details using product IDs
            const response = await axios.get(`http://truckup.local/wp-json/wc/store/products?include=${productIds.join(',')}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const productDetails = response.data;

            const updatedCartItems = items.map(cartItem => {
                const productDetail = productDetails.find(product => product.id === cartItem.id);
                return {
                    ...cartItem,
                    ...productDetail, 
                };
            });

            setCartItems(updatedCartItems);
        } catch (err) {
            setError('Tuotetietoja ei voitu ladata.');
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (cartItems.length === 0) {
            setMessage('Ostoskorisi on tyhjä.');
            return;
        }

        const lineItems = cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
        }));

        const orderData = {
            payment_method: 'bacs',
            payment_method_title: 'Tilisiirto',
            set_paid: true,
            billing: {
                email: billingDetails.sähköposti,
                company: billingDetails.yritys,
                address_1: billingDetails.osoite,
                postcode: billingDetails.postinumero,
                city: billingDetails.kaupunki,
                country: billingDetails.maa,
            },
            line_items: lineItems,
        };

        try {
            const response = await axios.post('http://truckup.local/wp-json/wc/v3/orders', orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const itemsForPdf = cartItems.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.prices.price || '0',
                weight: item.weight || '0',
            }));

            const pdfResponse = await axios.post('http://truckup.local/wp-json/truckup/v1/generate-pdf', {
                orderId: response.data.id,
                customerName: billingDetails.yritys,
                email: billingDetails.sähköposti,
                items: itemsForPdf,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            setPdfUrl(url);

            setMessage(`Tilaus onnistui! Tilausnumero: ${response.data.id}`);
            setCartItems([]);
            setBillingDetails({
                sähköposti: '',
                yritys: '',
                osoite: '',
                postinumero: '',
                kaupunki: '',
                maa: '',
            });
        } catch (error) {
            console.error(error);
            setMessage('Tilauksen tekeminen epäonnistui. Yritä uudelleen.');
        }
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
