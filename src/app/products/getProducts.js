import axios from 'axios';
import { useEffect, useState } from 'react';

const WooCommerceProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://truckup.local/wp-json/wc/v3/products', {
          headers: {
            Authorization: `Basic ${btoa(NEXT_PUBLIC_WOO_COMMERCE)}`
          }
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default WooCommerceProducts;
