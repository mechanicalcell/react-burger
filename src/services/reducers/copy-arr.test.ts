import { copyArrReducer } from "./copy-arr";
import { DELETE_INGREDIENTS,
    DELETE_INGREDIENT_DETAIL,
    MOVE_INGREDIENTS,
    MOVE_BUNS,
    DELETE_BURGER_CONSTRUCTOR,
    REORDER_BURGER_CONSTRUCTOR,
    INGREDIENT_ID, TCopyArrActions, deleteIngredientsAction, moveIngredientsAction } from '../actions/copy-arr';
    import { TingredientPropTypes } from "../../components/utils/types";

const initialState = {
  newArrBurgerConstructor: [], 
  newArrIngredientDetails: {},
  newArrBun: [],
  ingredientIdCopy: null
};

describe('copyarr reducer', () => {
  it(`should return the initial state`, () => {
    expect(copyArrReducer(undefined, <TCopyArrActions>{} )).toEqual(initialState)
  })

  it('should handle MOVE_INGREDIENTS', () => {
    const item = <TingredientPropTypes>{}
    const key = 'string'  
    const action = {
        type: MOVE_INGREDIENTS,
        item,
        key
      }  
    const expectedState = {
        ...initialState, 
        newArrBurgerConstructor: [...initialState.newArrBurgerConstructor, {...action.item, key: action.key, qty: 1}],
        newArrIngredientDetails: action.item, 
        newArrBun: initialState.newArrBun
      }  
    expect(copyArrReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle MOVE_BUNS', () => {
    const item = <TingredientPropTypes>{}
    const index = 0  
    const action = {
        type: MOVE_BUNS,
        item,
        index
      }  
    const expectedState = {
        ...initialState, 
        newArrIngredientDetails: action.item,      
        newArrBun: [{...action.item, qty: 2}]
    }  
    expect(copyArrReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle DELETE_INGREDIENTS', () => {
    const item = <TingredientPropTypes>{}
    const action = {
        type: DELETE_INGREDIENTS,
        item
      }  
    const expectedState = {
        ...initialState, 
        newArrBurgerConstructor: initialState.newArrBurgerConstructor.filter(i => i !== action.item)    }  
    expect(copyArrReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle DELETE_INGREDIENT_DETAIL', () => {
    const action = {
        type: DELETE_INGREDIENT_DETAIL,
      }  
    const expectedState = {
        ...initialState, 
        newArrIngredientDetails: {}
     }  
    expect(copyArrReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle DELETE_BURGER_CONSTRUCTOR', () => {
    const action = {
        type: DELETE_BURGER_CONSTRUCTOR,
      }  
    const expectedState = {
        ...initialState, 
        newArrBurgerConstructor: [],
        newArrIngredientDetails: {}, 
        newArrBun: []
    }  
    expect(copyArrReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle REORDER_BURGER_CONSTRUCTOR', () => {
    const newArrBurgerConstructor = <any>[]
    const action = {
        type: REORDER_BURGER_CONSTRUCTOR,
        newArrBurgerConstructor
      }  
    const expectedState = {
        ...initialState, 
        newArrBurgerConstructor: action.newArrBurgerConstructor}  
    expect(copyArrReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle INGREDIENT_ID', () => {
    const newArrBurgerConstructor = <any>[]
    const action = {
        type: INGREDIENT_ID,
        ingredientIdCopy: <TingredientPropTypes>{}
      }  
    const expectedState = {
        ...initialState, 
        ingredientIdCopy: action.ingredientIdCopy }
    expect(copyArrReducer(initialState, action)).toEqual(expectedState)
  })

}) 