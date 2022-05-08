import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { Link, Redirect } from 'react-router-dom';
import { userRegistration } from '../services/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AppHeader from '../components/app-header/app-header';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { REGISTER_NAME_INPUT,
         REGISTER_EMAIL_INPUT,
         REGISTER_PASSWORD_INPUT } from '../services/actions';

function RegisterNameInput() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value) 
    dispatch({ type: REGISTER_NAME_INPUT, payload: e.target.value })
  }  
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }  
  return ( 
    <Input
      type={'text'}
      placeholder={'Имя'}
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
  
function RegisterEmailInput() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value) 
    dispatch({ type: REGISTER_EMAIL_INPUT, payload: e.target.value })
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

function RegisterPasswordInput() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value) 
    dispatch({ type: REGISTER_PASSWORD_INPUT, payload: e.target.value })
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
    
export function RegisterPage() {
  const dispatch = useDispatch();    
  const history = useHistory();   
  const { loginResult } = useSelector(store => store.login);      
  const { registerNameInput, 
          registerEmailInput,
          registerPasswordInput,
          registrationResult } = useSelector(store => store.register);  
  const onClick = useCallback(() => {
    dispatch(userRegistration(registerNameInput, registerEmailInput, registerPasswordInput))
  },
  [dispatch, registerNameInput, registerEmailInput, registerPasswordInput]
  );     
  useEffect(() => {
    if (registrationResult['success']) {
      history.replace({ pathname: '/login' })
    }
  }, [registrationResult, history])
  useEffect(() => {
    if (loginResult['success']) {
      return <Redirect to={'/login'} />;
    }
  }, [loginResult])  
  return (
    <>
    <AppHeader />
    <div style={{marginTop: '100px',
         display: 'flex', 
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center'}}>
      <h1 className={`text text_type_main-large mb-6`}>Регистрация</h1>    
      <RegisterNameInput />
      <div className={`text text_type_main-medium mt-6`}>
        <RegisterEmailInput />
      </div>
      <div className={`text text_type_main-medium mt-6`}>
        <RegisterPasswordInput />            
      </div>
      <div className={`text text_type_main-medium mt-6`}>
        <Button onClick={onClick} type="primary" size="large">
          Зарегистрироваться 
        </Button>
      </div>
      <p className={` text text_type_main-medium mt-20`}>Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
    </div>
    </>
  );
} 