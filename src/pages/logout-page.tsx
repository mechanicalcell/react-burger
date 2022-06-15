import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { getProfileResult, userResetAction } from '../services/actions/get-patch';
import { useSelector } from 'react-redux';
import { getCookie, setCookie } from '../components/utils/cookie';
import { userLogout } from '../services/actions/login';

export function LogoutPage() {
  const { logoutResult } = useSelector((store: any) => store.login);  
  const { getResult } = useSelector((store: any) => store.profile);    
  const history = useHistory();     
  const { path } = useRouteMatch();
  const dispatch = useDispatch(); 
  const refreshToken = localStorage.getItem('token');
  const accessToken = getCookie('token');

  useEffect(() => {
    if (path === '/logout' && (getResult.user.email !== null || getResult.user.email)) {
      dispatch(getProfileResult(accessToken, refreshToken))
      dispatch(userLogout(refreshToken))
      localStorage.removeItem('token'); 
      setCookie('token', null)
    }
  }, [path, history, refreshToken, dispatch, accessToken, getResult.user])
  useEffect(() => {
    if (logoutResult['success']) {
      history.replace({ pathname: '/login' })
    }  
  }, [path, logoutResult['success'], history, refreshToken, dispatch])
  return (
    <div></div>
  );
} 