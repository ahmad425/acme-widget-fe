import { Button, ButtonGroup, ListGroup, Modal } from 'react-bootstrap';
import React, { useMemo } from 'react';
import {
  addToBasket,
  decQuantityFromBasket,
  removeFromBasket
} from '../../redux/actions/basketActions';
import { useDispatch, useSelector } from 'react-redux';

const BasketModal = ({ show, handleClose }) => {
  const { id: cartId, items, deliveryCost, total, isOfferApplied } = useSelector((state) => state.basket);

  const totalPrice = useMemo(() => {
    const parsedTotal = Number(total) || 0;
    const parsedDelivery = Number(deliveryCost) || 0;
  
    return parsedTotal + parsedDelivery;
  }, [total, deliveryCost]);

  const dispatch = useDispatch();

  const handleIncreaseQuantity = (product) => dispatch(addToBasket(cartId, product));

  const handleDecreaseQuantity = (product) => dispatch(decQuantityFromBasket(cartId, product.id));

  const handleRemoveProduct = (itemId) => dispatch(removeFromBasket(cartId, itemId));

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Your Basket</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {items.length === 0 ? (
          <p>Your basket is empty.</p>
        ) : (
          <ListGroup variant="flush">
            {items.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6 className="mb-0">{item.product?.name}</h6>
                  <small className="text-muted">Price: ${item.product?.price}</small>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <ButtonGroup size="sm">
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleDecreaseQuantity(item.product)}
                    >
                      −
                    </Button>
                    <Button variant="light" disabled>
                      {item.quantity}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleIncreaseQuantity(item.product)}
                    >
                      +
                    </Button>

                    <Button
                      variant="outline-danger"
                      className='ms-3'
                      size="sm"
                      onClick={() => handleRemoveProduct(item.id)}
                    >
                      ❌
                    </Button>
                  </ButtonGroup>

                  <span className="fw-bold">
                    ${(item.product?.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              </ListGroup.Item>
            ))}

            <ListGroup.Item className="d-flex justify-content-between align-items-center mt-4">
              <h6 className="mb-0">{isOfferApplied ? 'Total after applying offer:' : 'Subtotal'}</h6>
              <h6 className="mb-0">${total.toFixed(2)}</h6>
            </ListGroup.Item>

            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Delivery Cost</h6>
              <h6 className="mb-0">${deliveryCost}</h6>
            </ListGroup.Item>
          </ListGroup>
        )}
      </Modal.Body>

      <Modal.Footer>
        <h5 className="me-auto">Total: ${totalPrice.toFixed(2)}</h5>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BasketModal;
