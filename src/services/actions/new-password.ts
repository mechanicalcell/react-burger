import { AppDispatch, AppThunk } from "../..";
import { newPasswordRequest } from "../api";

export const NEW_PASSWORD: 'NEW_PASSWORD' = 'NEW_PASSWORD';
export const NEW_PASSWORD_INPUT: 'NEW_PASSWORD_INPUT' = 'NEW_PASSWORD_INPUT';
export const CODE_INPUT: 'CODE_INPUT' = 'CODE_INPUT';

export interface INewPasswordInputAction {
  readonly type: typeof NEW_PASSWORD_INPUT;
  newPasswordInput: string;
}

export interface ICodeInputAction {
  readonly type: typeof CODE_INPUT;
  codeInput: string;
}

export interface INewPasswordAction {
  readonly type: typeof NEW_PASSWORD;
  newPassword: {
    "password": string | null,
    "token": string | null
  };
}

export const newPasswordAction = (newPassword: {
    "password": string | null,
    "token": string | null
  }): INewPasswordAction => ({
  type: NEW_PASSWORD,
  newPassword
});

export const newPasswordInputAction = (newPasswordInput: string): INewPasswordInputAction => ({
  type: NEW_PASSWORD_INPUT,
  newPasswordInput
});

export const codeInputAction = (codeInput: string): ICodeInputAction => ({
  type: CODE_INPUT,
  codeInput
});

export type TNewPasswordActions =
  | INewPasswordInputAction
  | ICodeInputAction
  | INewPasswordAction

export const getNewPassword: AppThunk = (newPassword: string, code: string) => { 
  return async function(dispatch: AppDispatch) {
    try {  
      const res = await newPasswordRequest(newPassword, code)
      const r = await Promise.resolve(res)
      if (r.success) {
        dispatch(newPasswordAction(r))
    } else {
        return await Promise.reject(r);
        }
    } catch(r: any) {
      console.log(r) 
      } 
  }
}
  