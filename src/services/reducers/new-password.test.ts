import { CODE_INPUT, NEW_PASSWORD, NEW_PASSWORD_INPUT, TNewPasswordActions } from "../actions/new-password";
import { newPasswordReducer } from "./new-password";

const initialState = {
  newPassword: {
    "password": "",
    "token": ""
  },
  newPasswordInput: '',
  codeInput: ''
};

describe('newpassword reducer', () => {
  it(`should return the initial state`, () => {
    expect(newPasswordReducer(undefined, <TNewPasswordActions>{} )).toEqual(initialState)
  })

  it('should handle NEW_PASSWORD', () => {
    const action = {
        type: NEW_PASSWORD,
        newPassword: {
            "password": 'string' || null,
            "token": 'string' || null
          }
      }  
    const expectedState = {
        ...initialState, 
        newPassword: action.newPassword
    }  
    expect(newPasswordReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle NEW_PASSWORD_INPUT', () => {
    const action = {
        type: NEW_PASSWORD_INPUT,
        newPasswordInput: "string"
      }  
    const expectedState = {
        ...initialState, 
        newPasswordInput: action.newPasswordInput    }  
    expect(newPasswordReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle CODE_INPUT', () => {
    const action = {
        type: CODE_INPUT,
        codeInput: "string"
      }  
    const expectedState = {
        ...initialState, 
        codeInput: action.codeInput    }  
    expect(newPasswordReducer(initialState, action)).toEqual(expectedState)
  })

}) 