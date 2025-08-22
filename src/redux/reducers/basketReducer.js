import { ADD_TO_BASKET, REMOVE_FROM_BASKET, REMOVE_ITEM_FROM_BASKET } from '../actions/basketActions';

const initialState = {
  id: null,
  items: [],
  deliveryCost: 0,
  total: 0,
  isOfferApplied: false
};

const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
    case REMOVE_FROM_BASKET:
    case REMOVE_ITEM_FROM_BASKET:
      return {
        ...state,
        id: action.payload.id,
        deliveryCost: action.payload.delivery_cost,
        total: Number(action.payload.total),
        isOfferApplied: action.payload.offer_applied,
        items: [...action.payload.cart_items]
      };

    default:
      return state;
  }
};

export default basketReducer;