import { getIngredients, 
         getOrderNumber, 
         checkResponse, 
         passwordResetRequest, 
         userRegistrationRequest,
         newPasswordRequest,
         loginRequest,
         logoutRequest, 
         getUserDataRequest,
         patchUserDataRequest,
         tokenRefreshRequest} from "../../components/app/app";

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

export const DELETE_COUNT = 'DELETE_COUNT';
export const DELETE_BURGER_CONSTRUCTOR = 'DELETE_BURGER_CONSTRUCTOR';

export const REORDER_BURGER_CONSTRUCTOR = 'REORDER_BURGER_CONSTRUCTOR';

export const PASSWORD_REQUEST = 'PASSWORD_REQUEST';
export const NEW_PASSWORD = 'NEW_PASSWORD';
export const NEW_PASSWORD_INPUT = 'NEW_PASSWORD_INPUT';
export const CODE_INPUT = 'CODE_INPUT';

export const REGISTER_NAME_INPUT = 'REGISTER_NAME_INPUT';
export const REGISTER_EMAIL_INPUT = 'REGISTER_EMAIL_INPUT';
export const REGISTER_PASSWORD_INPUT = 'REGISTER_PASSWORD_INPUT';

export const PROFILE_NAME_INPUT = 'PROFILE_NAME_INPUT';
export const PROFILE_EMAIL_INPUT = 'PROFILE_EMAIL_INPUT';
export const PROFILE_PASSWORD_INPUT = 'PROFILE_PASSWORD_INPUT';

export const GET_PROFILE_RESULT = 'GET_PROFILE_RESULT';
export const PATCH_PROFILE_RESULT = 'PATCH_PROFILE_RESULT';

export const LOGIN_EMAIL_INPUT = 'LOGIN_EMAIL_INPUT';
export const LOGIN_PASSWORD_INPUT = 'LOGIN_PASSWORD_INPUT';

export const USER_REGISTRATION = 'USER_REGISTRATION';
export const USER_LOGIN = 'USER_LOGIN';
export const RESET_USER = 'RESET_USER';

export const TOKEN_NULL = 'TOKEN_NULL';
export const TOKEN_REFRESH = 'TOKEN_REFRESH';
export const INGREDIENT_ID = 'INGREDIENT_ID';

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

export function getPasswordReset(email) { 
  return function(dispatch) {
    passwordResetRequest(email)
    .then(checkResponse)
    .then(res => dispatch({ type: PASSWORD_REQUEST,
                            payload: res })
    )
    .catch(e => console.log(e))
  };
}  

export function getNewPassword(newPassword, code) { 
  return function(dispatch) {
    newPasswordRequest(newPassword, code)
    .then(checkResponse)
    .then(res => dispatch({ type: NEW_PASSWORD,
                            newPassword: res })
    )
    .catch(e => console.log(e))
  };
}  

export function userRegistration(name, email, password) { 
  return function(dispatch) {
    userRegistrationRequest(name, email, password)
    .then(checkResponse)
    .then(res => dispatch({ type: USER_REGISTRATION,
                            payload: res })
    )
    .catch(e => console.log(e))
  };
}  

export function userLogin(email, password) { 
  return function(dispatch) {
    loginRequest(email, password)
    .then(checkResponse)
    .then(res => dispatch({ type: USER_LOGIN, 
                            payload: res,
                            userLogin: res.user })
    )
    .catch(e => console.log(e))
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

export function getProfileResult(accessToken) { 
  return async function(dispatch) {
    const res = await getUserDataRequest(accessToken)
    console.log(res)
      if (res && res.success) { 
        dispatch({ type: GET_PROFILE_RESULT,
        payload: res }) 
      } else
      if (
        res.message === "jwt expired" ||
        res.message === "Token is invalid"
      ) {  
        dispatch({ type: TOKEN_NULL })
        const res = await getUserDataRequest(accessToken)
        console.log(res)  
        if (res.success) {
               dispatch({ type: GET_PROFILE_RESULT,
               payload: res }) 
        } 
      }
  }
}
  
export function patchProfileResult(accessToken, name, email, password) { 
  return function(dispatch) {
    patchUserDataRequest(accessToken, name, email, password) 
    .then(checkResponse)
    .then(res => dispatch({ type: PATCH_PROFILE_RESULT,
                            payload: res }) 
    )
    .catch(e => console.log(e))
  };
}  

export function tokenRefreshResult(refreshToken) { 
  return function(dispatch) {
    tokenRefreshRequest(refreshToken) 
    .then(checkResponse)
    .then(res => dispatch({ type: TOKEN_REFRESH,
                            success: res.success,
                            accessToken: res.accessToken,
                            refreshToken: res.refreshToken })
    )
    .catch(e => console.log(e))
  };
}  