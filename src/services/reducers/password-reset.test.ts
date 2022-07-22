import { PASSWORD_REQUEST, TPasswordResetActions } from "../actions/password-reset";
import { passwordResetReducer } from "./password-reset";

const initialState = {
  passwordResetResult: {success: null, message: null}
};
    
describe('passwordreset reducer', () => {
  it(`should return the initial state`, () => {
    expect(passwordResetReducer(undefined, <TPasswordResetActions>{} )).toEqual(initialState)
  })

  it('should handle PASSWORD_REQUEST', () => {
    const action = {
        type: PASSWORD_REQUEST,
        passwordResetResult: {
            success: null || true || false,
            message: null || 'string '
          }
      }  
    const expectedState = {
        ...initialState, 
        passwordResetResult: action.passwordResetResult
    }  
    expect(passwordResetReducer(initialState, action)).toEqual(expectedState)
  })

}) 