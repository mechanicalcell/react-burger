import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FC } from 'react';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { getResult } = useSelector((store: any) => store.profile); 
  const { loginResult } = useSelector((store: any) => store.login);   
  return <Route {...rest} render={({location}) =>
     
  loginResult['success'] || getResult.user.email ? (
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