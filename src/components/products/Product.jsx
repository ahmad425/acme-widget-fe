import { Button, ListGroup, Toast, ToastContainer } from 'react-bootstrap';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addToBasket } from '../../redux/actions/basketActions';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const cartId = useSelector((state) => state.basket.id);
  
  const handleAddToBasket = (product) => { 
    dispatch(addToBasket(cartId || 0, product));
    
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-center py-3 border-bottom"
    >
      <div className="d-flex flex-column">
        <span className="fw-bold">{product.name}</span>
        <small className="text-muted">{product.code}</small>
      </div>
      <div className="text-end fw-semibold">${product.price}</div>
      <div>
        <Button variant="primary" onClick={() => handleAddToBasket(product)}>
          Add to Basket
        </Button>
      </div>

      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          bg="success"
          delay={2000}
          autohide
        >
          <Toast.Body className="text-white">
            Product added to cart!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </ListGroup.Item>
  );
};

export default Product;