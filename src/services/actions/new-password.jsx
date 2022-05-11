import { newPasswordRequest } from "../api";
import { checkResponse } from "../../components/utils/check-response";

export const NEW_PASSWORD = 'NEW_PASSWORD';
export const NEW_PASSWORD_INPUT = 'NEW_PASSWORD_INPUT';
export const CODE_INPUT = 'CODE_INPUT';

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
