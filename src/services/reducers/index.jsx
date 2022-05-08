import { combineReducers } from 'redux';
import { GET_INGREDIENTS,
         GET_INGREDIENTS_SUCCESS,
         GET_INGREDIENTS_FAILED,
         COPY_ARR_BUN,
         COPY_ARR_INGREDIENTS,
         DELETE_INGREDIENTS,
         DELETE_INGREDIENT_DETAIL,
         ORDER_NUMBER_REQUEST,
         DELETE_ORDER_NUMBER,
         MOVE_INGREDIENTS,
         MOVE_BUNS,
         COUNT_BUN_UP,
         COUNT_BUN_DOWN,
         COUNT_INGREDIENT_UP,
         COUNT_INGREDIENT_DOWN,
         DELETE_COUNT,
         DELETE_BURGER_CONSTRUCTOR,
         REORDER_BURGER_CONSTRUCTOR,
         PASSWORD_REQUEST,
         NEW_PASSWORD,
         USER_REGISTRATION,
         NEW_PASSWORD_INPUT,
         CODE_INPUT,
         REGISTER_NAME_INPUT,
         REGISTER_EMAIL_INPUT,
         REGISTER_PASSWORD_INPUT,
         PROFILE_NAME_INPUT,
         PROFILE_EMAIL_INPUT,
         PROFILE_PASSWORD_INPUT,
         LOGIN_EMAIL_INPUT,
         LOGIN_PASSWORD_INPUT,
         USER_LOGIN,
         RESET_USER,
         GET_PROFILE_RESULT,
         PATCH_PROFILE_RESULT,
         TOKEN_NULL,
         TOKEN_REFRESH,
         INGREDIENT_ID
} from '../actions/index';

const initialState = {
  isLoading: false,
  hasError: false,
  data: [],
  newArrBurgerConstructor: [], 
  newArrIngredientDetails: {},
  newArrBun: [],
  orderNumber: null,
  passwordResetResult: {success: null, message: null},
  newPassword: '',
  newPasswordInput: '',
  codeInput: '',
  registrationResult: {
    "success": null,
    "user": {},
    "accessToken": null,
    "refreshToken": null
  } ,
  registerNameInput: '',
  registerEmailInput: '',
  registerPasswordInput: '',
  profileNameInput: '',
  profileEmailInput: '',
  profilePasswordInput: '',
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
  user : {},
  logoutResult: {
    "success": null,
    "message": null
  }, 
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
  } ,
  ingredientIdCopy: null,
  count: { 0: 0, 
           1: 0,
           2: 0, 
           3: 0, 
           4: 0, 
           5: 0,
           6: 0, 
           7: 0, 
           8: 0, 
           9: 0, 
           10: 0,
           11: 0, 
           12: 0, 
           13: 0, 
           14: 0 }
};
  
const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, hasError: false, data: action.data, isLoading: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, hasError: true, isLoading: false };
    }
    default: {
      return state;
    }
  }
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderNumber: action.data
      };
    }
    case DELETE_ORDER_NUMBER: {
      return { 
        ...state,
        orderNumber: null
      }
    }
    default: {
      return state;
    }
  }
};

const passwordResetReducer = (state = initialState, action) => {
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

const newPasswordReducer = (state = initialState, action) => {
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

const getPatchReducer = (state = initialState, action) => {
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
    default: {
      return state;
    }
  }
};   

const userRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTRATION: {
      return {
        ...state,
        registrationResult: action.payload
      };
    }
    case REGISTER_NAME_INPUT: {
      return {
        ...state,
        registerNameInput: action.payload
      };
    }
    case REGISTER_EMAIL_INPUT: {
      return {
        ...state,
        registerEmailInput: action.payload
      };
    }
    case REGISTER_PASSWORD_INPUT: {
      return {
        ...state,
        registerPasswordInput: action.payload
      };
    }
    default: {
      return state;
    }
  }
};   

const loginReducer = (state = initialState, action) => {
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
    default: {
      return state;
    }
  }
};   

const copyArrReducer = (state = initialState, action) => {
  switch (action.type) {
    case COPY_ARR_BUN: {
      return {
        ...state,
        newArrIngredientDetails: action.item,      
        newArrBun: [{...action.item, qty: 2}]
      };
    }
    case COPY_ARR_INGREDIENTS: {
      return {
        ...state, 
        newArrBurgerConstructor: [...state.newArrBurgerConstructor, {...action.item, key: action.key, qty: 1}],
        newArrIngredientDetails: action.item, 
        newArrBun: state.newArrBun
      }
    }
    case MOVE_INGREDIENTS: {
      return {
        ...state, 
        newArrBurgerConstructor: [...state.newArrBurgerConstructor, {...action.item, key: action.key, qty: 1}],
        newArrIngredientDetails: action.item, 
        newArrBun: state.newArrBun
      }
    }
    case MOVE_BUNS: {
      return {
        ...state,
        newArrIngredientDetails: action.item,      
        newArrBun: [{...action.item, qty: 2}]
      };
    }
    case DELETE_INGREDIENTS: {
      return { 
        ...state, 
        newArrBurgerConstructor: state.newArrBurgerConstructor.filter(i => i !== action.item)
      };
    }
    case DELETE_INGREDIENT_DETAIL: {
      return { 
        ...state,
        newArrIngredientDetails: {}
      }
    }
    case DELETE_BURGER_CONSTRUCTOR: {
      return {
        ...state, 
        newArrBurgerConstructor: [],
        newArrIngredientDetails: {}, 
        newArrBun: []
      }
    }
    case REORDER_BURGER_CONSTRUCTOR: {
      return {
        ...state, 
        newArrBurgerConstructor: action.payload
      }
    }
    case INGREDIENT_ID: {
      return { 
        ...state,
        ingredientIdCopy: action.payload
      }
    } 
    default: {
      return state;
    }
  }
};

const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNT_BUN_UP: {
      return { 
        ...state, 
        count: {...state.count, [action.index]: state.count[action.index] = 2}
      };
    }
    case COUNT_BUN_DOWN: {
      return { 
        ...state, 
        count: {...state.count, [action.index]: state.count[action.index] = 0}
      };
    }
    case COUNT_INGREDIENT_UP: {
      return { 
        ...state, 
        count: {...state.count, [action.index]: ++ state.count[action.index] },
      };
    }
    case COUNT_INGREDIENT_DOWN: {
      return { 
        ...state, 
        count: {...state.count, [action.index]: -- state.count[action.index] }
      };
    }
    case DELETE_COUNT: {
      return {
        ...state, count: { 0: 0,
                           1: 0,
                           2: 0, 
                           3: 0, 
                           4: 0, 
                           5: 0,
                           6: 0, 
                           7: 0, 
                           8: 0, 
                           9: 0, 
                           10: 0,
                           11: 0, 
                           12: 0, 
                           13: 0, 
                           14: 0 }
      }
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  data: ingredientReducer,
  isNewArr: copyArrReducer,
  order: orderReducer,
  count: countReducer,
  newPassword: newPasswordReducer,
  register: userRegistrationReducer,
  login: loginReducer,
  reset: passwordResetReducer,
  profile: getPatchReducer
});

