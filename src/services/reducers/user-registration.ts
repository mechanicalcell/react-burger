import { USER_REGISTRATION,
         REGISTER_NAME_INPUT,
         REGISTER_EMAIL_INPUT,
         REGISTER_PASSWORD_INPUT,
         TUserRegistrationActions
} from '../actions/user-registration';

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

export const userRegistrationReducer = (state = initialState, action: TUserRegistrationActions) => {
  switch (action.type) {
    case USER_REGISTRATION: {
      return {
        ...state,
        registrationResult: action.registrationResult
      };
    }
    case REGISTER_NAME_INPUT: {
      return {
        ...state,
        registerNameInput: action.registerNameInput
      };
    }
    case REGISTER_EMAIL_INPUT: {
      return {
        ...state,
        registerEmailInput: action.registerEmailInput
      };
    }
    case REGISTER_PASSWORD_INPUT: {
      return {
        ...state,
        registerPasswordInput: action.registerPasswordInput
      };
    }
    default: {
      return state;
    }
  }
};   

