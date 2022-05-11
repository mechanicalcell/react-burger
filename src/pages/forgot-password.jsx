import React from 'react';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { Link } from 'react-router-dom';
import { getPasswordReset } from '../services/actions/password-reset';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './page-container.module.css';

export function ForgotPasswordPage() {
  const { passwordResetResult } = useSelector(store => store.reset) 
  const history = useHistory();   
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value)
  }  
  const onClick = useCallback(() => {
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
      <EmailInput onChange={onChange} value={value} name={'e-mail'} />
      <div className={`text text_type_main-medium mt-6`}>
      <Button onClick={onClick} type="primary" size="large">
        Восстановить
      </Button>
      </div>
      <p className={`text text_type_main-medium mt-20`}>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    </div> 
  );
} 