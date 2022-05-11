import { userRegistrationRequest } from "../api";
import { checkResponse } from "../../components/utils/check-response";

export const USER_REGISTRATION = 'USER_REGISTRATION';
export const REGISTER_NAME_INPUT = 'REGISTER_NAME_INPUT';
export const REGISTER_EMAIL_INPUT = 'REGISTER_EMAIL_INPUT';
export const REGISTER_PASSWORD_INPUT = 'REGISTER_PASSWORD_INPUT';

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
