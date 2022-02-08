import React from 'react';
import { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

export default function App() {
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
 
  const ingredientsModal = (
    <Modal header="Детали ингредиента" onClose={handleCloseModal}> 
      {state.data.map((item, index) =>  
      <IngredientDetails key={index} data={item} onOpen={handleOpenModal}/> )}
    </Modal>
  );

  const orderModal = (
    <Modal header="" onClose={handleCloseModal}> 
      <p>TEST_034536</p>
      <p>TEST_идентификатор заказа</p>
    </Modal>
  );

  return (
    <>
      <AppHeader />
      <div className={styles.hidden}>
        {isVisible.visible && ingredientsModal}
      </div>  
      <div className={styles.section_container}>  
        <BurgerIngredients data={state.data} onOpen={handleOpenModal} />
        <BurgerConstructor data={state.data} onOpen={handleOpenModal} orderModal={orderModal} isVisible={isVisible} />
      </div>  
    </> 
  );
}


