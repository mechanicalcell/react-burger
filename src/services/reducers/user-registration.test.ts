import { PASSWORD_REQUEST, TPasswordResetActions } from "../actions/password-reset";
import { REGISTER_EMAIL_INPUT, REGISTER_NAME_INPUT, REGISTER_PASSWORD_INPUT, TUserRegistrationActions, USER_REGISTRATION } from "../actions/user-registration";
import { passwordResetReducer } from "./password-reset";
import { userRegistrationReducer } from "./user-registration";

const initialState = {
  registrationResult: {
    "success": null,
    "user": {},
    "accessToken": null,
    "refreshToken": null
  } ,
  registerNameInput: '',
  registerEmailInput: '',
  registerPasswordInput: '',
};
    
describe('userregistration reducer', () => {
  it(`should return the initial state`, () => {
    expect(userRegistrationReducer(undefined, <TUserRegistrationActions>{} )).toEqual(initialState)
  })

  it('should handle USER_REGISTRATION', () => {
    const action = {
        type: USER_REGISTRATION,
        registrationResult: {
            "success": true || false || null,
            "user": {},
            "accessToken": 'string' || null,
            "refreshToken": 'string' || null
          }
      }  
    const expectedState = {
        ...initialState, 
        registrationResult: action.registrationResult
    }  
    expect(userRegistrationReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle REGISTER_NAME_INPUT', () => {
    const action = {
        type: REGISTER_NAME_INPUT,
        registerNameInput: 'string'
      }  
    const expectedState = {
        ...initialState, 
        registerNameInput: action.registerNameInput
    }  
    expect(userRegistrationReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle REGISTER_EMAIL_INPUT', () => {
    const action = {
        type: REGISTER_EMAIL_INPUT,
        registerEmailInput: 'string'
      }  
    const expectedState = {
        ...initialState, 
        registerEmailInput: action.registerEmailInput
    }  
    expect(userRegistrationReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle REGISTER_PASSWORD_INPUT', () => {
    const action = {
        type: REGISTER_PASSWORD_INPUT,
        registerPasswordInput: 'string'
      }  
    const expectedState = {
        ...initialState, 
        registerPasswordInput: action.registerPasswordInput
    }  
    expect(userRegistrationReducer(initialState, action)).toEqual(expectedState)
  })

}) 