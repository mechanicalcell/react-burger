import { DELETE_ORDER_NUMBER, FEED_IS_VISIBLE, INGREDIENT_IS_VISIBLE, ORDERS_IS_VISIBLE, ORDER_IS_VISIBLE, ORDER_NUMBER_REQUEST, ORDER_TOTAL_PRICE, TOrderActions } from "../actions/order";
import { orderReducer } from "./order";

const initialState = {
  orderNumber: null,
  orderTotalPrice: 0,
  ingredientModalVisible: true,
  feedModalVisible: true,
  orderModalVisible: false,
  ordersModalVisible: true    
};
    
describe('newpassword reducer', () => {
  it(`should return the initial state`, () => {
    expect(orderReducer(undefined, <TOrderActions>{} )).toEqual(initialState)
  })

  it('should handle ORDER_NUMBER_REQUEST', () => {
    const action = {
        type: ORDER_NUMBER_REQUEST,
        data: 16
      }  
    const expectedState = {
        ...initialState, 
        orderNumber: action.data
    }  
    expect(orderReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle DELETE_ORDER_NUMBER', () => {
    const action = {
        type: DELETE_ORDER_NUMBER
      }  
    const expectedState = {
        ...initialState, 
        orderNumber: null    }  
    expect(orderReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle ORDER_TOTAL_PRICE', () => {
    const action = {
        type: ORDER_TOTAL_PRICE,
        orderTotalPrice: 16
      }  
    const expectedState = {
        ...initialState, 
        orderTotalPrice: action.orderTotalPrice    }  
    expect(orderReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle INGREDIENT_IS_VISIBLE', () => {
    const action = {
        type: INGREDIENT_IS_VISIBLE,
        ingredientModalVisible: false || true
      }  
    const expectedState = {
        ...initialState, 
        ingredientModalVisible: action.ingredientModalVisible
    }  
    expect(orderReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FEED_IS_VISIBLE', () => {
    const action = {
        type: FEED_IS_VISIBLE,
        feedModalVisible: false || true
      }  
    const expectedState = {
        ...initialState, 
        feedModalVisible: action.feedModalVisible
    }  
    expect(orderReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle ORDER_IS_VISIBLE', () => {
    const action = {
        type: ORDER_IS_VISIBLE,
        orderModalVisible: false || true
      }  
    const expectedState = {
        ...initialState, 
        orderModalVisible: action.orderModalVisible
    }  
    expect(orderReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle ORDERS_IS_VISIBLE', () => {
    const action = {
        type: ORDERS_IS_VISIBLE,
        ordersModalVisible: false || true
      }  
    const expectedState = {
        ...initialState, 
        ordersModalVisible: action.ordersModalVisible
    }  
    expect(orderReducer(initialState, action)).toEqual(expectedState)
  })

}) 