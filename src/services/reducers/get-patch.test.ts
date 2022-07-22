import { GET_PROFILE_RESULT, PATCH_PROFILE_RESULT, PROFILE_EMAIL_INPUT, PROFILE_NAME_INPUT, PROFILE_PASSWORD_INPUT, TOKEN_NULL, TProfileActions, USER_RESET } from "../actions/get-patch";
import { getPatchReducer } from "./get-patch";

const initialState = {
  profileNameInput: '',
  profileEmailInput: '',
  profilePasswordInput: '',
  user : {},
  getResult: {
    "success": null,
    "user": {
      "email": null,
      "name": null
    }
  } ,
  patchResult: {
    "success": null,
    "user": {
      "email": null,
      "name": null
    }
  },
  loginResult: {
    "success": null,
    "accessToken": null,
    "refreshToken": null,
    "user": {
      "email": null,
      "name": null
    }
  }, 
};

describe('count reducer', () => {
  it(`should return the initial state`, () => {
    expect(getPatchReducer(undefined, <TProfileActions>{} )).toEqual(initialState)
  })

  it('should handle GET_PROFILE_RESULT', () => {
    const getResult = {
        "success": true || false,
        "user": {
          "email": "email" ||  null,
          "name": "name" || null
        }
      }
    const action = {
        type: GET_PROFILE_RESULT,
        getResult
      }  
    const expectedState = {
        ...initialState, 
        getResult: action.getResult
    }  
    expect(getPatchReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle PATCH_PROFILE_RESULT', () => {
    const patchResult = {
        "success": true || false,
        "user": {
          "email": "email" ||  null,
          "name": "name" || null
        }
      }
    const action = {
        type: PATCH_PROFILE_RESULT,
        patchResult
      }  
    const expectedState = {
        ...initialState, 
        patchResult: action.patchResult
    }  
    expect(getPatchReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle PROFILE_NAME_INPUT', () => {
    const profileNameInput = 'Name'
    const action = {
        type: PROFILE_NAME_INPUT,
        profileNameInput
      }  
    const expectedState = {
        ...initialState, 
        profileNameInput: action.profileNameInput
    }  
    expect(getPatchReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle PROFILE_EMAIL_INPUT', () => {
    const profileEmailInput = 'Email'
    const action = {
        type: PROFILE_EMAIL_INPUT,
        profileEmailInput
      }  
    const expectedState = {
        ...initialState, 
        profileEmailInput: action.profileEmailInput
    }  
    expect(getPatchReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle PROFILE_PASSWORD_INPUT', () => {
    const profilePasswordInput = 'Password'
    const action = {
        type: PROFILE_PASSWORD_INPUT,
        profilePasswordInput
      }  
    const expectedState = {
        ...initialState, 
        profilePasswordInput: action.profilePasswordInput
    }  
    expect(getPatchReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle USER_RESET', () => {
    const action = {
        type: USER_RESET,
      }  
    const expectedState = {
        ...initialState, 
        getResult: {
            "success": null,
            "user": {
              "email": null,
              "name": null
            }
          }
    }  
    expect(getPatchReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle TOKEN_NULL', () => {
    const action = {
        type: TOKEN_NULL,
      }  
    const expectedState = {
        ...initialState, 
        loginResult: { 
            ...initialState.loginResult,
            "accessToken": null
          }
      }  
    expect(getPatchReducer(initialState, action)).toEqual(expectedState)
  })

}) 