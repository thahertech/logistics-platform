import React, { useEffect, useState } from 'react';
import Layout from '@/app/Dashboard/Layout';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../app/globals.css';
import { useForm } from 'react-hook-form';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [orders, setOrders] = useState([]); // State for orders


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User not signed in.');
      setLoading(false);
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.data.user.id;

        const response = await axios.get(`http://truckup.local/wp-json/wp/v2/users/${userId}?_fields=name,acf`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        const { name } = userData;
        const acf = userData.acf || {};

        setUserDetails({
          name: name,
          email: acf['email'] || '',
          yTunnus: acf['y-tunnus'] || '',
          contactPerson: acf['contact_person'] || '',
          phoneNumber: acf['phone_number'] || '',
          bankNumber: acf['bank_number'] || '',
          nettisivut: acf['nettisivut'] || '',
          companyName: acf['company_name'] || '',
          companyAddress: acf['company_address'] || '',
          newsLetter: acf['news_letter'] || false,
          kayttoehdot: acf['kayttoehdot'] || false,
        });

        reset({
          name: name,
          email: acf['email'] || '',
          'y-tunnus': acf['y-tunnus'] || '',
          'contact_person': acf['contact_person'] || '',
          'phone_number': acf['phone_number'] || '',
          'bank_number': acf['bank_number'] || '',
          nettisivut: acf['nettisivut'] || '',
        });
      } catch (error) {
        setError('Failed to fetch user details.');
      } finally {
        setLoading(false);
      }
    };

    // const fetchProducts = async () => {
    //   try {
    //     const response = await axios.get('http://truckup.local/wp-json/wc/v3/products', {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     setProducts(response.data);
    //   } catch (error) {
    //     setError('Failed to fetch products.');
    //   }
    // };
  //   const fetchOrders = async () => {  // New function to fetch orders
  //     try {
  //         const response = await axios.get('http://truckup.local/wp-json/wc/v3/orders', {
  //             headers: {
  //                 Authorization: `Bearer ${token}`,
  //             },
  //         });
  //         setOrders(response.data);
  //         console.log(response.data);
  //     } catch (error) {
  //         setError('Failed to fetch orders.');
  //     }
  // };

  const fetchUserOrders = async () => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.data.user.id;

  
    try {
      const response = await axios.get('http://truckup.local/wp-json/wc/v3/orders', {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is correct and not expired
        },
        params: {
          customer: userId, // replace 'user_id_here' with the actual user ID if needed
        }
      });
      console.log('User Orders:', response.data);
    } catch (error) {
      console.error('Error fetching user orders:', error.response?.data);
    }
  };
  

  fetchUserDetails();
  // fetchProducts();
  fetchUserOrders(); // Call the fetch orders function
}, [reset]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://truckup.local/wp-json/wp/v2/update-user', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      setError('Failed to update profile.');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (data) => {
    const token = localStorage.getItem('token');

    try {
      const updatedData = {
        ...data,
        meta_data: [
          { id: 687, key: "pickup_date", value: data.pickup_date },
          { id: 688, key: "delivery_date", value: data.delivery_date },
          { id: 689, key: "price", value: data.price },
          { id: 690, key: "y_tunnus", value: data.y_tunnus },
        ],
      };

      await axios.put(`http://truckup.local/wp-json/wc/v3/products/${editingProduct.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) =>
        prev.map((prod) => (prod.id === editingProduct.id ? { ...prod, ...updatedData } : prod))
      );
      setEditingProduct(null);
      alert('Product updated successfully!');
    } catch (error) {
      setError('Failed to update product.');
    }
  };

  const closeEditModal = () => {
    setEditingProduct(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <Layout>
      <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl text-center font-bold mb-6">Profiili</h2>

        <div className="flex justify-between mb-4">
    <button
        className={`px-4 py-2 rounded ${activeTab === 'profile' ? 'bg-blue-600' : 'bg-gray-700'}`}
        onClick={() => setActiveTab('profile')}
    >
        Profiili
    </button>
    <button
        className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-600' : 'bg-gray-700'}`}
        onClick={() => setActiveTab('products')}
    >
        Tuotteet
    </button>
    <button
        className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-600' : 'bg-gray-700'}`}
        onClick={() => setActiveTab('orders')}
    >
        Tilaukset
    </button>
</div>


        {activeTab === 'profile' && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Profile Fields */}
            <div className="mb-4">
              <label className="block mb-2">Nimi:</label>
              <input type="text" {...register('name')} className="border border-gray-600 rounded w-full p-2 bg-gray-700" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Sähköposti:</label>
              <input type="email" {...register('email')} className="border border-gray-600 rounded w-full p-2 bg-gray-700" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Y-Tunnus:</label>
              <input type="text" {...register('y-tunnus')} className="border border-gray-600 rounded w-full p-2 bg-gray-700" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Yhteyshenkilö:</label>
              <input type="text" {...register('contact_person')} className="border border-gray-600 rounded w-full p-2 bg-gray-700" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Puhelinnumero:</label>
              <input type="text" {...register('phone_number')} className="border border-gray-600 rounded w-full p-2 bg-gray-700" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Pankkitili:</label>
              <input type="text" {...register('bank_number')} className="border border-gray-600 rounded w-full p-2 bg-gray-700" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Nettisivut:</label>
              <input type="url" {...register('nettisivut')} className="border border-gray-600 rounded w-full p-2 bg-gray-700" />
            </div>
            <button type="submit" className="bg-blue-600 text-white rounded p-2 w-full">Päivitä profiili</button>
          </form>
        )}

        {activeTab === 'products' && (
          <div>
            <h3 className="text-lg font-bold mb-4">Omat tuotteet</h3>
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 mb-4 bg-gray-800 shadow">
                  <p><strong>Nimi:</strong> {product.name}</p>
                  <p><strong>Hinta:</strong> {product.price} €</p>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="mt-2 bg-blue-600 text-white rounded p-2"
                  >
                    Muokkaa
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center">Ei julkaistuja kuljetuksia.</p>
            )}
          </div>
        )}

        {editingProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-gray-800 rounded-lg p-6 w-96">
              <h3 className="text-xl font-bold mb-4">Muokkaa tuotetta</h3>
              <form onSubmit={handleSubmit(handleUpdateProduct)}>
                <input
                  type="text"
                  defaultValue={editingProduct.name}
                  {...register('name')}
                  className="border border-gray-600 rounded w-full p-2 mb-4 bg-gray-700 text-white"
                />
                <input
                  type="number"
                  defaultValue={editingProduct.price}
                  {...register('price')}
                  className="border border-gray-600 rounded w-full p-2 mb-4 bg-gray-700 text-white"
                />
                <input
                  type="date"
                  defaultValue={editingProduct.meta_data.find(meta => meta.key === 'pickup_date')?.value || ''}
                  {...register('pickup_date')}
                  className="border border-gray-600 rounded w-full p-2 mb-4 bg-gray-700 text-white"
                />
                <input
                  type="date"
                  defaultValue={editingProduct.meta_data.find(meta => meta.key === 'delivery_date')?.value || ''}
                  {...register('delivery_date')}
                  className="border border-gray-600 rounded w-full p-2 mb-4 bg-gray-700 text-white"
                />
                <input
                  type="text"
                  defaultValue={editingProduct.meta_data.find(meta => meta.key === 'y_tunnus')?.value || ''}
                  {...register('y_tunnus')}
                  className="border border-gray-600 rounded w-full p-2 mb-4 bg-gray-700 text-white"
                />
                <button type="submit" className="bg-blue-600 text-white rounded p-2 w-full">Päivitä tuote</button>
                <button type="button" onClick={closeEditModal} className="mt-2 text-red-500">Peruuta</button>
              </form>
            </div>
          </div>
        )}
        {activeTab === 'orders' && (
    <div>
        <h3 className="text-lg font-bold mb-4">Omat tilaukset</h3>
        {orders.length > 0 ? (
            orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 mb-4 bg-gray-800 shadow">
                    <p><strong>Tilausnumero:</strong> {order.number}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Yhteensä:</strong> {order.total} €</p>
                    <p><strong>Päivämäärä:</strong> {new Date(order.date_created).toLocaleDateString()}</p>
                    {/* Add more fields as necessary */}
                </div>
            ))
        ) : (
            <p className="text-center">Ei tilauksia.</p>
        )}
    </div>
)}

      </div>
    </Layout>
  );
};

export default Profile;