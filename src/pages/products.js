import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../app/dashboard/Layout';
import '../app/globals.css';
import Modal from '../app/components/Modal';
import FilterSidebar from '@/app/components/sideBar';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://truckup.local/wp-json/wc/v3/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://truckup.local/wp-json/wc/store/cart/add-item', {
        id: productId,
        quantity: 1,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Virhe, tuotetta ei voitu lisätä ostoskoriin.');
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center p-8 bg-black w-full text-white min-h-screen">

        <h2 className="text-3xl self-start text-white font-bold mb-6">Products</h2>
        
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {products.map((product) => {

              const pickupDateMeta = product.meta_data.find(meta => meta.key === 'pickup_date');
              const pickupdate = pickupDateMeta ? pickupDateMeta.value : 'ei saatavilla';

              const deliveryDateMeta = product.meta_data.find(meta => meta.key === 'delivery_date');
              const deliveryDate = deliveryDateMeta ? deliveryDateMeta.value : 'ei saatavilla';

              return (
                <div key={product.id} className="bg-gray-900 p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl" onClick={() => openModal(product)}>
                  <h3 className="text-white mb-2"><strong>Toimitus: </strong>{deliveryDate}</h3>
                  <p className="text-white mb-2"><strong>Nouto: </strong>{pickupdate}</p>
                  
                  {/* <img
                    src={product.images[0]?.src || 'default-image.jpg'}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded mb-4"
                    onClick={() => openModal(product)}
                  /> */}
                  
                  <p className="text-white mb-2"><strong>Hinta: </strong>{product.price} €</p>
                  <p className="text-white mb-2"><strong>Lisätietoa: </strong></p>
                  <div className="text-gray-400 mb-2" dangerouslySetInnerHTML={{ __html: product.description }} />
                  
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="bg-gray-700 hover:bg-gray-600 text-white rounded p-2 w-full transition-all"
                  >
                    Lisää ostoskoriin
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </Layout>
  );
};

export default Products;