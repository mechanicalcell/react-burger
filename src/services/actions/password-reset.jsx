import { passwordResetRequest } from "../api";
import { checkResponse } from "../../components/utils/check-response";

export const PASSWORD_REQUEST = 'PASSWORD_REQUEST';

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
