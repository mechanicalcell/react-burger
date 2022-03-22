import { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { StateContext } from '../../services/state-context';
import { OrderContext } from '../../services/order-context';
import { NewArrContext } from '../../services/newarr-context';
import { NewArrStateContext } from '../../services/newarrstate-context';
import { TotalPriceContext } from '../../services/totalprice-context';
import { useReducer } from "react";
import { CountContext } from '../../services/count-context';

function App() {

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const [order, setOrder] = useState({
    orderNumber: null
  });

  const [isNewArr, setIsNewArr] = useState({ 
    newArrBurgerConstructor: [] as any, 
    newArrIngredientDetails: [] as any,
    newArrBun: [] as any
  });

  const [isVisible, setIsVisible] = useState({
    ingredientModalVisible: false,
    orderModalVisible: false
  });

  useEffect(() => {
    const setPrice = () => {
      const sum = isNewArr.newArrBurgerConstructor.reduce((sumIngredients: number, item: { price: any; qty: any }) => sumIngredients += item.price * item.qty,0)
      + isNewArr.newArrBun.reduce((sumBun: number, item: { price: any; qty: any }) => sumBun += item.price * item.qty,0)
      setTotalPrice(sum)
    }
    setPrice();
  }, [isNewArr])

  useEffect(() => {
    const url='https://norma.nomoreparties.space/api/ingredients';
    const getIngredients = async () => {
      await fetch(url)
      .then(res => res.json())
      .then(data => setState({...state, data: data.data, isLoading: false}))
      .catch(e => setState({ ...state, isLoading: false, hasError: true }))
    }
    getIngredients();
  }, [])

  function orderNumberRequest() {
    const url='https://norma.nomoreparties.space/api/orders';
    const ingredientId: any[] = [];
    isNewArr.newArrBurgerConstructor.map((item: { _id: any; }) => ingredientId.push(item._id));
    isNewArr.newArrBun.map((item: { _id: any; }) => ingredientId.push(item._id));
    const getOrderNumber = () => {
      fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify({
          ingredients: ingredientId 
        }),
        headers: {
          'Content-type': 'application/json'
        },
      })    
      .then(res => res.json())
      .then(data => setOrder({orderNumber: data.order.number}))
      .catch(e => console.log(e))
    } 
    return getOrderNumber() 
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
    setIsNewArr((prevState: { newArrIngredientDetails: any; newArrBun: any; }) => ({
      newArrBurgerConstructor: isNewArr.newArrBurgerConstructor.filter((i: any) => i !== item),
      newArrIngredientDetails: prevState.newArrIngredientDetails,
      newArrBun: prevState.newArrBun
      }));
      countDispatcher({ type: "countIngredientDown", index: isNewArr.newArrBurgerConstructor[index].count });  
  };

  const ingredientModal = (
    <Modal header="Детали ингредиента" onClose={handleCloseModal}> 
      <NewArrContext.Provider value={isNewArr}>
        <IngredientDetails /> 
      </NewArrContext.Provider>  
    </Modal>
  );

  const orderModal = (
    <Modal header=" " onClose={handleCloseModal}> 
      <OrderContext.Provider value={order.orderNumber}>
        <OrderDetails />
      </OrderContext.Provider>  
    </Modal>
  );

  return (
    <>
      <AppHeader /> 
      <div className={styles.section_container}>  
        <StateContext.Provider value={state.data}>
          <NewArrContext.Provider value={isNewArr}>
            <NewArrStateContext.Provider value={[isNewArr, setIsNewArr]}>
              <TotalPriceContext.Provider value={[totalPrice, setTotalPrice]}>
                <CountContext.Provider value={{countState, countDispatcher}}>
                  <BurgerIngredients onOpen={handleOpenIngredientModal} />
                  <BurgerConstructor onOpen={handleOpenOrderModal} deleteIngr={deleteIngredient} />
                </CountContext.Provider>
              </TotalPriceContext.Provider>  
            </NewArrStateContext.Provider>
          </NewArrContext.Provider>
        </StateContext.Provider>
      </div>  
      <div className={styles.hidden}>
        {isVisible.ingredientModalVisible && ingredientModal} 
        {isVisible.orderModalVisible && orderModal} 
      </div>  
    </> 
  );
}

export default App;


