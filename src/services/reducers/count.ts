import { COUNT_BUN_UP,
         COUNT_BUN_DOWN,
         COUNT_INGREDIENT_UP,
         COUNT_INGREDIENT_DOWN,
         DELETE_COUNT,
         TCountActions
} from '../actions/count';

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
  
export const countReducer = (state = initialState, action: TCountActions) => {
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
