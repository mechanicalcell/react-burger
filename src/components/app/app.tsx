import { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import { getItems } from '../../services/actions';
import { orderTotalPriceAction } from '../../services/actions/order';
import { BrowserRouter as Router } from 'react-router-dom';
import { getCookie, setCookie } from '../utils/cookie';
import { getProfileResult, userResetAction } from '../../services/actions/get-patch';
import { ModalSwitch } from '../modal-switch/modal-switch';
import { useAppDispatch, useAppSelector } from '../..';

function App() {
const dispatch = useAppDispatch();
const { newArrBurgerConstructor, newArrBun } = useAppSelector(store => store.isNewArr);
const { loginResult, logoutResult } = useAppSelector(store => store.login);

if (!!loginResult.refreshToken && loginResult.refreshToken !== null && loginResult.accessToken !== null) {
  setCookie('refreshToken', loginResult.refreshToken)
  setCookie('token', loginResult.accessToken.split('Bearer ')[1])
} 

useEffect(() => {
if (logoutResult.success) {
  dispatch(userResetAction())
}
}, [dispatch, logoutResult]);

useEffect(() => {
  dispatch(getProfileResult(getCookie('token'), getCookie('refreshToken')))
}, [dispatch]);

useEffect(() => {
  const setPrice = () => {
    const sum = newArrBurgerConstructor.reduce((sumIngredients: number, item: { price: number; qty: number }) => sumIngredients += item.price * item.qty,0)
    + newArrBun.reduce((sumBun: number, item: { price: number; qty: number }) => sumBun += item.price * item.qty,0)
    dispatch(orderTotalPriceAction(sum))
  }
  setPrice();
}, [newArrBurgerConstructor, newArrBun, dispatch])

useEffect(() => {
  dispatch(getItems());
}, [dispatch])

return (
  <>
    <Router>
      <AppHeader />
      <ModalSwitch />
    </Router>
  </> 
);
}

export default App;
