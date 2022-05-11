import { COPY_ARR_BUN,
         COPY_ARR_INGREDIENTS,
         DELETE_INGREDIENTS,
         DELETE_INGREDIENT_DETAIL,
         MOVE_INGREDIENTS,
         MOVE_BUNS,
         DELETE_BURGER_CONSTRUCTOR,
         REORDER_BURGER_CONSTRUCTOR,
         INGREDIENT_ID
} from '../actions/copy-arr';

const initialState = {
  newArrBurgerConstructor: [], 
  newArrIngredientDetails: {},
  newArrBun: [],
  ingredientIdCopy: null
};


export const copyArrReducer = (state = initialState, action) => {
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
  