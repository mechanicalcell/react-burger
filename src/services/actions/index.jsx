import { getIngredients, getOrderNumber, checkResponse } from "../../components/app/app";

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const COPY_ARR_BUN = 'COPY_ARR_BUN';
export const COPY_ARR_INGREDIENTS = 'COPY_ARR_INGREDIENTS';
export const DELETE_INGREDIENTS = 'DELETE_INGREDIENTS';
export const DELETE_INGREDIENT_DETAIL = 'DELETE_INGREDIENT_DETAIL';

export const ORDER_NUMBER_REQUEST = 'ORDER_NUMBER_REQUEST';
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';

export const MOVE_INGREDIENTS = 'MOVE_INGREDIENTS';
export const MOVE_BUNS = 'MOVE_BUNS';

export const COUNT_BUN_UP = 'COUNT_BUN_UP';
export const COUNT_BUN_DOWN = 'COUNT_BUN_DOWN';
export const COUNT_INGREDIENT_UP = 'COUNT_INGREDIENT_UP';
export const COUNT_INGREDIENT_DOWN = 'COUNT_INGREDIENT_DOWN';

export function getItems() { 
  return function(dispatch) {
    dispatch({ type: GET_INGREDIENTS });
    getIngredients()
    .then(checkResponse)
    .then(res => {
      if (res.success) {
        dispatch({ type: GET_INGREDIENTS_SUCCESS,
                   data: res.data.map((item, index) => { return {...item, index: index } })
        });
      } else {
        dispatch({ type: GET_INGREDIENTS_FAILED });
      }
    });
  };
}  

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