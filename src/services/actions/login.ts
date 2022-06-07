import { loginRequest, logoutRequest } from "../api";
import { AppDispatch, AppThunk } from "../..";

export const LOGIN_EMAIL_INPUT: 'LOGIN_EMAIL_INPUT' = 'LOGIN_EMAIL_INPUT';
export const LOGIN_PASSWORD_INPUT: 'LOGIN_PASSWORD_INPUT' = 'LOGIN_PASSWORD_INPUT';
export const USER_LOGIN: 'USER_LOGIN' = 'USER_LOGIN';
export const RESET_USER: 'RESET_USER' = 'RESET_USER';
export const TOKEN_REFRESH: 'TOKEN_REFRESH' = 'TOKEN_REFRESH';

export interface ILoginEmailInputAction {
  readonly type: typeof LOGIN_EMAIL_INPUT;
  loginEmailInput: string;
}

export interface ILoginPasswordInputAction {
  readonly type: typeof LOGIN_PASSWORD_INPUT;
  loginPasswordInput: string;
}

export interface IUserLoginAction {
  readonly type: typeof USER_LOGIN;
  loginResult: {
    "success": null | boolean,
    "accessToken": null | string,
    "refreshToken": null | string,
    "user": {
      "email": null | string,
      "name": null | string
    }
  };
  logoutResult: {
    "success": null | boolean,
    "message": null | string
  };
  userLogin: null | string
}

export interface IResetUserAction {
  readonly type: typeof RESET_USER;
  logoutResult: {
    "success": boolean | null,
    "message": null | string
  };
}

export interface ITokenRefreshAction {
  readonly type: typeof TOKEN_REFRESH;
  "success": boolean,
  "accessToken": string | null,
  "refreshToken": string | null
}

export const getUserLoginAction = (loginResult: {
  "success": null | boolean,
  "accessToken": null | string,
  "refreshToken": null | string,
  "user": {
    "email": null | string,
    "name": null | string
  }
}, userLogin: null | string): IUserLoginAction => ({
  type: USER_LOGIN,
  loginResult,
  logoutResult: {
    "success": null,
    "message": null
  },
  userLogin
});

export const getLoginEmailInputAction = (loginEmailInput: string): ILoginEmailInputAction => ({
  type: LOGIN_EMAIL_INPUT,
  loginEmailInput
});

export const getLoginPasswordInputAction = (loginPasswordInput: string): ILoginPasswordInputAction => ({
  type: LOGIN_PASSWORD_INPUT,
  loginPasswordInput
});

export const resetUserAction = (logoutResult: {
    "success": boolean | null,
    "message": null | string
  }): IResetUserAction => ({
  type: RESET_USER,
  logoutResult
});

export const tokenRefreshAction = (success: boolean, accessToken: string, refreshToken: string): ITokenRefreshAction => ({
  type: TOKEN_REFRESH,
  success,
  accessToken,
  refreshToken
});

export type TLoginActions =
  | IUserLoginAction
  | ILoginEmailInputAction
  | ILoginPasswordInputAction
  | IResetUserAction
  | ITokenRefreshAction;

export const userLogin: AppThunk = (email: string, password: string) => { 
  return async function(dispatch: AppDispatch) {
    try {  
    const res = await loginRequest(email, password)
    const r = await Promise.resolve(res)
    if (r.success) {
      dispatch(getUserLoginAction(r, r.user));
    } else {
      return await Promise.reject(r);
      }
  } catch(r: any) {
    console.log(r) 
    } 
  };
}

export const userLogout: AppThunk = (refreshToken: string | null) => { 
  return async function(dispatch: AppDispatch) {
    try {
      const res = await logoutRequest(refreshToken) 
      const r = await Promise.resolve(res)
      if (r.success) {
        dispatch(resetUserAction(r)) 
      } else {
          return await Promise.reject(r);
        }
    } catch (r) {
        console.log(r)
      } 
  }
}
