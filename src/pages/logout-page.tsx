import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { getProfileResult } from '../services/actions/get-patch';
import { deleteCookie, getCookie } from '../components/utils/cookie';
import { userLogout } from '../services/actions/login';
import { useAppDispatch, useAppSelector } from '..';

export function LogoutPage() {
  const { logoutResult } = useAppSelector(store => store.login);  
  const { getResult } = useAppSelector(store => store.profile);    
  const history = useHistory();     
  const { path } = useRouteMatch();
  const dispatch = useAppDispatch(); 

  useEffect(() => {
    if (path === '/logout' && (getResult.user.email !== null || getResult.user.email)) {
      dispatch(getProfileResult(getCookie('token'), getCookie('refreshToken') ))
      dispatch(userLogout(getCookie('refreshToken')))
      deleteCookie('refreshToken')
      deleteCookie('token')
    }
  }, [path, history, dispatch, getResult.user.email])

  useEffect(() => {
    if (logoutResult['success']) {
      history.replace({ pathname: '/login' })
    }  
  }, [logoutResult, path, history, dispatch])
  return (
    <div></div>
  );
} 