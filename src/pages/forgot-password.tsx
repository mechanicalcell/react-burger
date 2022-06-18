import React, { FormEvent } from 'react';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { Link } from 'react-router-dom';
import { getPasswordReset } from '../services/actions/password-reset';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import { useEffect } from 'react';
import styles from './page-container.module.css';
import { useAppDispatch, useAppSelector } from '..';

export function ForgotPasswordPage() {
  const { passwordResetResult } = useAppSelector(store => store.reset) 
  const history = useHistory();   
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }  
  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()  
    dispatch(getPasswordReset(value))
  },
  [dispatch, value]
  ); 
  useEffect(() => {
   if (passwordResetResult.success && value) {
     history.replace({ pathname: '/reset' })
   }
  }, [passwordResetResult, history, value])
  return ( 
    <div className={styles.forgot_container}>
      <h1 className={`text text_type_main-large mb-6`}>Восстановление пароля</h1>    
      <form onSubmit={(e) => onSubmit(e)} className={styles.forgot_container}>
        <EmailInput onChange={onChange} value={value} name={'e-mail'} />
        <div className={`text text_type_main-medium mt-6`}>
        <Button htmlType='submit' type="primary" size="large">
          Восстановить
        </Button>
        </div>
      </form>
      <p className={`text text_type_main-medium mt-20`}>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    </div> 
  );
} 