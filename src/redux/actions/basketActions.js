import { addProduct, removeItem, removeProduct } from '../../services/basketService';

export const ADD_TO_BASKET = 'ADD_TO_BASKET';
export const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET';
export const REMOVE_ITEM_FROM_BASKET = 'REMOVE_ITEM_FROM_BASKET';

export const addToBasket = (cartId, product) => {
  return async (dispatch) => {
    try {
      const response = await addProduct({ cartId, productId: product.id });

      if (response.status === 200) {
        dispatch({
          type: ADD_TO_BASKET,
          payload: response.data
        });
      } else {
        console.warn('Add to basket failed:', response.data.message);
      }
    } catch (error) {
      console.error('Add to basket failed:', error);
    }
  };
};

export const decQuantityFromBasket = (cartId, productId) => {
  return async (dispatch) => {
    try {
      const response = await removeProduct({ cartId, productId });

      if (response.status === 200) {
        dispatch({
          type: REMOVE_FROM_BASKET,
          payload: response.data
        });
      } else {
        console.warn('Remove from basket failed:', response.data.message);
      }
    } catch (error) {
      console.error('Remove from basket failed:', error);
    }
  };
};

export const removeFromBasket = (cartId, itemId) => {
  return async (dispatch) => {
    try {
      const response = await removeItem({ cartId, itemId });

      if (response.status === 200) {
        dispatch({
          type: REMOVE_ITEM_FROM_BASKET,
          payload: response.data
        });
      } else {
        console.warn('Remove from basket failed:', response.data.message);
      }
    } catch (error) {
      console.error('Remove from basket failed:', error);
    }
  };
}