import { ORDER_NUMBER_REQUEST,
    DELETE_ORDER_NUMBER,
    ORDER_TOTAL_PRICE,
    INGREDIENT_IS_VISIBLE,
    FEED_IS_VISIBLE,
    ORDER_IS_VISIBLE,
    ORDERS_IS_VISIBLE,
    TOrderActions
} from '../actions/order';

const initialState: {
  orderNumber: number | null,
  orderTotalPrice: number,
  ingredientModalVisible: boolean,
  feedModalVisible: boolean,
  orderModalVisible: boolean,
  ordersModalVisible: boolean  
  } = {
orderNumber: null,
orderTotalPrice: 0,
ingredientModalVisible: true,
feedModalVisible: true,
orderModalVisible: false,
ordersModalVisible: true  
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
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
   orderTotalPrice: action.orderTotalPrice
 };
}
case INGREDIENT_IS_VISIBLE: {
 return {
   ...state,
   ingredientModalVisible: action.ingredientModalVisible
 };
}
case FEED_IS_VISIBLE: {
 return {
   ...state,
   feedModalVisible: action.feedModalVisible
 };
}
case ORDER_IS_VISIBLE: {
 return {
   ...state,
   orderModalVisible: action.orderModalVisible
 };
}
case ORDERS_IS_VISIBLE: {
 return {
   ...state,
   ordersModalVisible: action.ordersModalVisible
 };
}
default: {
 return state;
}
}
};
