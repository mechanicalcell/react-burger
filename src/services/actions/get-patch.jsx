import { getUserDataRequest, 
         tokenRefreshRequest,
         patchUserDataRequest } from "../api";
import { checkResponse } from "../../components/utils/check-response";
import { TOKEN_REFRESH } from "./login";

export const PROFILE_NAME_INPUT = 'PROFILE_NAME_INPUT';
export const PROFILE_EMAIL_INPUT = 'PROFILE_EMAIL_INPUT';
export const PROFILE_PASSWORD_INPUT = 'PROFILE_PASSWORD_INPUT';
export const GET_PROFILE_RESULT = 'GET_PROFILE_RESULT';
export const PATCH_PROFILE_RESULT = 'PATCH_PROFILE_RESULT';
export const TOKEN_NULL = 'TOKEN_NULL';
export const USER_RESET = 'USER_RESET';

export function getProfileResult(accessToken, refreshToken) { 
  return async function(dispatch) {
    getUserDataRequest(accessToken)
    .then(checkResponse)
    .then(res => dispatch({ type: GET_PROFILE_RESULT,
                            payload: res }) )
    .catch(function(error) { 
      const err = error.json() 
      console.log(err)
      console.log(refreshToken)
      return err
    })
    .then(function(err) { 
      if ((err && err.message === 'jwt expired') ||
           err.message === 'Token is invalid') { 
        dispatch({ type: TOKEN_NULL })
        console.log(refreshToken)
        tokenRefreshRequest(refreshToken)
        .then(checkResponse)
        .then(res => dispatch({ type: TOKEN_REFRESH,
                                success: res.success,
                                accessToken: res.accessToken,
                                refreshToken: res.refreshToken })
        )
        .catch(function(error) { 
        const err = error.json() 
        console.log(err) })
        

        // getUserDataRequest(accessToken)
        // .then(res => dispatch({ type: GET_PROFILE_RESULT,
        //              payload: res })
        // )
        // .catch(function(error) { 
        //   const err = error.json() 
        //   console.log(err)
        //   return err
        // })   
            
          
      }
    }) 
  }
}

export function patchProfileResult(accessToken, name, email, password) { 
  return function(dispatch) {
    patchUserDataRequest(accessToken, name, email, password) 
    .then(checkResponse)
    .then(res => dispatch({ type: PATCH_PROFILE_RESULT,
                            payload: res }) 
    )
    .catch(function(error) { 
    const err = error.json() 
    console.log(err)
    return err
    })
  };
}  
