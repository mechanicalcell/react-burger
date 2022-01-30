import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import BurgerIngredients from './components/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor';
import Modal from './components/Modal';

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
    const getIngredients = async () => {
      setState({...state, hasError: false, isLoading: true});
      const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
      const data = await res.json();
      setState({...state, hasError: true, isLoading: false, data: data.data});
    }
    getIngredients();
  }, [])

  function handleOpenModal() {
    setIsVisible({ visible: true });
  }

  function handleCloseModal() {
    setIsVisible({ visible: false });
  }
 
  const modal = (
    <Modal header="Детали ингредиента" onClose={handleCloseModal}> 
      <p>TEST</p>
      <p>TEST</p>
    </Modal>
  );

  const modal1 = (
    <Modal header="" onClose={handleCloseModal}> 
      <p>TEST_034536</p>
      <p>TEST_идентификатор заказа</p>
    </Modal>
  );

  return (
    <>
      <AppHeader />
      <div className='hidden'>
        {isVisible.visible && modal}
      </div>      
      <div className='section_container'>  
        <BurgerIngredients data={state.data} onOpen={handleOpenModal} />
        <BurgerConstructor data={state.data} onOpen={handleOpenModal} modal1={modal1} isVisible={isVisible} />
      </div>  
    </> 
  );
}


