import React from 'react';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { Link } from 'react-router-dom';
import { getPasswordReset } from '../services/actions';
import { useDispatch } from 'react-redux';
import AppHeader from '../components/app-header/app-header';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

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
    <>
    <AppHeader />
    <div style={{marginTop: '100px',
                 display: 'flex', 
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center'}}>
      <h1 className={`text text_type_main-large mb-6`}>Восстановление пароля</h1>    
      <EmailInput onChange={onChange} value={value} name={'e-mail'} />
      <div className={`text text_type_main-medium mt-6`}>
      <Button onClick={onClick} type="primary" size="large">
        Восстановить
      </Button>
      </div>
      <p className={`text text_type_main-medium mt-20`}>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    </div> 
    </> 
  );
} 