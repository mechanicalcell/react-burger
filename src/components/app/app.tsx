import { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { useReducer } from "react";
import { CountContext } from '../../services/count-context';
import { useDispatch } from 'react-redux';
import { DELETE_ORDER_NUMBER, getItems, getOrder } from '../../services/actions';
import { useSelector } from 'react-redux';
import { DELETE_INGREDIENTS,
         DELETE_INGREDIENT_DETAIL
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
}  

function handleCloseModal() {
  setIsVisible({ 
    ingredientModalVisible: false,
    orderModalVisible: false
  });
  dispatch({type: DELETE_INGREDIENT_DETAIL})
  dispatch({type: DELETE_ORDER_NUMBER})
}
  
const initialState = { count0: 0, 
                       count1: 0, 
                       count2: 0, 
                       count3: 0, 
                       count4: 0, 
                       count5: 0,
                       count6: 0, 
                       count7: 0, 
                       count8: 0, 
                       count9: 0, 
                       count10: 0,
                       count11: 0, 
                       count12: 0, 
                       count13: 0, 
                       count14: 0 };

function reducer(state: { [x: string]: number }, action: { type: any; index: any; }) {
  switch (action.type) {
    case "countBunUp":
      return { ...state, [action.index]: state[action.index] = 2 };
    case "countBunDown":
      return { ...state, [action.index]: state[action.index] = 0 };
    case "countIngredientUp":
      return { ...state, [action.index]: state[action.index] + 1 };
    case "countIngredientDown":
      return { ...state, [action.index]: state[action.index] - 1 };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const [countState, countDispatcher] = useReducer(reducer, initialState);

const deleteIngredient = (item: any, index: any) => {
  dispatch({type: DELETE_INGREDIENTS, item})       
  countDispatcher({ type: "countIngredientDown", index: newArrBurgerConstructor[index].count });  
};

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

return (
  <>
    <AppHeader /> 
    <div className={styles.section_container}>  
      <CountContext.Provider value={{countState, countDispatcher}}>
        <BurgerIngredients onOpen={handleOpenIngredientModal} />
      </CountContext.Provider>
        <BurgerConstructor onOpen={handleOpenOrderModal} 
                           deleteIngr={deleteIngredient}
                           totalPrice={totalPrice} />
    </div>  
    <div className={styles.hidden}>
      {isVisible.ingredientModalVisible && ingredientModal} 
      {isVisible.orderModalVisible && orderModal} 
    </div>  
  </> 
);
}

export default App;
