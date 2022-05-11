import { PASSWORD_REQUEST
} from '../actions/password-reset';

const initialState = {
  passwordResetResult: {success: null, message: null}
};

export const passwordResetReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_REQUEST: {
      return {
        ...state,
        passwordResetResult: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
  