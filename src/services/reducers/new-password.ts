import { NEW_PASSWORD,
         NEW_PASSWORD_INPUT,
         CODE_INPUT,
         TNewPasswordActions
} from '../actions/new-password';

const initialState = {
newPassword: {
  "password": "",
  "token": ""
},
newPasswordInput: '',
codeInput: ''
};

export const newPasswordReducer = (state = initialState, action: TNewPasswordActions) => {
  switch (action.type) {
    case NEW_PASSWORD: {
      return {
        ...state,
        newPassword: action.newPassword
      };
    }
    case NEW_PASSWORD_INPUT: {
      return {
        ...state,
        newPasswordInput: action.newPasswordInput
      };
    }
    case CODE_INPUT: {
      return {
        ...state,
        codeInput: action.codeInput
      };
    }
    default: {
      return state;
    }
  }
};
