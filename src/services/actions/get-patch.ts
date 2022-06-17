import { getUserDataRequest, 
         tokenRefreshRequest,
         patchUserDataRequest } from "../api";
import { AppDispatch, AppThunk } from "../..";
import { tokenRefreshAction } from "./login";
import { getCookie } from "../../components/utils/cookie";

export const PROFILE_NAME_INPUT: 'PROFILE_NAME_INPUT' = 'PROFILE_NAME_INPUT';
export const PROFILE_EMAIL_INPUT: 'PROFILE_EMAIL_INPUT' = 'PROFILE_EMAIL_INPUT';
export const PROFILE_PASSWORD_INPUT: 'PROFILE_PASSWORD_INPUT' = 'PROFILE_PASSWORD_INPUT';
export const GET_PROFILE_RESULT: 'GET_PROFILE_RESULT' = 'GET_PROFILE_RESULT';
export const PATCH_PROFILE_RESULT: 'PATCH_PROFILE_RESULT' = 'PATCH_PROFILE_RESULT';
export const TOKEN_NULL: 'TOKEN_NULL' = 'TOKEN_NULL';
export const USER_RESET: 'USER_RESET' = 'USER_RESET';

export interface IProfileNameInputAction {
  readonly type: typeof PROFILE_NAME_INPUT;
  profileNameInput: string;
}

export interface IProfileEmailInputAction {
  readonly type: typeof PROFILE_EMAIL_INPUT;
  profileEmailInput: string;
}

export interface IProfilePasswordInputAction {
  readonly type: typeof PROFILE_PASSWORD_INPUT;
  profilePasswordInput: string;
}

export interface IGetProfileResultAction {
  readonly type: typeof GET_PROFILE_RESULT;
  getResult: {
    "success": boolean,
    "user": {
      "email": string | null,
      "name": string | null
    }
  };
}

export interface IPatchProfileResultAction {
  readonly type: typeof PATCH_PROFILE_RESULT;
  patchResult: {
    "success": boolean,
    "user": {
      "email": string | null,
      "name": string | null
    }
  };
}

export interface IUserResetAction {
  readonly type: typeof USER_RESET;
}

export interface ITokenNullAction {
  readonly type: typeof TOKEN_NULL;
}

export const getProfileNameInputAction = (profileNameInput: string): IProfileNameInputAction => ({
  type: PROFILE_NAME_INPUT,
  profileNameInput
});

export const getProfileEmailInputAction = (profileEmailInput: string): IProfileEmailInputAction => ({
  type: PROFILE_EMAIL_INPUT,
  profileEmailInput
});

export const getProfilePasswordInputAction = (profilePasswordInput: string): IProfilePasswordInputAction => ({
  type: PROFILE_PASSWORD_INPUT,
  profilePasswordInput
});

export const getProfileResultAction = (getResult: {
  "success": boolean,
  "user": {
    "email": string | null,
    "name": string | null
  }
}): IGetProfileResultAction => ({
 type: GET_PROFILE_RESULT,
 getResult
});

export const patchProfileResultAction = (patchResult: { 
  "success": boolean,
  "user": {
    "email": string | null,
    "name": string | null
  }
}): IPatchProfileResultAction => ({
  type: PATCH_PROFILE_RESULT,
  patchResult
});

export const userResetAction = (): IUserResetAction => ({
  type: USER_RESET
});

export const tokenNullAction = (): ITokenNullAction => ({
  type: TOKEN_NULL
});

export type TProfileActions =
  | IProfileNameInputAction
  | IProfileEmailInputAction
  | IProfilePasswordInputAction
  | IGetProfileResultAction
  | IPatchProfileResultAction  
  | IUserResetAction
  | ITokenNullAction;  

export const getProfileResult: AppThunk = (accessToken: string, refreshToken: string) => { 
  return async function(dispatch: AppDispatch) {
    try {  
      const res = await getUserDataRequest(accessToken)
      const r = await Promise.resolve(res)
      if (r.success) {
        dispatch(getProfileResultAction(r));
      } else { 
        return await Promise.reject(r);
        }
    } catch(r: any) {
      if ((r && r.message === 'jwt expired') ||
           r.message === 'Token is invalid') { 
        dispatch(tokenNullAction())
        try {  
          const res = await tokenRefreshRequest(getCookie('refreshToken'))
          const r = await Promise.resolve(res)
          if (r.success) {
            dispatch(tokenRefreshAction(r.success, r.accessToken, r.refreshToken))
          } else {
            return await Promise.reject(r);
            }
        } catch (r: any) {
            console.log(r)
          } 
      }
    }
  }
}

export const patchProfileResult: AppThunk = (accessToken: string, name: string, email: string, password: string) => { 
  return async function(dispatch: AppDispatch) {
    try {  
      const res = patchUserDataRequest(accessToken, name, email, password) 
      const r = await Promise.resolve(res)
      if (r.success) {
        dispatch(patchProfileResultAction(r)) 
      } else {
          return await Promise.reject(r);
        }
    } catch (r: any) {
        console.log(r)
      } 
  }
}