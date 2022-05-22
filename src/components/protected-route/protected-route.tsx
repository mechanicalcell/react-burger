import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TProtectedRoute } from './protected-route-types';
import { FC } from 'react';

export const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {
  const { getResult } = useSelector((store: any) => store.profile);  
  return <Route {...rest} render={({location}) =>
     
  getResult.user.email ? (
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