export const COUNT_BUN_UP: 'COUNT_BUN_UP' = 'COUNT_BUN_UP';
export const COUNT_BUN_DOWN: 'COUNT_BUN_DOWN' = 'COUNT_BUN_DOWN';
export const COUNT_INGREDIENT_UP: 'COUNT_INGREDIENT_UP' = 'COUNT_INGREDIENT_UP';
export const COUNT_INGREDIENT_DOWN: 'COUNT_INGREDIENT_DOWN' = 'COUNT_INGREDIENT_DOWN';
export const DELETE_COUNT: 'DELETE_COUNT' = 'DELETE_COUNT';

export interface ICountBunUpAction {
  readonly type: typeof COUNT_BUN_UP;
  index: number;
}

export interface ICountBunDownAction {
  readonly type: typeof COUNT_BUN_DOWN;
  index: number;
}

export interface ICountIngredientUpAction {
  readonly type: typeof COUNT_INGREDIENT_UP;
  index: number;
}

export interface ICountIngredientDownAction {
  readonly type: typeof COUNT_INGREDIENT_DOWN;
  index: number;
}

export interface IDeleteCountAction {
  readonly type: typeof DELETE_COUNT;
}

export const countBunUpAction = (index: number): ICountBunUpAction => ({
  type: COUNT_BUN_UP,
  index
});

export const countBunDownAction = (index: number): ICountBunDownAction => ({
  type: COUNT_BUN_DOWN,
  index
});

export const countIngredientUpAction = (index: number): ICountIngredientUpAction => ({
  type: COUNT_INGREDIENT_UP,
  index
});

export const countIngredientDownAction = (index: number): ICountIngredientDownAction => ({
  type: COUNT_INGREDIENT_DOWN,
  index
});

export const deleteCountAction = (): IDeleteCountAction => ({
  type: DELETE_COUNT
});

export type TCountActions =
  | ICountBunUpAction
  | ICountBunDownAction
  | ICountIngredientUpAction
  | ICountIngredientDownAction
  | IDeleteCountAction;
