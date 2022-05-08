import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { getProfileResult, userLogout } from '../services/actions';
import { useSelector } from 'react-redux';
import { getCookie } from '../components/utils/cookie';

export function LogoutPage() {
  const { loginResult, logoutResult, user } = useSelector(store => store.login);  
  const history = useHistory();     
  const { path } = useRouteMatch();
  const dispatch = useDispatch(); 
  localStorage.setItem('token', loginResult.refreshToken);
  const refreshToken = localStorage.getItem('token');
  const accessToken = getCookie('token');
  useEffect(() => {
    if (path === '/logout' && user !== null) {
      dispatch(getProfileResult(accessToken))
      dispatch(userLogout(refreshToken))  
    }
  }, [path, history, refreshToken, dispatch, accessToken, user])
  useEffect(() => {
    if (logoutResult['success']) {
      history.replace({ pathname: '/login' })
    }  
  }, [path, logoutResult, history, refreshToken, dispatch])
  return (
    <div></div>
  );
} 