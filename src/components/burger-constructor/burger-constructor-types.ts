import { TingredientPropTypes } from "../utils/types";
import { ReactNode } from "react";

export type TConstructorIngredientsProps = {
  item: TingredientPropTypes;
  index: number;
  deleteIngredient: (item: TingredientPropTypes , index: number) => void;
  children?: ReactNode;
}; 

export type TingredientsHandleDrop = (index: number) => void;

export type TBurgerConstructorProps = {
  onOpen: () => void;
  deleteIngredient: (item: TingredientPropTypes , index: number) => void;
  totalPrice: number;
  ingredientHandleDrop: (item: TingredientPropTypes , index: number) => void;
  bunHandleDrop: (item: TingredientPropTypes , index: number) => void;
  children?: ReactNode;
};

export type TonClick = () => void;