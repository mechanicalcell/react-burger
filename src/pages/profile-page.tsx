import React, { FormEvent, RefObject } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { getProfileEmailInputAction, getProfileNameInputAction, getProfilePasswordInputAction, patchProfileResult } from '../services/actions/get-patch';
import { useEffect } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { getProfileResult } from '../services/actions/get-patch';
import { getCookie } from '../components/utils/cookie';
import styles from './page-container.module.css';
import { useAppDispatch, useAppSelector } from '..';

function ProfileNameInput() {
  const dispatch = useAppDispatch();
  const { getResult } = useAppSelector(store => store.profile);  
  const [value, setValue] = React.useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value) 
    dispatch(getProfileNameInputAction(e.target.value))
  }  
  const inputRef = React.useRef(null) as RefObject<any> | null;
  const onIconClick = () => {
    setTimeout(() => inputRef ? inputRef.current.focus() : null, 0)
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
  const dispatch = useAppDispatch();
  const { getResult } = useAppSelector(store => store.profile);  
  const [value, setValue] = React.useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value) 
    dispatch(getProfileEmailInputAction(e.target.value))
  }  
  const inputRef = React.useRef(null) as RefObject<any> | null;
  const onIconClick = () => {
    setTimeout(() => inputRef ? inputRef.current.focus() : null, 0)
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
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value) 
    dispatch(getProfilePasswordInputAction(e.target.value))
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
  const dispatch = useAppDispatch();    
  const { profileNameInput, 
          profileEmailInput,
          profilePasswordInput,
          getResult, 
          patchResult } = useAppSelector(store => store.profile);  
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(getProfileResult(getCookie('token'), getCookie('refreshToken')))
    dispatch(patchProfileResult(getCookie('token'), profileNameInput, profileEmailInput, profilePasswordInput))
  }

  useEffect(() => {
    if (getResult.user.name === null || getResult.user.email === null) {  
      dispatch(getProfileResult(getCookie('token'), getCookie('refreshToken')))
    }  
  }, [dispatch, getResult, getResult.user.name, getResult.user.email])
  useEffect(() => {
    if (patchResult.success) {  
      dispatch(getProfileResult(getCookie('token'), getCookie('refreshToken')))
    }  
  }, [dispatch, patchResult.success])
  return (
    <div>
      <div className={styles.profile_container}>
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
        <form onSubmit={(e) => onSubmit(e)} className={styles.profile_input_container}>
          <ProfileNameInput />
          <div className={`text text_type_main-medium mt-6`}>
            <ProfileEmailInput />
          </div>
          <div className={`text text_type_main-medium mt-6`}>
            <ProfilePasswordInput />            
          </div> 
          <div className={`text text_type_main-medium mt-6`} > 
            <Button htmlType='submit'>Сохранить</Button>
          </div> 
        </form>      
    </div>
  );
} 
