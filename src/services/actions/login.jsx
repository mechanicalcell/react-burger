import { tokenRefreshRequest } from "../api";
import { loginRequest } from "../api";
import { checkResponse } from "../../components/utils/check-response";

export const LOGIN_EMAIL_INPUT = 'LOGIN_EMAIL_INPUT';
export const LOGIN_PASSWORD_INPUT = 'LOGIN_PASSWORD_INPUT';
export const USER_LOGIN = 'USER_LOGIN';
export const RESET_USER = 'RESET_USER';
export const TOKEN_REFRESH = 'TOKEN_REFRESH';
export const SET_USER = 'SET_USER';

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

export function tokenRefreshResult(refreshToken) { 
  return function(dispatch) {
    tokenRefreshRequest(refreshToken) 
    .then(checkResponse)
    .then(res => dispatch({ type: TOKEN_REFRESH,
                            success: res.success,
                            accessToken: res.accessToken,
                            refreshToken: res.refreshToken })
    )
    //.catch(e => console.log(e))
    .catch(function(error) { 
      const err = error.json() 
      
      console.log(err)
      return err
    })
  };
}  
