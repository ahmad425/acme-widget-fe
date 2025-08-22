import { Container, ListGroup, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import Product from './Product';
import { getAllProducts } from '../../services/productService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Products</h2>

      {loading && <Spinner animation="border" />}

      <ListGroup>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ListGroup>
    </Container>
  );
};

export default Products;