import { TingredientPropTypes } from "../../components/utils/types";

export const DELETE_INGREDIENTS: 'DELETE_INGREDIENTS' = 'DELETE_INGREDIENTS';
export const DELETE_INGREDIENT_DETAIL: 'DELETE_INGREDIENT_DETAIL' = 'DELETE_INGREDIENT_DETAIL';
export const MOVE_INGREDIENTS: 'MOVE_INGREDIENTS' = 'MOVE_INGREDIENTS';
export const MOVE_BUNS: 'MOVE_BUNS' = 'MOVE_BUNS';
export const DELETE_BURGER_CONSTRUCTOR: 'DELETE_BURGER_CONSTRUCTOR' = 'DELETE_BURGER_CONSTRUCTOR';
export const REORDER_BURGER_CONSTRUCTOR: 'REORDER_BURGER_CONSTRUCTOR' = 'REORDER_BURGER_CONSTRUCTOR';
export const INGREDIENT_ID: 'INGREDIENT_ID' = 'INGREDIENT_ID';

export interface IDeleteIngredientsAction {
  readonly type: typeof DELETE_INGREDIENTS;
  item: TingredientPropTypes
}

export interface IDeleteIngredientDetailAction {
  readonly type: typeof DELETE_INGREDIENT_DETAIL;
}

export interface IMoveIngredientsAction {
  readonly type: typeof MOVE_INGREDIENTS;
  item: TingredientPropTypes;
  key: string
}

export interface IMoveBunsAction {
  readonly type: typeof MOVE_BUNS;
  item: TingredientPropTypes;
  index: number
}

export interface IDeleteBurgerConstructorAction        {
  readonly type: typeof DELETE_BURGER_CONSTRUCTOR;
}

export interface IIngredientIdCopyAction {
  readonly type: typeof INGREDIENT_ID;
  ingredientIdCopy: TingredientPropTypes;
}

export interface IReorderBurgerConstructorAction {
  readonly type: typeof REORDER_BURGER_CONSTRUCTOR;
  newArrBurgerConstructor: any[]
}

export const deleteIngredientsAction = (item: TingredientPropTypes): IDeleteIngredientsAction => ({
  type: DELETE_INGREDIENTS,
  item
});

export const deleteIngredientDetailAction = (): IDeleteIngredientDetailAction => ({
  type: DELETE_INGREDIENT_DETAIL
});

export const moveIngredientsAction = (item: TingredientPropTypes, key: string): IMoveIngredientsAction => ({
  type: MOVE_INGREDIENTS,
  item,
  key
});

export const moveBunsAction = (item: TingredientPropTypes, index: number): IMoveBunsAction => ({
  type: MOVE_BUNS,
  item,
  index
});

export const deleteBurgerConstructorAction = (): IDeleteBurgerConstructorAction => ({
  type: DELETE_BURGER_CONSTRUCTOR
});

export const ingredientIdCopyAction = (ingredientIdCopy: TingredientPropTypes): IIngredientIdCopyAction => ({
  type: INGREDIENT_ID,
  ingredientIdCopy,
});

export const reorderBurgerConstructorAction = (newArrBurgerConstructor: any[]): IReorderBurgerConstructorAction => ({
  type: REORDER_BURGER_CONSTRUCTOR,
  newArrBurgerConstructor
});

export type TCopyArrActions =
  | IDeleteIngredientsAction
  | IDeleteIngredientDetailAction
  | IMoveIngredientsAction
  | IMoveBunsAction
  | IDeleteBurgerConstructorAction
  | IIngredientIdCopyAction
  | IReorderBurgerConstructorAction;