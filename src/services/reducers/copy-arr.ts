import { TingredientPropTypes } from '../../components/utils/types';
import { DELETE_INGREDIENTS,
         DELETE_INGREDIENT_DETAIL,
         MOVE_INGREDIENTS,
         MOVE_BUNS,
         DELETE_BURGER_CONSTRUCTOR,
         REORDER_BURGER_CONSTRUCTOR,
         INGREDIENT_ID,
         TCopyArrActions
} from '../actions/copy-arr';

const initialState: {
  newArrBurgerConstructor: TingredientPropTypes[] | [], 
  newArrIngredientDetails: {},
  newArrBun: TingredientPropTypes | [] | any,
  ingredientIdCopy: number | null | any
} = {
  newArrBurgerConstructor: [], 
  newArrIngredientDetails: {},
  newArrBun: [],
  ingredientIdCopy: null
};

export const copyArrReducer = (state = initialState, action: TCopyArrActions) => {
    switch (action.type) {
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
          newArrBurgerConstructor: action.newArrBurgerConstructor
        }
      }
      case INGREDIENT_ID: {
        return { 
          ...state,
          ingredientIdCopy: action.ingredientIdCopy
        }
      } 
      default: {
        return state;
      }
    }
  };
  