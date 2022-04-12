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
         DELETE_ORDER_NUMBER,
         MOVE_INGREDIENTS,
         MOVE_BUNS,
         COUNT_BUN_UP,
         COUNT_BUN_DOWN,
         COUNT_INGREDIENT_UP,
         COUNT_INGREDIENT_DOWN
} from '../actions/index';

const initialState = {
  isLoading: false,
  hasError: false,
  data: [],
  newArrBurgerConstructor: [], 
  newArrIngredientDetails: {},
  newArrBun: [],
  orderNumber: null,
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
        newArrBurgerConstructor: [...state.newArrBurgerConstructor, {...action.item, key: uuidv4(), qty: 1 }],
        newArrIngredientDetails: action.item, 
        newArrBun: state.newArrBun
      }
    }
    case MOVE_INGREDIENTS: {
      return {
        ...state, 
        newArrBurgerConstructor: [...state.newArrBurgerConstructor, {...action.item, key: uuidv4(), qty: 1 }],
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
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  data: ingredientReducer,
  isNewArr: copyArrReducer,
  order: orderReducer,
  count: countReducer
});

