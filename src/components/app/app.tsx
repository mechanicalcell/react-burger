import { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { useDispatch } from 'react-redux';
import { getItems } from '../../services/actions';
import { getOrder } from '../../services/actions/order';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page';
import { RegisterPage } from '../../pages/register-page';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile-page';
import { LogoutPage } from '../../pages/logout-page';
import { ProfileOrdersPage } from '../../pages/profile-orders-page';
import { ProtectedRoute } from '../protected-route/protected-route';
import { IngredientsPage } from '../../pages/ingredients-page';
import { DELETE_INGREDIENTS,
         DELETE_INGREDIENT_DETAIL,
         MOVE_INGREDIENTS,
         MOVE_BUNS,
         DELETE_BURGER_CONSTRUCTOR
} from "../../services/actions/copy-arr";
import { COUNT_INGREDIENT_DOWN,
         COUNT_INGREDIENT_UP,
         COUNT_BUN_UP,
         COUNT_BUN_DOWN,
         DELETE_COUNT
} from "../../services/actions/count";         
import { DELETE_ORDER_NUMBER
} from "../../services/actions/order";         
import { getCookie, setCookie } from '../utils/cookie';
import { getProfileResult } from '../../services/actions/get-patch';

function App() {
const dispatch = useDispatch();
const { newArrBurgerConstructor, newArrBun } = useSelector((store: any) => store.isNewArr);
const { loginResult } = useSelector((store: any) => store.login);
const { getResult } = useSelector((store: any) => store.profile);
const { user } = useSelector((store: any) => store.login);
const [totalPrice, setTotalPrice] = useState(0);
const [isVisible, setIsVisible] = useState({
  ingredientModalVisible: false,
  orderModalVisible: false
});
console.log(loginResult)
console.log(getResult)
console.log(user)
const refreshToken = localStorage.getItem('token')
console.log(refreshToken)
const accessToken = getCookie('token');
console.log(accessToken)

if (loginResult.refreshToken) {
  localStorage.setItem('token', loginResult.refreshToken);
  setCookie('token', loginResult.accessToken)
} 

useEffect(() => {
  dispatch(getProfileResult(accessToken, refreshToken)) 
}, [dispatch, getProfileResult, accessToken, refreshToken]);

useEffect(() => {
  const setPrice = () => {
    const sum = newArrBurgerConstructor.reduce((sumIngredients: number, item: { price: any; qty: any }) => sumIngredients += item.price * item.qty,0)
    + newArrBun.reduce((sumBun: number, item: { price: any; qty: any }) => sumBun += item.price * item.qty,0)
    setTotalPrice(sum)
  }
  setPrice();
}, [newArrBurgerConstructor, newArrBun])

useEffect(() => {
  dispatch(getItems());
}, [dispatch])

function orderNumberRequest() {
  const ingredientId: any[] = [];
  newArrBurgerConstructor.map((item: { _id: any; }) => ingredientId.push(item._id));
  newArrBun.map((item: { _id: any; }) => ingredientId.push(item._id));
  if (ingredientId.length !== 0) {
  return dispatch(getOrder(ingredientId))
  } 
}

function handleOpenIngredientModal() {
  setIsVisible({ 
    ingredientModalVisible: true,
    orderModalVisible: false
  });
}

function handleOpenOrderModal() { 
  setIsVisible({ 
    ingredientModalVisible: false,
    orderModalVisible: true
  });
  orderNumberRequest()
  dispatch({ type: DELETE_COUNT })
  dispatch({ type: DELETE_BURGER_CONSTRUCTOR }) 
}  

function handleCloseModal() {
  setIsVisible({ 
    ingredientModalVisible: false,
    orderModalVisible: false
  });
  dispatch({ type: DELETE_INGREDIENT_DETAIL })
  dispatch({ type: DELETE_ORDER_NUMBER })
}
  
const ingredientModal = (
  <Modal header="Детали ингредиента" onClose={handleCloseModal}> 
    <IngredientDetails /> 
  </Modal>
);

const orderModal = (
  <Modal header=" " onClose={handleCloseModal}> 
    <OrderDetails />
  </Modal>
);

const ingredientHandleDrop = (item: any, index: any) => {
  dispatch({ type: MOVE_INGREDIENTS, item, key: uuidv4() })
  dispatch({ type: COUNT_INGREDIENT_UP, index }); 
};

const bunHandleDrop = (item: any, index: any) => {
  if (index === 0) {
    dispatch({ type: COUNT_BUN_UP, index: '0' })
    dispatch({ type: COUNT_BUN_DOWN, index: '1' })
  } 
  else if (index === 1) {
    dispatch({ type: COUNT_BUN_UP, index: '1' })
    dispatch({ type: COUNT_BUN_DOWN, index: '0' })
  }  
  dispatch({ type: MOVE_BUNS, item, index })
};

const deleteIngredient = (item: any, index: any) => {
  dispatch({ type: DELETE_INGREDIENTS, item })  
  dispatch({ type: COUNT_INGREDIENT_DOWN, index })
};

return (
  <>
    <Router>
      <AppHeader />
      <Switch> 
        <Route path="/" exact={true}>
          <div className={styles.section_container}> 
            <BurgerIngredients onOpen={handleOpenIngredientModal} />
            <BurgerConstructor onOpen={handleOpenOrderModal} 
                               deleteIngr={deleteIngredient}
                               totalPrice={totalPrice} 
                               ingredientHandleDrop={ingredientHandleDrop}
                               bunHandleDrop={bunHandleDrop} />
          </div>   
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset" exact={true}>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/profile/orders" exact={true}>
          <ProfileOrdersPage />
        </Route>
        <Route path="/profile/orders:id" exact={true}>
          <ProfileOrdersPage />
        </Route>
        <Route path="/logout" exact={true}>
          <LogoutPage />
        </Route>
        <Route path="/ingredients/:ingredientId" exact={true}>
          <IngredientsPage />
        </Route>
      </Switch> 
    </Router>
    <div className={styles.hidden}>
      {isVisible.ingredientModalVisible && ingredientModal} 
      {isVisible.orderModalVisible && orderModal} 
    </div>  
  </> 
);
}

export default App;
