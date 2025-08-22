import http from './http';

export function addProduct(payload) {
  const { cartId, productId } = payload;
  const url = '/api/carts/:id/add_product'.replace(':id', cartId);

  return http.post(url, {
    product_id: productId
  });
}

export function removeProduct(payload) {
  const { cartId, productId } = payload;
  const url = '/api/carts/:id/remove_product'.replace(':id', cartId);

  return http.delete(url, {
    data: {
      product_id: productId
    }
  });
}

export function removeItem(payload) {
  const { cartId, itemId } = payload;
  const url = '/api/carts/:id/remove_item'.replace(':id', cartId);

  return http.delete(url, {
    data: {
      cart_item_id: itemId
    }
  });
}