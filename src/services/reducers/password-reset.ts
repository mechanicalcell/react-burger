import { PASSWORD_REQUEST, TPasswordResetActions
} from '../actions/password-reset';

const initialState = {
  passwordResetResult: {success: null, message: null}
};

export const passwordResetReducer = (state = initialState, action: TPasswordResetActions) => {
  switch (action.type) {
    case PASSWORD_REQUEST: {
      return {
        ...state,
        passwordResetResult: action.passwordResetResult
      };
    }
    default: {
      return state;
    }
  }
};
  