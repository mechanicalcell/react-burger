import React, { FormEvent, RefObject } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { Link } from 'react-router-dom';
import { registerEmailInputAction, registerNameInputAction, registerPasswordInputAction, userRegistration } from '../services/actions/user-registration';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import { useEffect } from 'react';
import styles from './page-container.module.css';
import { useAppDispatch } from '..';
import { useAppSelector } from '..';

function RegisterNameInput() {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value) 
    dispatch(registerNameInputAction(e.target.value))
  }  
  const inputRef = React.useRef(null) as RefObject<any> | null;
  const onIconClick = () => {
    setTimeout(() => inputRef ? inputRef.current.focus() : null, 0)
    alert('Icon Click Callback')
  }  
  return ( 
    <Input
      type={'text'}
      placeholder={'Имя'}
      onChange={onChange}
      icon={undefined}
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
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value) 
    dispatch(registerEmailInputAction(e.target.value))
  }  
  const inputRef = React.useRef(null) as RefObject<any> | null;
  const onIconClick = () => {
    setTimeout(() => inputRef ? inputRef.current.focus() : null, 0)
    alert('Icon Click Callback')
  }  
  return ( 
    <Input
      type={'text'}
      placeholder={'E-mail'}
      onChange={onChange}
      icon={undefined}
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
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value) 
    dispatch(registerPasswordInputAction(e.target.value))
  }  
  const inputRef = React.useRef(null) as RefObject<any> | null;
  const onIconClick = () => {
    setTimeout(() => inputRef ? inputRef.current.focus() : null, 0)
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
  const dispatch = useAppDispatch();    
  const history = useHistory();
  const { registerNameInput, 
          registerEmailInput,
          registerPasswordInput,
          registrationResult } = useAppSelector(store => store.register);  
  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    dispatch(userRegistration(registerNameInput, registerEmailInput, registerPasswordInput))
  },
  [dispatch, registerNameInput, registerEmailInput, registerPasswordInput]
  );     

  useEffect(() => {
    if (registrationResult['success']) {
      history.replace({ pathname: '/login' })
    } 
  }, [registrationResult, history])
  return (
    <div className={styles.register_container}>
      <h1 className={`text text_type_main-large mb-6`}>Регистрация</h1>    
      <form onSubmit={(e) => onSubmit(e)} className={styles.register_container}>
        <RegisterNameInput />
        <div className={`text text_type_main-medium mt-6`}>
          <RegisterEmailInput />
        </div>
        <div className={`text text_type_main-medium mt-6`}>
          <RegisterPasswordInput />            
        </div>
        <div className={`text text_type_main-medium mt-6`}>
          <Button htmlType='submit' type="primary" size="large">
            Зарегистрироваться 
          </Button>
        </div>
      </form>
      <p className={` text text_type_main-medium mt-20`}>Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
    </div>
  );
} 