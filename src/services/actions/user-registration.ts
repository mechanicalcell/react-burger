import { AppDispatch, AppThunk } from "../..";
import { userRegistrationRequest } from "../api";

export const USER_REGISTRATION: 'USER_REGISTRATION' = 'USER_REGISTRATION';
export const REGISTER_NAME_INPUT: 'REGISTER_NAME_INPUT' = 'REGISTER_NAME_INPUT';
export const REGISTER_EMAIL_INPUT: 'REGISTER_EMAIL_INPUT' = 'REGISTER_EMAIL_INPUT';
export const REGISTER_PASSWORD_INPUT: 'REGISTER_PASSWORD_INPUT' = 'REGISTER_PASSWORD_INPUT';

export interface IRegisterNameInputAction {
  readonly type: typeof REGISTER_NAME_INPUT;
  registerNameInput: string;
}

export interface IRegisterEmailInputAction {
  readonly type: typeof REGISTER_EMAIL_INPUT;
  registerEmailInput: string;
}

export interface IRegisterPasswordInputAction {
  readonly type: typeof REGISTER_PASSWORD_INPUT;
  registerPasswordInput: string;
}

export interface IUserRegistrationAction {
  readonly type: typeof USER_REGISTRATION;
  registrationResult: {
    "success": boolean | null,
    "user": {},
    "accessToken": string | null,
    "refreshToken": string | null
  }
}

export const userRegistrationAction = (registrationResult: {
  "success": boolean | null,
  "user": {},
  "accessToken": string | null,
  "refreshToken": string | null
}): IUserRegistrationAction => ({
  type: USER_REGISTRATION,
  registrationResult
});

export const registerNameInputAction = (registerNameInput: string): IRegisterNameInputAction => ({
  type: REGISTER_NAME_INPUT,
  registerNameInput
});

export const registerEmailInputAction = (registerEmailInput: string): IRegisterEmailInputAction => ({
  type: REGISTER_EMAIL_INPUT,
  registerEmailInput
});

export const registerPasswordInputAction = (registerPasswordInput: string): IRegisterPasswordInputAction => ({
  type: REGISTER_PASSWORD_INPUT,
  registerPasswordInput
});

export type TUserRegistrationActions =
  | IUserRegistrationAction
  | IRegisterNameInputAction
  | IRegisterEmailInputAction
  | IRegisterPasswordInputAction;

export const userRegistration: AppThunk = (name: string, email: string, password: string) => { 
  return async function(dispatch: AppDispatch) {
    try {  
      const res = await userRegistrationRequest(name, email, password)
      const r = await Promise.resolve(res)
      if (r.success) {
        dispatch(userRegistrationAction(r))
    } else {
        return await Promise.reject(r);
      }
    } catch (r: any) {
        console.log(r)
      } 
  }
}