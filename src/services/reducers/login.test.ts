import { LOGIN_EMAIL_INPUT, LOGIN_PASSWORD_INPUT, RESET_USER, TLoginActions, TOKEN_REFRESH, USER_LOGIN } from "../actions/login";
import { loginReducer } from "./login";

const initialState = {
  loginResult: {
    "success": null,
    "accessToken": null,
    "refreshToken": null,
    "user": {
      "email": null,
      "name": null
    }
  }, 
  loginEmailInput: '',
  loginPasswordInput: '',
  logoutResult: {
    "success": null,
    "message": null
  },
};

describe('ingredient reducer', () => {
  it(`should return the initial state`, () => {
    expect(loginReducer(undefined, <TLoginActions>{} )).toEqual(initialState)
  })

  it('should handle USER_LOGIN', () => {
    const action = {
        type: USER_LOGIN,
        loginResult: {
            "success": null || true || false,
            "accessToken": null || 'string',
            "refreshToken": null || 'string',
            "user": {
              "email": null || 'string',
              "name": null || 'string'
            }
          },
        logoutResult: {
          "success": null || true || false,
          "message": null || 'string'
        },
        userLogin: null || 'string'
      }  
    const expectedState = {
        ...initialState, 
        loginResult: action.loginResult,
        logoutResult: {
          "success": null,
          "message": null
        },
        user: action.userLogin
    }  
    expect(loginReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle LOGIN_EMAIL_INPUT', () => {
    const action = {
        type: LOGIN_EMAIL_INPUT,
        loginEmailInput: "string"
      }  
    const expectedState = {
        ...initialState, 
        loginEmailInput: action.loginEmailInput    }  
    expect(loginReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle LOGIN_PASSWORD_INPUT', () => {
    const action = {
        type: LOGIN_PASSWORD_INPUT,
        loginPasswordInput: "string"
      }  
    const expectedState = {
        ...initialState, 
        loginPasswordInput: action.loginPasswordInput    }  
    expect(loginReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle RESET_USER', () => {
    const action = {
        type: RESET_USER,
        logoutResult: {
            "success": null || true || false,
            "message": null || 'string'
          }
      }  
    const expectedState = {
        ...initialState, 
        logoutResult: action.logoutResult,
        loginResult: {
          "success": null,
          "accessToken": null,
          "refreshToken": null,
          "user": {
            "email": null,
            "name": null
          }
        },
 }  
    expect(loginReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle TOKEN_REFRESH', () => {
    const action = {
        type: TOKEN_REFRESH,
        success: null || true || false,
        accessToken: null || 'string',
        refreshToken: null || 'string'
      }  
    const expectedState = {
        ...initialState, 
        loginResult: { 
          ...initialState.loginResult,
          "success": action.success,
          "accessToken": action.accessToken,
          "refreshToken": action.refreshToken
        }       
 }  
    expect(loginReducer(initialState, action)).toEqual(expectedState)
  })

}) 