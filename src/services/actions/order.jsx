import { getOrderNumber } from "../api";
import { checkResponse } from "../../components/utils/check-response";

export const ORDER_NUMBER_REQUEST = 'ORDER_NUMBER_REQUEST';
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';

export function getOrder(ingredientId) { 
  return function(dispatch) {
    getOrderNumber(ingredientId)
    .then(checkResponse)
    .then(res => dispatch({ type: ORDER_NUMBER_REQUEST,
                            data: res.order.number })
    )
    .catch(e => console.log(e))
  };
}  
  

