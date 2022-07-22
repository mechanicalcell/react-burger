import { countReducer } from "./count";
import { COUNT_BUN_DOWN, COUNT_BUN_UP, COUNT_INGREDIENT_DOWN, COUNT_INGREDIENT_UP, DELETE_COUNT, TCountActions } from "../actions/count";

const initialState: any = {
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
           14: 0
  }
};

describe('count reducer', () => {
  it(`should return the initial state`, () => {
    expect(countReducer(undefined, <TCountActions>{} )).toEqual(initialState)
  })

  it('should handle COUNT_BUN_UP', () => {
    const index = 2
    const action = {
        type: COUNT_BUN_UP,
        index
      }  
    const expectedState = {
        ...initialState, 
        count: {...initialState.count, [action.index]: initialState.count[action.index] = 2}      }  
    expect(countReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle COUNT_BUN_DOWN', () => {
    const index = 0
    const action = {
        type: COUNT_BUN_DOWN,
        index
      }  
    const expectedState = {
        ...initialState, 
        count: {...initialState.count, [action.index]: initialState.count[action.index] = 0} }
    expect(countReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle COUNT_INGREDIENT_UP', () => {
    const index = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14
    const action = {
        type: COUNT_INGREDIENT_UP,
        index
      }  
    const expectedState = {
        ...initialState, 
        count: {...initialState.count, [action.index]: ++ initialState.count[action.index] }    }  
    expect(countReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle COUNT_INGREDIENT_DOWN', () => {
    const index = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14
    const action = {
        type: COUNT_INGREDIENT_DOWN,
        index
      }  
    const expectedState = {
        ...initialState, 
        count: {...initialState.count, [action.index]: -- initialState.count[action.index] }}
    expect(countReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle DELETE_COUNT', () => {

    const action = {
        type: DELETE_COUNT,
      }  
    const expectedState = {
        ...initialState, 
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
            14: 0 }}
    expect(countReducer(initialState, action)).toEqual(expectedState)
  })

}) 

