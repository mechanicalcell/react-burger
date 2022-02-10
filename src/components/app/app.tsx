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

  const [isVisible, setIsVisible] = useState({
    visible: false
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

  function handleOpenModal() {
    setIsVisible({ visible: true });
  }

  function handleCloseModal() {
    setIsVisible({ visible: false });
  }
 
  const ingredientModal = (
    <Modal header="Детали ингредиента" onClose={handleCloseModal}> 
      <IngredientDetails data={state.data} onOpen={handleOpenModal}/>
    </Modal>
  );

  const orderModal = (
    <Modal header="test" onClose={handleCloseModal}> 
      <OrderDetails />
    </Modal>
  );

  return (
    <>
      <AppHeader />
      <div className={styles.section_container}>  
        <BurgerIngredients data={state.data} onOpen={handleOpenModal} />
        <BurgerConstructor data={state.data} onOpen={handleOpenModal} orderModal={orderModal} isVisible={isVisible} />
      </div>  
      <div className={styles.hidden}>
        {isVisible.visible && ingredientModal }
        {/* {isVisible.visible && orderModal} */}
      </div> 
    </> 
  );
}

export default App;
