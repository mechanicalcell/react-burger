import { v4 as uuidv4 } from 'uuid';
import { combineReducers } from 'redux';
import { GET_INGREDIENTS,
         GET_INGREDIENTS_SUCCESS,
         GET_INGREDIENTS_FAILED,
         COPY_ARR_BUN,
         COPY_ARR_INGREDIENTS,
         DELETE_INGREDIENTS,
         DELETE_INGREDIENT_DETAIL,
         ORDER_NUMBER_REQUEST,
         DELETE_ORDER_NUMBER
} from '../actions/index';

const initialState = {
  isLoading: false,
  hasError: false,
  data: [],
  newArrBurgerConstructor: [], 
  newArrIngredientDetails: {},
  newArrBun: [],
  orderNumber: null
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
        newArrBurgerConstructor: [...state.newArrBurgerConstructor, {...action.item, key: uuidv4(), qty: 1, count: `count${action.index}`}],
        newArrIngredientDetails: action.item, 
        newArrBun: state.newArrBun
      }
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
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  data: ingredientReducer,
  isNewArr: copyArrReducer,
  order: orderReducer
});

