import { Redirect, Route, RouteProps } from 'react-router-dom';
import { FC } from 'react';
import { useAppSelector } from '../..';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { getResult } = useAppSelector(store => store.profile); 
  const { loginResult } = useAppSelector(store => store.login);   

  return <Route {...rest} render={({location}) =>
     
  loginResult['success'] || !!getResult.user.email ? (
          children
        ) : (
                    <Redirect
                        to={{
          pathname: '/login',
          state: { from: location }
        }}
          />
                ) 
} /> }