import React from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../utils/types';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { NewArrStateContext } from '../../services/newarrstate-context';
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CountContext } from "../../services/count-context";
import { useRef } from 'react';

const newArrayCount = ['count0', 'count1', 'count2', 'count3', 'count4', 'count5', 'count6', 'count7', 'count8', 'count9', 'count10', 'count11', 'count12', 'count13', 'count14']

const Ingredients = ({ onOpen, ingrType, data, index }) => {
  const {countState, countDispatcher} = useContext(CountContext);
  const [isNewArr, setIsNewArr] = useContext(NewArrStateContext);
  const copyArrIngredients = (e) => { 
    countDispatcher({ type: "countIngredientUp", index: newArrayCount[index] }); 
    setIsNewArr(prevState => ({
      newArrBurgerConstructor: [...isNewArr.newArrBurgerConstructor, {...data, key: uuidv4(), qty: 1, count: `count${index}`}],
      newArrIngredientDetails: data,
      newArrBun: prevState.newArrBun
    }));   
    onOpen();
  }     

  const image = (
    <img className='' src={ data.image } alt={data.name} />
  );    
  return (data.type === ingrType && 
  (<article style={{ position: "relative" }} onClick={e => copyArrIngredients(e)} className={`${styles.ingredients} mb-8`}>
    {countState[newArrayCount[index]] > 0 && (<Counter count={countState[newArrayCount[index]]} size="default" />)} 
    <div className='ml-4 mr-4'>{image}</div> 
    <div className={`${styles.price_and_icon} text text_type_digits-default`}>{data.price}
      <CurrencyIcon type="primary" /> 
    </div>           
    <p className={`${styles.text_container_0} name text text_type_main-small`}>{data.name}</p>
  </article>)
  )
}  

Ingredients.propTypes = {
  data: ingredientPropTypes,
  onOpen: PropTypes.func.isRequired,
  ingrType: PropTypes.string,
  index: PropTypes.number
};

const Bun = ({ onOpen, ingrType, data, index }) => {
  const {countState, countDispatcher} = useContext(CountContext);
  const [isNewArr, setIsNewArr] = useContext(NewArrStateContext);
  const copyArrBun = (e) => { 
    if (index === 0) {
      countDispatcher({ type: "countBunUp", index: 'count0' })
      countDispatcher({ type: "countBunDown", index: 'count1' })
    } 
    else if (index === 1) {
      countDispatcher({ type: "countBunUp", index: 'count1' })
      countDispatcher({ type: "countBunDown", index: 'count0' })
    }    
    setIsNewArr(prevState => ({
      ...prevState,
      newArrIngredientDetails: data,      
      newArrBun: [{...data, qty: 2}]
    }));   
    onOpen(); 
  } 
  
  const image = (
    <img className='' src={ data.image } alt={data.name} />
  );    
  return (data.type === ingrType && 
  (<article style={{ position: "relative" }} onClick={e => copyArrBun(e)} className={`${styles.ingredients} mb-8`}>
    {countState[newArrayCount[index]] > 0 && (<Counter count={countState[newArrayCount[index]]} size="default" />)}
    <div className='ml-4 mr-4'>{image}</div> 
    <div className={`${styles.price_and_icon} text text_type_digits-default`}>{data.price}
      <CurrencyIcon type="primary" />
    </div>           
    <p className={`${styles.text_container_0} name text text_type_main-small`}>{data.name}</p>
  </article>)
  )
}  
  
Bun.propTypes = {
  data: ingredientPropTypes,
  onOpen: PropTypes.func.isRequired,
  ingrType: PropTypes.string,
  index: PropTypes.number
};

export default function BurgerIngredients({ onOpen, data }) {
const [current, setCurrent] = React.useState('one');
const [textColor, setTextColor] = React.useState({
  bunColor: 'text text_type_main-medium text_color_inactive mb-6',
  sauceColor: 'text text_type_main-medium text_color_inactive mb-6',
  mainColor: 'text text_type_main-medium text_color_inactive mb-6'
});  
const headerBunRef = useRef(null);
const headerSauceRef = useRef(null);
const headerMainRef = useRef(null);

const getDomRect = () => {
  const scrollY = window.scrollY 
  const bunDomRect = headerBunRef.current.getBoundingClientRect();
  const sauceDomRect = headerSauceRef.current.getBoundingClientRect();
  const mainDomRect = headerMainRef.current.getBoundingClientRect(); 
  if (bunDomRect.top + scrollY <= 383 && bunDomRect.top + scrollY > 263) {
    setTextColor({
      bunColor: 'text text_type_main-medium mb-6',
      sauceColor: 'text text_type_main-medium text_color_inactive mb-6',
      mainColor: 'text text_type_main-medium text_color_inactive mb-6'
    }); 
  }
  if (sauceDomRect.top + scrollY <= 383 && sauceDomRect.top + scrollY > 263) {
    setTextColor({
      bunColor: 'text text_type_main-medium text_color_inactive mb-6',
      sauceColor: 'text text_type_main-medium mb-6',
      mainColor: 'text text_type_main-medium text_color_inactive mb-6'
    }); 
  }
  if (mainDomRect.top + scrollY <= 383 && mainDomRect.top + scrollY > 263) {
    setTextColor({
      bunColor: 'text text_type_main-medium text_color_inactive mb-6',
      sauceColor: 'text text_type_main-medium text_color_inactive mb-6',
      mainColor: 'text text_type_main-medium mb-6'
    }); 
  }
} 

return (
  <div className={styles.left_section}>
    <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p> 
    <div className="mb-10" style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
    <div onScroll={getDomRect} className={styles.over_flow_container_BI}>
      <p ref={headerBunRef} className={textColor.bunColor} >Булки</p>  
      <div className={`${styles.BI_container} pl-4`}> 
        {data.isLoading && 'Загрузка...'}
        {data.hasError && 'Произошла ошибка'}            
        {!data.isLoading &&
        !data.hasError &&
        !!data.length && 
        data.map((item, index) => item.type ==='bun' &&
        <Bun index={index} key={item._id} onOpen={onOpen} data={item} ingrType='bun' /> )} 
      </div> 
      <p ref={headerSauceRef} className={textColor.sauceColor}>Соусы</p>  
      <div className={`${styles.BI_container} pl-4`}> 
        {data.isLoading && 'Загрузка...'}
        {data.hasError && 'Произошла ошибка'}            
        {!data.isLoading &&
        !data.hasError &&
        !!data.length &&
        data.map((item, index) => item.type ==='sauce' &&
        <Ingredients index={index} key={item._id} onOpen={onOpen} data={item} ingrType='sauce' /> )}
      </div>   
      <p ref={headerMainRef} className={textColor.mainColor}>Начинки</p>  
      <div className={`${styles.BI_container} pl-4`}>
        {data.isLoading && 'Загрузка...'}
        {data.hasError && 'Произошла ошибка'}
        {!data.isLoading &&
        !data.hasError &&
        !!data.length &&
        data.map((item, index) => item.type ==='main' &&
        <Ingredients index={index} key={item._id} onOpen={onOpen} data={item} ingrType='main' /> )}
      </div>                   
    </div> 
  </div>  
)
}

BurgerIngredients.propTypes = {
  onOpen: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(ingredientPropTypes)
};