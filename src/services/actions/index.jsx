import { getIngredients, 
         logoutRequest } from "../api";
import { checkResponse } from "../../components/utils/check-response";         
import { RESET_USER } from "./login";

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

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

export function userLogout(refreshToken) { 
  return function(dispatch) {
    logoutRequest(refreshToken) 
    .then(checkResponse)
    .then(res => dispatch({ type: RESET_USER,
                            payload: res,
                            userLogout: null }) 
    )
    .catch(e => console.log(e))
  };
}