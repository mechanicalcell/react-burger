import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useEffect } from 'react';
import AppHeader from '../components/app-header/app-header';
import { userLogin } from '../services/actions';
import { LOGIN_EMAIL_INPUT,
         LOGIN_PASSWORD_INPUT } from '../services/actions';
import { setCookie } from '../components/utils/cookie';

function LoginEmailInput() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value) 
    dispatch({ type: LOGIN_EMAIL_INPUT, payload: e.target.value })
  }  
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }  
  return ( 
    <Input
      type={'text'}
      placeholder={'E-mail'}
      onChange={onChange}
      icon={''}
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

function LoginPasswordInput() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value) 
    dispatch({ type: LOGIN_PASSWORD_INPUT, payload: e.target.value })
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
      icon={'ShowIcon'}
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

export function LoginPage() {
  const dispatch = useDispatch();    
  const history = useHistory();   
  const { loginEmailInput,
          loginPasswordInput,
          loginResult } = useSelector(store => store.login);  
  const onClick = useCallback(() => {
    dispatch(userLogin(loginEmailInput, loginPasswordInput))
  },
  [loginResult, history, dispatch, loginEmailInput, loginPasswordInput]
  );     
  useEffect(() => {
    if (loginResult['success']) {
      setCookie('token', loginResult.accessToken)
      history.replace({ pathname: '/' })
    }
  }, [loginResult, history])
  return (
    <>
    <AppHeader />
    <div style={{marginTop: '100px',
         display: 'flex', 
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center'}}>
      <h1 className={`text text_type_main-large mb-6`}>Вход</h1>    
      <LoginEmailInput />
      <div className={`text text_type_main-medium mt-6`}>
        <LoginPasswordInput />
      </div>
      <div className={`text text_type_main-medium mt-6`}>
        <Button onClick={onClick} type="primary" size="large">
          Войти
        </Button>
      </div>
      <p className={` text text_type_main-medium mt-20`}>Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
      <p className={` text text_type_main-medium mt-4`}>Забыли пароль? <Link to='/forgot'>Восстановить пароль</Link></p>                
    </div>
    </>
  );
} 