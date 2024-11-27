import React, { useState, useEffect } from 'react';
import Layout from '../app/Dashboard/Layout';
import '../app/globals.css';
import Modal from '../app/Components/Modal';
import FilterSidebar from '@/app/Components/sideBar';
import { supabase } from '../supabaseClient'; // Import Supabase client

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    price: '',
    date: 'now',
    transportType: [],
    time: 'now',
    specificTime: '',
  });

  useEffect(() => {
    const fetchShipments = async () => {
      // Fetch shipments data from Supabase
      const { data, error } = await supabase
        .from('shipments')  // Your Supabase table name
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching shipments: ", error);
      } else {
        setProducts(data);  // Store the fetched shipments in the state
        setFilteredProducts(data);  // Initialize filtered products
      }
    };

    fetchShipments();  // Fetch shipments on component mount
  }, []);

  useEffect(() => {
    // Apply filters on products (you can enhance this as needed)
    const filtered = products.filter((product) => {
      const pickupLocationMatches = 
        !filters.pickupLocation || 
        product.pickup_address.includes(filters.pickupLocation);

      const deliveryLocationMatches = 
        !filters.deliveryLocation || 
        product.delivery_address.includes(filters.deliveryLocation);

      const priceMatches = !filters.price || product.price <= filters.price;

      return pickupLocationMatches && deliveryLocationMatches && priceMatches;
    });
    setFilteredProducts(filtered);
  }, [filters, products]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const handleAddToCart = (product) => {
    addToCart(product);
    onClose(); // Close the modal after adding to the cart
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Layout>
      <div className="flex flex-col p-8 bg-black w-full text-white min-h-screen">
        <h2 className="text-3xl self-start font-bold mb-6">Tuotteet</h2>

        <div className="flex">
          <div className="w-1/4">
            <FilterSidebar applyFilters={setFilters} />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-900 p-6 rounded-lg shadow-lg cursor-pointer"
                  onClick={() => openModal(product)}
                >
                  <h3 className="text-white mb-2">{product.shipment_identifier}</h3>
                  <p className="text-white mb-2">{product.price} €</p>
                  <p className="text-gray-400 mb-2">{product.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for product details */}
      {isModalOpen && selectedProduct && (
        <Modal onClose={closeModal}>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white">{selectedProduct.shipment_identifier}</h3>
            <p className="text-white">{selectedProduct.price} €</p>
            <p className="text-gray-400 mb-4">{selectedProduct.details}</p>
            <div className="text-gray-300">
              <p><strong>Nouto</strong> {selectedProduct.pickup_address}</p>
              <p><strong>Toimitus</strong> {selectedProduct.delivery_address}</p>
              <p><strong>Ajankohta</strong> {new Date(selectedProduct.pickup_date).toLocaleString()}</p>
              <p><strong>Toimitus Ajankohta</strong> {new Date(selectedProduct.delivery_date).toLocaleString()}</p>
            </div>
            <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Poistu</button>
            <button onClick={handleAddToCart} className='mt-4 bg-blue-500 ml-2 text-white px-4 py-2 rounded'>Osta</button>
          </div>
        </Modal>
      )}
    </Layout>
  );
};

export default Products;
