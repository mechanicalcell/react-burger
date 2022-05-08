import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { getNewPassword } from '../services/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { NEW_PASSWORD_INPUT,
         CODE_INPUT } from '../services/actions';
import { Link, Redirect } from 'react-router-dom';
import AppHeader from '../components/app-header/app-header';

function PasswordInput() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value) 
    dispatch({ type: NEW_PASSWORD_INPUT, payload: e.target.value })
  }  
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }  
  return ( 
    <Input
      type={'text'}
      placeholder={'Введите новый пароль'}
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

function CodeInput() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value) 
    dispatch({ type: CODE_INPUT, payload: e.target.value })
  }  
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }  
  return ( 
    <Input
      type={'text'}
      placeholder={'Введите код из письма'}
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
  
export function ResetPasswordPage() {
  const dispatch = useDispatch();  
  const { newPasswordInput, codeInput, newPassword } = useSelector(store => store.newPassword);
  const { loginResult } = useSelector(store => store.login);    
  const history = useHistory();   
  const onClick = useCallback(() => {
    dispatch(getNewPassword(newPasswordInput, codeInput))
  },
  [dispatch, newPasswordInput, codeInput]
  );     
  useEffect(() => {
    if (newPassword['success']) {
      history.replace({ pathname: '/login' })
    }
  }, [newPassword, history])
  useEffect(() => {
    if (loginResult['success']) {
      return <Redirect to={'/login'} />;
    }
  }, [loginResult])  
  return ( 
    <>
    <AppHeader />
    <div style={{ marginTop: '100px',
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center' }}> 
      <h1 className={`text text_type_main-large mb-6`}>Восстановление пароля</h1>    
      <PasswordInput /> 
      <div className={`text text_type_main-medium mt-6`}>
        <CodeInput />
      </div>
      <div className={`text text_type_main-medium mt-6`}>
        <Button onClick={onClick} type="primary" size="large"> 
          Сохранить
        </Button>
      </div>
      <p className={`text text_type_main-medium mt-20`}>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    </div>
    </>
  );
} 