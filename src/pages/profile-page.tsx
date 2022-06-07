import React, { FormEvent, RefObject } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { getProfileEmailInputAction, getProfileNameInputAction, getProfilePasswordInputAction, patchProfileResult, TOKEN_NULL } from '../services/actions/get-patch';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { getProfileResult } from '../services/actions/get-patch';
import { getCookie } from '../components/utils/cookie';
import styles from './page-container.module.css';

function ProfileNameInput() {
  const dispatch = useDispatch();
  const { getResult } = useSelector((store: any) => store.profile);  
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
  const dispatch = useDispatch();
  const { getResult } = useSelector((store: any) => store.profile);  
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
  const dispatch = useDispatch();
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
  const dispatch = useDispatch();    
  const { profileNameInput, 
          profileEmailInput,
          profilePasswordInput,
          getResult, 
          patchResult } = useSelector((store: any) => store.profile);  
  const accessToken = getCookie('token');
  const refreshToken = localStorage.getItem('token')
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(getProfileResult(accessToken, refreshToken))
    dispatch(patchProfileResult(accessToken, profileNameInput, profileEmailInput, profilePasswordInput))
  }
  useEffect(() => {
    if (getResult.user.name === null || getResult.user.email === null) {  
      dispatch(getProfileResult(accessToken, refreshToken))
    }  
  }, [dispatch, accessToken, refreshToken, getResult.user.name, getResult.user.email])
  useEffect(() => {
    if (patchResult.success) {  
      dispatch(getProfileResult(accessToken, refreshToken))
    }  
  }, [dispatch, patchResult.success, accessToken, refreshToken])
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
