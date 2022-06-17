import { getOrderNumber } from "../api";
import { AppDispatch, AppThunk } from "../..";

export const ORDER_NUMBER_REQUEST: 'ORDER_NUMBER_REQUEST' = 'ORDER_NUMBER_REQUEST';
export const DELETE_ORDER_NUMBER: 'DELETE_ORDER_NUMBER' = 'DELETE_ORDER_NUMBER';
export const INGREDIENT_IS_VISIBLE: 'INGREDIENT_IS_VISIBLE' = 'INGREDIENT_IS_VISIBLE';
export const FEED_IS_VISIBLE: 'FEED_IS_VISIBLE' = 'FEED_IS_VISIBLE';
export const ORDER_IS_VISIBLE: 'ORDER_IS_VISIBLE' = 'ORDER_IS_VISIBLE';
export const ORDERS_IS_VISIBLE: 'ORDERS_IS_VISIBLE' = 'ORDERS_IS_VISIBLE';
export const ORDER_TOTAL_PRICE: 'ORDER_TOTAL_PRICE' = 'ORDER_TOTAL_PRICE';

export interface IOrderNumberRequestAction {
  readonly type: typeof ORDER_NUMBER_REQUEST;
  data: number
}

export interface IDeleteOrderNumberAction {
  readonly type: typeof DELETE_ORDER_NUMBER;
}

export interface IIngredientIsVisibleAction {
  readonly type: typeof INGREDIENT_IS_VISIBLE;
  ingredientModalVisible: boolean
}

export interface IFeedIsVisibleAction {
  readonly type: typeof FEED_IS_VISIBLE;
  feedModalVisible: boolean
}

export interface IOrderIsVisibleAction {
  readonly type: typeof ORDER_IS_VISIBLE;
  orderModalVisible: boolean
}

export interface IOrdersIsVisibleAction {
  readonly type: typeof ORDERS_IS_VISIBLE;
  ordersModalVisible: boolean
}

export interface IOrderTotalPriceAction {
  readonly type: typeof ORDER_TOTAL_PRICE;
  orderTotalPrice: number
}

export const getOrderNumberRequestAction = (data: number): IOrderNumberRequestAction => ({
  type: ORDER_NUMBER_REQUEST,
  data
});
  
export const deleteOrderNumberAction = (): IDeleteOrderNumberAction => ({
  type: DELETE_ORDER_NUMBER,
});

export const orderIsVisibleAction = (orderModalVisible: boolean): IOrderIsVisibleAction => ({
  type: ORDER_IS_VISIBLE,
  orderModalVisible 
});

export const ordersIsVisibleAction = (ordersModalVisible: boolean): IOrdersIsVisibleAction => ({
  type: ORDERS_IS_VISIBLE,
  ordersModalVisible 
});

export const ingredientIsVisibleAction = (ingredientModalVisible: boolean): IIngredientIsVisibleAction => ({
  type: INGREDIENT_IS_VISIBLE,
  ingredientModalVisible 
});

export const feedIsVisibleAction = (feedModalVisible: boolean): IFeedIsVisibleAction => ({
  type: FEED_IS_VISIBLE,
  feedModalVisible 
});

export const orderTotalPriceAction = (orderTotalPrice: number): IOrderTotalPriceAction => ({
  type: ORDER_TOTAL_PRICE,
  orderTotalPrice
});

export type TOrderActions =
  | IOrderNumberRequestAction
  | IDeleteOrderNumberAction
  | IIngredientIsVisibleAction
  | IFeedIsVisibleAction
  | IOrderIsVisibleAction
  | IOrdersIsVisibleAction
  | IOrderTotalPriceAction;

export const getOrder: AppThunk = (ingredientId) => { 
  return async function(dispatch: AppDispatch) {
    try {
      const res = await getOrderNumber(ingredientId)
      const r = await Promise.resolve(res)
      if (r.success) {
        dispatch(getOrderNumberRequestAction(r.order.number))
    } else {
        return await Promise.reject(r);
      }
    } catch (r: any) {
        console.log(r)
      } 
  }
}
  

