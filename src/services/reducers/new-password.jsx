import { NEW_PASSWORD,
         NEW_PASSWORD_INPUT,
         CODE_INPUT
} from '../actions/new-password';

const initialState = {
newPassword: '',
newPasswordInput: '',
codeInput: ''
};

export const newPasswordReducer = (state = initialState, action) => {
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
        newPasswordInput: action.payload
      };
    }
    case CODE_INPUT: {
      return {
        ...state,
        codeInput: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
