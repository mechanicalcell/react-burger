import { AppDispatch, AppThunk } from "../..";
import { TingredientPropTypes } from "../../components/utils/types";
import { getIngredients } from "../api";

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export interface IIngredientsAction {
  readonly type: typeof GET_INGREDIENTS;
}

export interface IIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  data: Array<TingredientPropTypes>
}

export interface IIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export const getIngredientsAction = (): IIngredientsAction => ({
  type: GET_INGREDIENTS
});

export const getIngredientsSuccessAction = (data: Array<TingredientPropTypes>): IIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  data
});

export const getIngredientsFailedAction = (): IIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED
});

export type TIngredientActions =
  | IIngredientsAction
  | IIngredientsSuccessAction
  | IIngredientsFailedAction;

export const getItems: AppThunk = () => { 
  return async function(dispatch: AppDispatch) {
    try {   
    dispatch(getIngredientsAction());
    const res = await getIngredients()
    const r = await Promise.resolve(res)
    if (r.success) {
      dispatch(getIngredientsSuccessAction(r.data.map((item: TingredientPropTypes, index: number) => { return {...item, index: index } })))
    } else {
        dispatch(getIngredientsFailedAction());
        return await Promise.reject(r);
      }
    } catch (r: any) {
        console.log(r)
      } 
  }
}
