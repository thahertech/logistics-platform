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
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart.');
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

      <div className="flex flex-col justify-center items-center p-8 bg-black-200 w-full">

        <h2 className="text-2xl self-start text-gray-100 font-bold mb-6">Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
  {products.map((product) => {

    const pickupDateMeta = product.meta_data.find(meta => meta.key === 'pickup_date');
    const pickupdate = pickupDateMeta ? pickupDateMeta.value : 'ei saatavilla';

    const deliveryDateMeta = product.meta_data.find(meta => meta.key === 'delivery_date');
    const deliveryDate = deliveryDateMeta ? deliveryDateMeta.value : 'ei saatavilla'

    return (
                <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg" onClick={() => openModal(product)}>
                <h3 className="text-gray-600 mb-1"><strong>Toimitus: </strong> {deliveryDate}</h3>
                <p className="text-gray-600 mb-1"><strong>Nouto: </strong> {pickupdate}</p>

                {/* <img
                    src={product.images[0]?.src || 'default-image.jpg'}
                    alt={product.name}
                    className="w-full h-auto mb-2 cursor-pointer"
                    onClick={() => openModal(product)}
                  /> */}
                  <p className="text-gray-600 mb-1"><strong>Hinta: </strong> {product.price} €</p>
                  <p className="text-gray-600 mb-1"><strong>Lisätietoa: </strong></p>
                  <div className="text-gray-600 mb-1" dangerouslySetInnerHTML={{ __html: product.description }} />

                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="bg-blue-500 text-white rounded p-2 w-full"
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