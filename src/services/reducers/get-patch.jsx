import { PROFILE_NAME_INPUT,
         PROFILE_EMAIL_INPUT,
         PROFILE_PASSWORD_INPUT,
         GET_PROFILE_RESULT,
         PATCH_PROFILE_RESULT,
         USER_RESET
} from '../actions/get-patch';

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
  } 
};

export const getPatchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_RESULT: {
      return {
        ...state,
        getResult: action.payload
      };
    }
    case PATCH_PROFILE_RESULT: {
      return {
        ...state,
        patchResult: action.payload
      };
    }
    case PROFILE_NAME_INPUT: {
      return {
        ...state,
        profileNameInput: action.payload
      };
    }
    case PROFILE_EMAIL_INPUT: {
      return {
        ...state,
        profileEmailInput: action.payload
      };
    }
    case PROFILE_PASSWORD_INPUT: {
      return {
        ...state,
        profilePasswordInput: action.payload
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
    default: {
      return state;
    }
  }
};   
