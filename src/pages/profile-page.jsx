import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { patchProfileResult, tokenRefreshResult } from '../services/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import AppHeader from '../components/app-header/app-header';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { PROFILE_NAME_INPUT,
         PROFILE_EMAIL_INPUT,
         PROFILE_PASSWORD_INPUT } from '../services/actions';
import { getProfileResult } from '../services/actions'; 
import { getCookie, setCookie } from '../components/utils/cookie';

function ProfileNameInput() {
  const dispatch = useDispatch();
  const { getResult } = useSelector(store => store.profile);  
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value) 
    dispatch({ type: PROFILE_NAME_INPUT, payload: e.target.value })
  }  
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }  
  return ( 
    <Input
      type={'text'}
      placeholder={`Имя: ${getResult.user.name}`}
      onChange={onChange}
      icon={'EditIcon'}
      value={value}
      name={'name'}
      error={false} 
      ref={inputRef}
      onIconClick={onIconClick}
      errorText={'Ошибка'}
      size={'default'}
    />  
  );
} 
  
function ProfileEmailInput() {
  const dispatch = useDispatch();
  const { getResult } = useSelector(store => store.profile);  
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value) 
    dispatch({ type: PROFILE_EMAIL_INPUT, payload: e.target.value })
  }  
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }  
  return ( 
    <Input
      type={'text'}
      placeholder={`Логин: ${getResult.user.email}`}
      onChange={onChange}
      icon={'EditIcon'}
      value={value}
      name={'name'}
      error={false} 
      ref={inputRef}
      onIconClick={onIconClick}
      errorText={'Ошибка'}
      size={'default'}
    />  
  );
} 

function ProfilePasswordInput() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value) 
    dispatch({ type: PROFILE_PASSWORD_INPUT, payload: e.target.value })
  }  
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }  
  return ( 
    <Input
      type={'text'}
      placeholder={'Пароль'}
      onChange={onChange}
      icon={'EditIcon'}
      value={value}
      name={'name'}
      error={false} 
      ref={inputRef}
      onIconClick={onIconClick}
      errorText={'Ошибка'}
      size={'default'}
    />  
  );
} 
    
export function ProfilePage() {
  const { path } = useRouteMatch();
  const profileStyle = path === '/profile' ? 'text text_type_main-large' : 'text text_type_main-large text_color_inactive'
  const orderHistoryStyle = path === '/profile/orders' || path === '/profile/orders:id' ? 'text text_type_main-large' : 'text text_type_main-large text_color_inactive'
  const logoutStyle = path === '/logout' ? 'text text_type_main-large' : 'text text_type_main-large text_color_inactive'  
  const dispatch = useDispatch();    
  const { profileNameInput, 
          profileEmailInput,
          profilePasswordInput } = useSelector(store => store.profile);  
  const { getResult, 
          patchResult } = useSelector(store => store.profile);  
  const { loginResult } = useSelector(store => store.login);  
  localStorage.setItem('accessToken', loginResult.accessToken);
  setCookie('token', loginResult.accessToken)
  const accessToken = getCookie('token');
  const onClick = () => {
    dispatch(getProfileResult(accessToken))    
    dispatch(patchProfileResult(accessToken, profileNameInput, profileEmailInput, profilePasswordInput))
  }  
  useEffect(() => {
    if (loginResult.accessToken === null) {  
      dispatch(tokenRefreshResult(loginResult.refreshToken))
    }  
  }, [dispatch, loginResult])
  useEffect(() => {
    if (getResult.user.name === null || getResult.user.email === null) {  
      dispatch(getProfileResult(accessToken))
    }  
  }, [dispatch, accessToken, getResult, patchResult, getProfileResult])
  useEffect(() => {
    if (patchResult.success) {  
      dispatch(getProfileResult(accessToken))
    }  
  }, [dispatch, patchResult, accessToken])
  return (
    <div>
    <AppHeader />
    <div style={{ display: 'flex', 
                  marginTop: '200px',
                  marginLeft: '100px',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  width: '240px' }}>
      <NavLink to={{ pathname: `/profile` }} className={profileStyle}> 
        <p className="text text_type_main-medium">Профиль</p> 
      </NavLink>
      <NavLink to={{ pathname: `/profile/orders` }} className={`${orderHistoryStyle} mt-6`}> 
        <p className="text text_type_main-medium">История заказов</p>  
      </NavLink>
      <NavLink to={{ pathname: `/logout` }} className={`${logoutStyle} mt-6`}> 
        <p className="text text_type_main-medium">Выход</p>
      </NavLink>
    </div>       
    <div style={{marginTop: '-200px',
         display: 'flex', 
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center'}}>
      {path === '/profile' &&
      ((<><ProfileNameInput />
      <div className={`text text_type_main-medium mt-6`}>
        <ProfileEmailInput />
      </div>
      <div className={`text text_type_main-medium mt-6`}>
        <ProfilePasswordInput />            
      </div></>))} 
      {<div className={`text text_type_main-medium mt-6`} onClick={onClick}> 
        <Button>Сохранить</Button>
      </div>}       
    </div>
    </div>
  );
} 
