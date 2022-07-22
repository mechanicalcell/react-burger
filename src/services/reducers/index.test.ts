import { ingredientReducer } from ".";
import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, TIngredientActions } from "../actions";

const initialState = {
  isLoading: false,
  hasError: false,
  data: []
};

describe('ingredient reducer', () => {
  it(`should return the initial state`, () => {
    expect(ingredientReducer(undefined, <TIngredientActions>{} )).toEqual(initialState)
  })

  it('should handle GET_INGREDIENTS', () => {
    const action = {
        type: GET_INGREDIENTS
      }  
    const expectedState = {
        ...initialState, 
        isLoading: true
    }  
    expect(ingredientReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    const data: [] = []
    const action = {
        type: GET_INGREDIENTS_SUCCESS,
        data
      }  
    const expectedState = {
        ...initialState, 
        hasError: false, data: action.data, isLoading: false
    }  
    expect(ingredientReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle GET_INGREDIENTS_FAILED', () => {
    const action = {
        type: GET_INGREDIENTS_FAILED
      }  
    const expectedState = {
        ...initialState, 
        hasError: true, isLoading: false
    }  
    expect(ingredientReducer(initialState, action)).toEqual(expectedState)
  })

}) 