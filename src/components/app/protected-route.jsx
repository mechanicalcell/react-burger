import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children, ...rest }) {
  const { loginResult } = useSelector(store => store.login);  
  return <Route {...rest} render={({location}) =>
               
  loginResult.success ? (
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