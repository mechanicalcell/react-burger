import { PROFILE_NAME_INPUT,
         PROFILE_EMAIL_INPUT,
         PROFILE_PASSWORD_INPUT,
         GET_PROFILE_RESULT,
         PATCH_PROFILE_RESULT,
         USER_RESET,
         TOKEN_NULL
} from '../actions/get-patch';
import { TProfileActions } from '../actions/get-patch';

const initialState: {
  profileNameInput: string,
  profileEmailInput: string,
  profilePasswordInput: string,
  user : {},
  getResult: {
    "success": string| null,
    "user": {
      "email": string | null,
      "name": string | null
    }
  } ,
  patchResult: {
    "success": string | null,
    "user": {
      "email": string | null,
      "name": string | null
    }
  },
  loginResult: {
    "success": boolean | null,
    "accessToken": string | null,
    "refreshToken": string | null,
    "user": {
      "email": string | null,
      "name": string | null
    }
  }, 
} = {
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

export const getPatchReducer = (state = initialState, action: TProfileActions) => {
  switch (action.type) {
    case GET_PROFILE_RESULT: {
      return {
        ...state,
        getResult: action.getResult
      };
    }
    case PATCH_PROFILE_RESULT: {
      return {
        ...state,
        patchResult: action.patchResult
      };
    }
    case PROFILE_NAME_INPUT: {
      return {
        ...state,
        profileNameInput: action.profileNameInput
      };
    }
    case PROFILE_EMAIL_INPUT: {
      return {
        ...state,
        profileEmailInput: action.profileEmailInput
      };
    }
    case PROFILE_PASSWORD_INPUT: {
      return {
        ...state,
        profilePasswordInput: action.profilePasswordInput
      };
    }
    case USER_RESET: {
      return {
        ...state,
        getResult: {
          "success": null,
          "user": {
            "email": null,
            "name": null
          }
        }
      };
    }
    case TOKEN_NULL: {
      return {
        ...state,
        loginResult: { 
          ...state.loginResult,
          "accessToken": null
        }
      };
    }
    default: {
      return state;
    }
  }
};   
