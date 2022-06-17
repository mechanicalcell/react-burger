import { Route, Switch, useLocation } from 'react-router-dom';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { IngredientsPage } from '../../pages/ingredients-page';
import { LoginPage } from '../../pages/login-page';
import { LogoutPage } from '../../pages/logout-page';
import ProfileOrdersPage from '../../pages/profile-orders-page';
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
import { deleteOrderNumberAction, feedIsVisibleAction, getOrder, ingredientIsVisibleAction, orderIsVisibleAction, ordersIsVisibleAction } from '../../services/actions/order';
import { deleteBurgerConstructorAction, deleteIngredientDetailAction, deleteIngredientsAction, moveBunsAction, moveIngredientsAction } from '../../services/actions/copy-arr';
import { countBunDownAction, countBunUpAction, countIngredientDownAction, countIngredientUpAction, deleteCountAction } from '../../services/actions/count';
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';
import { TingredientPropTypes } from '../utils/types';
import { ILocation } from './modal-switch-types';
import FeedPage from '../../pages/feed-page';
import FeedDetailsPage from '../../pages/feed-details-page';
import FeedDetails from '../feed-details/feed-details';
import OrdersDetailsPage from '../../pages/orders-details-page';
import OrdersDetails from '../orders-details/orders-details';

export function ModalSwitch() {
const { newArrBurgerConstructor, newArrBun } = useSelector((store: any) => store.isNewArr);
const { ingredientModalVisible, ordersModalVisible, feedModalVisible, orderModalVisible } = useSelector((store: any) => store.order);
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

const feedModal = (
  <Modal header=" " onClose={handleCloseModal}> 
    <FeedDetails />
  </Modal>
);

const ordersModal = (
  <Modal header=" " onClose={handleCloseModal}> 
    <OrdersDetails />
  </Modal>
);

const orderNumberRequest = useCallback(() => {
  const ingredientId: string[] = [];
  newArrBurgerConstructor.map((item: TingredientPropTypes) => ingredientId.push(item._id));
  newArrBun.map((item: TingredientPropTypes) => ingredientId.push(item._id));
  if (ingredientId.length !== 0) {
  return dispatch(getOrder(ingredientId))
  } 
}, [dispatch, newArrBun, newArrBurgerConstructor]);

function handleOpenIngredientModal() {
  dispatch(ingredientIsVisibleAction(true)) 
  dispatch(orderIsVisibleAction(false))     
}

const handleOpenFeedModal = useCallback(() => {
  dispatch(feedIsVisibleAction(true)) 
  dispatch(orderIsVisibleAction(false))     
}, [dispatch]);

const handleOpenOrdersModal = useCallback(() => {
  dispatch(ordersIsVisibleAction(true)) 
  dispatch(orderIsVisibleAction(false))     
}, [dispatch]);  

const handleOpenOrderModal = useCallback(() => {
  dispatch(ingredientIsVisibleAction(false)) 
  dispatch(orderIsVisibleAction(true))     
  orderNumberRequest()
  dispatch(deleteCountAction())
  dispatch(deleteBurgerConstructorAction())
}, [dispatch, orderNumberRequest]);  

function handleCloseModal() {
  dispatch(ingredientIsVisibleAction(false)) 
  dispatch(feedIsVisibleAction(false))   
  dispatch(orderIsVisibleAction(false))     
  dispatch(ordersIsVisibleAction(false)) 
  dispatch(deleteIngredientDetailAction())
  dispatch(deleteOrderNumberAction())
}
  
const ingredientHandleDrop = (item: TingredientPropTypes , index: number) => {
  dispatch(moveIngredientsAction(item, uuidv4()))
  dispatch(countIngredientUpAction(index)); 
};

const bunHandleDrop = (item: TingredientPropTypes , index: number) => {
  if (index === 0) {
    dispatch(countBunUpAction(0))
    dispatch(countBunDownAction(1))
  } 
  else if (index === 1) {
    dispatch(countBunUpAction(1))
    dispatch(countBunDownAction(0))
  }  
  dispatch(moveBunsAction(item, index))
};

const deleteIngredient = (item: TingredientPropTypes , index: number) => {
  dispatch(deleteIngredientsAction(item)) 
  dispatch(countIngredientDownAction(index))
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
        <ProfileOrdersPage onOpen={handleOpenOrdersModal} />
      </Route>
      <Route path="/profile/orders/:id" exact={true}>
        <OrdersDetailsPage />
      </Route>
      <Route path="/logout" exact={true}>
        <LogoutPage />
      </Route>
      <Route path="/ingredients/:id" exact={true}>
        <IngredientsPage />
      </Route>
      <Route path="/feed" exact={true}>
        <FeedPage onOpen={handleOpenFeedModal} />
      </Route>
      <Route path="/feed/:id" exact={true}>
        <FeedDetailsPage />
      </Route>
    </Switch> 
    <div className={styles.hidden}> 
      {background && ingredientModalVisible &&
      <Route path='/ingredients/:id'>{ingredientModal}</Route>} 
      {background && feedModalVisible &&
      <Route path='/feed/:id'>{feedModal}</Route>} 
      {background && ordersModalVisible &&
      <Route path='/profile/orders/:id'>{ordersModal}</Route>} 
      {orderModalVisible && orderModal} 
    </div>  
  </>     
  )
}