import { ReactNode } from "react";
import { TingredientPropTypes } from "../utils/types";

export type TIngredients = {
  onOpen: () => void;
  ingrType: string;
  item: TingredientPropTypes;
  index: number;
  children?: ReactNode;
};