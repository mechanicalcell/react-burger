import { combineReducers } from 'redux';
import { copyArrReducer } from './copy-arr';
import { loginReducer } from './login';
import { countReducer } from './count';
import { orderReducer } from './order';
import { getPatchReducer } from './get-patch';
import { userRegistrationReducer } from './user-registration';
import { newPasswordReducer } from './new-password';
import { passwordResetReducer } from './password-reset';
import { GET_INGREDIENTS,
         GET_INGREDIENTS_SUCCESS,
         GET_INGREDIENTS_FAILED,
         TIngredientActions
} from '../actions/index';
import { wsReducer } from '../ws-reducer';
import { TingredientPropTypes } from '../../components/utils/types';

const initialState: { isLoading: boolean,
                      hasError: boolean,
                      data: Array<TingredientPropTypes> 
                    } = {
  isLoading: false,
  hasError: false,
  data: []
};
  
export const ingredientReducer = (state = initialState, action: TIngredientActions) => {
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

export const rootReducer = combineReducers({
  data: ingredientReducer,
  isNewArr: copyArrReducer,
  order: orderReducer,
  count: countReducer,
  newPassword: newPasswordReducer,
  register: userRegistrationReducer,
  login: loginReducer,
  reset: passwordResetReducer,
  profile: getPatchReducer,
  orders: wsReducer
});

