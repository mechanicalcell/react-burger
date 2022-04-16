import { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { useDispatch } from 'react-redux';
import { DELETE_ORDER_NUMBER, getItems, getOrder } from '../../services/actions';
import { useSelector } from 'react-redux';
import { DELETE_INGREDIENTS,
         DELETE_INGREDIENT_DETAIL,
         MOVE_INGREDIENTS,
         COUNT_INGREDIENT_DOWN,
         COUNT_INGREDIENT_UP,
         COUNT_BUN_UP,
         COUNT_BUN_DOWN,
         MOVE_BUNS,
         DELETE_BURGER_CONSTRUCTOR,
         DELETE_COUNT
} from "../../services/actions";

const baseUrl='https://norma.nomoreparties.space/api/';

export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
}

export const getIngredients = async () => await fetch(`${baseUrl}ingredients`)

export const getOrderNumber = (ingredientId: any) => 
  fetch(`${baseUrl}orders`, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: ingredientId 
    }),
    headers: {
      'Content-type': 'application/json'
    },
  })    

function App() {
const dispatch = useDispatch();
const { newArrBurgerConstructor, newArrBun } = useSelector((store: any) => store.isNewArr);
const [totalPrice, setTotalPrice] = useState(0);
const [isVisible, setIsVisible] = useState({
  ingredientModalVisible: false,
  orderModalVisible: false
});

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

const ingredientHandleDrop = (item: any, index: any, key: any) => {
  dispatch({ type: MOVE_INGREDIENTS, item, key })
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
    <AppHeader /> 
    <div className={styles.section_container}> 
      <BurgerIngredients onOpen={handleOpenIngredientModal} />
      <BurgerConstructor onOpen={handleOpenOrderModal} 
                         deleteIngr={deleteIngredient}
                         totalPrice={totalPrice} 
                         ingredientHandleDrop={ingredientHandleDrop}
                         bunHandleDrop={bunHandleDrop} />
    </div>  
    <div className={styles.hidden}>
      {isVisible.ingredientModalVisible && ingredientModal} 
      {isVisible.orderModalVisible && orderModal} 
    </div>  
  </> 
);
}

export default App;
