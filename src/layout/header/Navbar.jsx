import { Badge, Button } from 'react-bootstrap';
import React, { useMemo, useState } from 'react';

import BasketModal from '../../components/basket/BasketModal';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [showBasket, setShowBasket] = useState(false);
  
  const { id: cartId, items } = useSelector((state) => state.basket);
  
  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  
  return (
    <>
      <div className='d-flex align-items-center justify-content-between my-2 mx-3'>
        <h3>Acme Widget</h3>
        {cartId && (
            <Button variant="primary" onClick={() => setShowBasket(true)}>
              <span>View Basket</span>
              <Badge bg="secondary" className='ms-2'>{totalQuantity}</Badge>
            </Button>
        )}
      </div>

      <BasketModal show={showBasket} handleClose={() => setShowBasket(false)} />
    </>
  );
};

export default Navbar;
