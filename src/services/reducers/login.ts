import { LOGIN_EMAIL_INPUT,
         LOGIN_PASSWORD_INPUT,
         USER_LOGIN,
         RESET_USER,
         TOKEN_REFRESH,
         TLoginActions
} from '../actions/login';

interface ILoginResult {
  "success": boolean | null,
  "accessToken": string | null,
  "refreshToken": string | null,
  "user": {
    "email": string | null,
    "name": string | null
  }
}

interface ILogoutResult {
  "success": boolean | null,
  "message": string | null
}

interface ILoginState {
  loginResult: ILoginResult, 
  loginEmailInput: string,
  loginPasswordInput: string,
  logoutResult: ILogoutResult
}

const initialState: ILoginState = {
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

export const loginReducer = (state = initialState, action: TLoginActions) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        ...state,
        loginResult: action.loginResult,
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
        loginEmailInput: action.loginEmailInput
      };
    }
    case LOGIN_PASSWORD_INPUT: {
      return {
        ...state,
        loginPasswordInput: action.loginPasswordInput
      };
    }
    case RESET_USER: {
      return {
        ...state,
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
    default: {
      return state;
    }
  }
};