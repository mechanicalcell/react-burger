import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children, ...rest }) {
  const { getResult } = useSelector(store => store.profile);  
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