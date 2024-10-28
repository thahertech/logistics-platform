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
  const [filteredProducts, setFilteredProducts] = useState([]);
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
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://truckup.local/wp-json/wc/v3/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filtered products with all products
      } catch (error) {
        console.error('Virhe tuotteiden hakemisessa:', error);
        setError('Tuotteiden haku epäonnistui.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      const pickupDateMeta = product.meta_data.find(meta => meta.key === 'pickup_date');
      const deliveryDateMeta = product.meta_data.find(meta => meta.key === 'delivery_date');

      const pickupLocationMatches = 
        !filters.pickupLocation || 
        (product.pickup_location && product.pickup_location.includes(filters.pickupLocation));
      
      const deliveryLocationMatches = 
        !filters.deliveryLocation || 
        (product.delivery_location && product.delivery_location.includes(filters.deliveryLocation));

      const priceMatches = !filters.price || product.price <= filters.price;

      const dateMatches = 
        filters.date === 'now' || 
        (deliveryDateMeta && deliveryDateMeta.value.includes(filters.date));

      const transportTypeMatches = 
        !filters.transportType.length || 
        filters.transportType.includes(product.transport_type);

      return pickupLocationMatches && deliveryLocationMatches && priceMatches && dateMatches && transportTypeMatches;
    });
    setFilteredProducts(filtered); // Update the filtered products
  }, [filters, products]); // Only depend on filters and products

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
      alert('Tuote lisätty ostoskoriin!');
    } catch (error) {
      console.error('Virhe tuotteen lisäämisessä ostoskoriin:', error);
      alert('Virhe: tuotetta ei voitu lisätä ostoskoriin.');
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

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Layout>
      <div className="flex flex-col p-8 bg-black w-full text-white min-h-screen">
        <h2 className="text-3xl self-start font-bold mb-6">Tuotteet</h2>

        <div className="flex">
          <div className="w-1/4">
            <FilterSidebar applyFilters={applyFilters} />
          </div>
          <div className="flex-1">
            {loading ? (
              <p>Ladataan tuotteita...</p>
            ) : error ? (
              <p className="text-red-400">{error}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {filteredProducts.map((product) => {
                  const pickupDateMeta = product.meta_data.find(meta => meta.key === 'pickup_date');
                  const pickupdate = pickupDateMeta ? pickupDateMeta.value : 'ei saatavilla';

                  const deliveryDateMeta = product.meta_data.find(meta => meta.key === 'delivery_date');
                  const deliveryDate = deliveryDateMeta ? deliveryDateMeta.value : 'ei saatavilla';

                  return (
                    <div key={product.id} className="bg-gray-900 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl" onClick={() => openModal(product)}>
                      <h3 className="text-white mb-2"><strong>Toimitus: </strong>{deliveryDate}</h3>
                      <p className="text-white mb-2"><strong>Nouto: </strong>{pickupdate}</p>
                      <p className="text-white mb-2"><strong>Hinta: </strong>{product.price} €</p>
                      <p className="text-white mb-2"><strong>Lisätietoja: </strong></p>
                      <div className="text-gray-400 mb-2" dangerouslySetInnerHTML={{ __html: product.description }} />

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product.id);
                        }}
                        className="bg-gray-700 hover:bg-gray-600 text-white rounded p-2 w-full transition-all"
                        aria-label={`Lisää ${product.name} ostoskoriin`}
                      >
                        Lisää ostoskoriin
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
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
