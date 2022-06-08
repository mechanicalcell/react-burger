import { AppDispatch, AppThunk } from "../..";
import { passwordResetRequest } from "../api";

export const PASSWORD_REQUEST: 'PASSWORD_REQUEST' = 'PASSWORD_REQUEST';

export interface IPasswordRequestAction {
  readonly type: typeof PASSWORD_REQUEST;
  passwordResetResult: {
    success: null | boolean,
    message: null | string 
  }
}

export const passwordRequestAction = (passwordResetResult: {
    success: null | boolean,
    message: null | string 
  }): IPasswordRequestAction => ({
  type: PASSWORD_REQUEST,
  passwordResetResult
});

export type TPasswordResetActions =
  | IPasswordRequestAction;

export const getPasswordReset: AppThunk = (email: string) => { 
  return async function(dispatch: AppDispatch) {
    try {  
      const res = await passwordResetRequest(email)
      const r = await Promise.resolve(res)
      if (r.success) {
        dispatch(passwordRequestAction(r))
    } else {
        return await Promise.reject(r);
        }
    } catch(r: any) {
      console.log(r) 
      } 
  }
}
  