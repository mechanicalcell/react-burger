import { ORDER_NUMBER_REQUEST,
         DELETE_ORDER_NUMBER,
} from '../actions/order';

const initialState = {
  orderNumber: null
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderNumber: action.data
      };
    }
    case DELETE_ORDER_NUMBER: {
      return { 
        ...state,
        orderNumber: null
      }
    }
    default: {
      return state;
    }
  }
};
