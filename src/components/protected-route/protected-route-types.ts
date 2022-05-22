import { ReactNode } from "react"
import { RouteProps } from "react-router-dom";

export type TProtectedRoute = {
  children?: ReactNode;
  path?: string;
  exact?: boolean;
} 