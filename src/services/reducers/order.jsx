import { ORDER_NUMBER_REQUEST,
         DELETE_ORDER_NUMBER,
         ORDER_TOTAL_PRICE,
         INGREDIENT_IS_VISIBLE,
         ORDER_IS_VISIBLE
} from '../actions/order';

const initialState = {
  orderNumber: null,
  orderTotalPrice: 0,
  ingredientModalVisible: true,
  orderModalVisible: false  
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
    case ORDER_TOTAL_PRICE: {
      return {
        ...state,
        orderTotalPrice: action.payload
      };
    }
    case INGREDIENT_IS_VISIBLE: {
      return {
        ...state,
        ingredientModalVisible: action.payload
      };
    }
    case ORDER_IS_VISIBLE: {
      return {
        ...state,
        orderModalVisible: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
