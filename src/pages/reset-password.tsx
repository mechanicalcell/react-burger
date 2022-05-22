import React, { FormEvent, RefObject } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { getNewPassword } from '../services/actions/new-password';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './page-container.module.css';
import { NEW_PASSWORD_INPUT,
         CODE_INPUT 
} from '../services/actions/new-password';

function PasswordInput() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value) 
    dispatch({ type: NEW_PASSWORD_INPUT, payload: e.target.value })
  }  
  const inputRef = React.useRef(null) as RefObject<any> | null;
  const onIconClick = () => {
    setTimeout(() => inputRef ? inputRef.current.focus() : null, 0)
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
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value) 
    dispatch({ type: CODE_INPUT, payload: e.target.value })
  }  
  const inputRef = React.useRef(null) as RefObject<any> | null;
  const onIconClick = () => {
    setTimeout(() => inputRef ? inputRef.current.focus() : null, 0)
    alert('Icon Click Callback')
  }  
  return ( 
    <Input
      type={'text'}
      placeholder={'Введите код из письма'}
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
  
export function ResetPasswordPage() {
  const dispatch = useDispatch();  
  const { newPasswordInput, codeInput, newPassword } = useSelector((store: any) => store.newPassword);
  const { passwordResetResult } = useSelector((store: any) => store.reset) 
  const history = useHistory();   
  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()  
    dispatch(getNewPassword(newPasswordInput, codeInput))
  },
  [dispatch, newPasswordInput, codeInput]
  );     
  useEffect(() => {
    if (newPassword['success']) {
      history.replace({ pathname: '/login' })
    }
  }, [newPassword, history])
  console.log(passwordResetResult)
  useEffect(() => {
    if (passwordResetResult.success === null) {
      history.replace({ pathname: '/forgot' })
    }
  }, [newPassword, history, passwordResetResult.success])  
  return ( 
    <div className={styles.reset_container}>
      <h1 className={`text text_type_main-large mb-6`}>Восстановление пароля</h1>    
      <form onSubmit={(e) => onSubmit(e)} className={styles.reset_container}>
        <PasswordInput /> 
        <div className={`text text_type_main-medium mt-6`}>
          <CodeInput />
        </div>
        <div className={`text text_type_main-medium mt-6`}>
          <Button htmlType='submit' type="primary" size="large"> 
            Сохранить
          </Button>
        </div>
      </form>
      <p className={`text text_type_main-medium mt-20`}>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    </div>
  );
} 