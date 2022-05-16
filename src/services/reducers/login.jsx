import { LOGIN_EMAIL_INPUT,
         LOGIN_PASSWORD_INPUT,
         USER_LOGIN,
         RESET_USER,
         TOKEN_REFRESH,
         SET_USER
} from '../actions/login';
import { TOKEN_NULL } from '../actions/get-patch';

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
  user: null 
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        ...state,
        loginResult: action.payload,
        logoutResult: {
          "success": null,
          "message": null
        },
        user: action.userLogin
      };
    }
    case LOGIN_EMAIL_INPUT: {
      return {
        ...state,
        loginEmailInput: action.payload
      };
    }
    case LOGIN_PASSWORD_INPUT: {
      return {
        ...state,
        loginPasswordInput: action.payload
      };
    }
    case RESET_USER: {
      return {
        ...state,
        logoutResult: action.payload,
        loginResult: {
          "success": null,
          "accessToken": null,
          "refreshToken": null,
          "user": {
            "email": null,
            "name": null
          }
        },
        user: action.userLogout
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
    case TOKEN_REFRESH: {
      return {
        ...state,
        loginResult: { 
          ...state.loginResult,
          "success": action.success,
          "accessToken": action.accessToken,
          "refreshToken": action.refreshToken
        }       
      }
    }
    case SET_USER: {
      return {
        ...state,
        user: action.payload
      }
    }
    default: {
      return state;
    }
  }
};   
