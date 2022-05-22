import { Route, Switch, useLocation } from 'react-router-dom';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { IngredientsPage } from '../../pages/ingredients-page';
import { LoginPage } from '../../pages/login-page';
import { LogoutPage } from '../../pages/logout-page';
import { ProfileOrdersPage } from '../../pages/profile-orders-page';
import { ProfilePage } from '../../pages/profile-page';
import { RegisterPage } from '../../pages/register-page';
import { ResetPasswordPage } from '../../pages/reset-password';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../app/app.module.css';
import { DELETE_ORDER_NUMBER, getOrder, INGREDIENT_IS_VISIBLE, ORDER_IS_VISIBLE } from '../../services/actions/order';
import { DELETE_BURGER_CONSTRUCTOR, DELETE_INGREDIENTS, DELETE_INGREDIENT_DETAIL, MOVE_BUNS, MOVE_INGREDIENTS } from '../../services/actions/copy-arr';
import { COUNT_BUN_DOWN, COUNT_BUN_UP, COUNT_INGREDIENT_DOWN, COUNT_INGREDIENT_UP, DELETE_COUNT } from '../../services/actions/count';
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';
import { TingredientPropTypes } from '../utils/types';
import { ILocation } from './modal-switch-types';

export function ModalSwitch() {
const { newArrBurgerConstructor, newArrBun } = useSelector((store: any) => store.isNewArr);
const { ingredientModalVisible, orderModalVisible } = useSelector((store: any) => store.order);
const dispatch = useDispatch();

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

function orderNumberRequest() {
  const ingredientId: string[] = [];
  newArrBurgerConstructor.map((item: TingredientPropTypes) => ingredientId.push(item._id));
  newArrBun.map((item: TingredientPropTypes) => ingredientId.push(item._id));
  if (ingredientId.length !== 0) {
  return dispatch(getOrder(ingredientId))
  } 
}

function handleOpenIngredientModal() {
  dispatch({ type: INGREDIENT_IS_VISIBLE, payload: true }) 
  dispatch({ type: ORDER_IS_VISIBLE, payload: false })     
}

const handleOpenOrderModal = useCallback(() => {
  dispatch({ type: INGREDIENT_IS_VISIBLE, payload: false }) 
  dispatch({ type: ORDER_IS_VISIBLE, payload: true })     
  orderNumberRequest()
  dispatch({ type: DELETE_COUNT })
  dispatch({ type: DELETE_BURGER_CONSTRUCTOR })
}, [dispatch, orderNumberRequest]);  

function handleCloseModal() {
  dispatch({ type: INGREDIENT_IS_VISIBLE, payload: false }) 
  dispatch({ type: ORDER_IS_VISIBLE, payload: false })     
  dispatch({ type: DELETE_INGREDIENT_DETAIL })
  dispatch({ type: DELETE_ORDER_NUMBER })
}
  
const ingredientHandleDrop = (item: TingredientPropTypes , index: number) => {
  dispatch({ type: MOVE_INGREDIENTS, item, key: uuidv4() })
  dispatch({ type: COUNT_INGREDIENT_UP, index }); 
};

const bunHandleDrop = (item: TingredientPropTypes , index: number) => {
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

const deleteIngredient = (item: TingredientPropTypes , index: number) => {
  dispatch({ type: DELETE_INGREDIENTS, item }) 
  dispatch({ type: COUNT_INGREDIENT_DOWN, index })
};

const { orderTotalPrice } = useSelector((store: any) => store.order);    
  let location = useLocation<ILocation>()
  let background = location.state && location.state.background;
  return (
  <>
    <Switch location={background || location}> 
      <Route path="/" exact={true}>
        <div className={styles.section_container}> 
          <BurgerIngredients onOpen={handleOpenIngredientModal} />
          <BurgerConstructor onOpen={handleOpenOrderModal} 
                             deleteIngredient={deleteIngredient}
                             totalPrice={orderTotalPrice} 
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
      <Route path="/ingredients/:id" exact={true}>
        <IngredientsPage />
      </Route>
    </Switch> 
    <div className={styles.hidden}> 
      {background && ingredientModalVisible &&
      <Route path='/ingredients/:id'>{ingredientModal}</Route>} 
      {orderModalVisible && orderModal} 
    </div>  
  </>     
  )
}