import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { getProfileResult, USER_RESET } from '../services/actions/get-patch';
import { userLogout } from '../services/actions'; 
import { useSelector } from 'react-redux';
import { getCookie, setCookie } from '../components/utils/cookie';

export function LogoutPage() {
  const { loginResult, logoutResult, user } = useSelector(store => store.login);  
  const { getResult } = useSelector(store => store.profile);    
  const history = useHistory();     
  const { path } = useRouteMatch();
  const dispatch = useDispatch(); 
  console.log(logoutResult)

  const refreshToken = localStorage.getItem('token');
  const accessToken = getCookie('token');
  useEffect(() => {
    if (path === '/logout' && getResult.user !== null) {
      dispatch(getProfileResult(accessToken))
      dispatch(userLogout(refreshToken)) 
      localStorage.removeItem('token'); 
      setCookie('token', null)
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