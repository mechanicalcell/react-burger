import { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const [isNewArr, setIsNewArr] = useState({ newArr: [] });

  const [isVisible, setIsVisible] = useState({
    ingredientModalVisible: false,
    orderModalVisible: false
  });

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
  }

  function handleCloseModal() {
    setIsVisible({ 
      ingredientModalVisible: false,
      orderModalVisible: false
    });
  }

  const ingredientModal = (
    <Modal header="Детали ингредиента" onClose={handleCloseModal}> 
      <IngredientDetails isNewArr={isNewArr} isVisible={isVisible.ingredientModalVisible}/>
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
        <BurgerIngredients data={state.data} setIsNewArr={setIsNewArr} onOpen={handleOpenIngredientModal} />
        <BurgerConstructor data={state.data} onOpen={handleOpenOrderModal} />
      </div>  
      <div className={styles.hidden}>
        {isVisible.ingredientModalVisible && ingredientModal} 
        {isVisible.orderModalVisible && orderModal} 
      </div>  
    </> 
  );
}

export default App;
