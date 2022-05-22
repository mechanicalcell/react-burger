import { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import { useDispatch } from 'react-redux';
import { getItems } from '../../services/actions';
import { ORDER_TOTAL_PRICE } from '../../services/actions/order';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { getCookie, setCookie } from '../utils/cookie';
import { getProfileResult, USER_RESET } from '../../services/actions/get-patch';
import { ModalSwitch } from '../modal-switch/modal-switch';

function App() {
const dispatch = useDispatch();
const { newArrBurgerConstructor, newArrBun } = useSelector((store: any) => store.isNewArr);
const { loginResult, logoutResult } = useSelector((store: any) => store.login);
const refreshToken = localStorage.getItem('token')
const accessToken = getCookie('token');

if (loginResult.refreshToken) {
  localStorage.setItem('token', loginResult.refreshToken);
  setCookie('token', loginResult.accessToken)
} 

useEffect(() => {
if (logoutResult.success) {
  dispatch({ type: USER_RESET })
}
}, [dispatch, logoutResult]);

useEffect(() => {
  dispatch(getProfileResult(accessToken, refreshToken)) 
}, [dispatch, getProfileResult, accessToken, refreshToken]);

useEffect(() => {
  const setPrice = () => {
    const sum = newArrBurgerConstructor.reduce((sumIngredients: number, item: { price: number; qty: number }) => sumIngredients += item.price * item.qty,0)
    + newArrBun.reduce((sumBun: number, item: { price: number; qty: number }) => sumBun += item.price * item.qty,0)
    dispatch({ type: ORDER_TOTAL_PRICE, payload: sum})
  }
  setPrice();
}, [newArrBurgerConstructor, newArrBun])

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
