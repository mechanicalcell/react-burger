import React from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../utils/types';
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDrag } from "react-dnd";
import { COPY_ARR_INGREDIENTS,
         COPY_ARR_BUN,
         INGREDIENT_ID
} from "../../services/actions/copy-arr";
import { COUNT_INGREDIENT_UP,
         COUNT_BUN_UP,
         COUNT_BUN_DOWN
} from "../../services/actions/count";         

const Ingredients = ({ onOpen, ingrType, item, index }) => {
const history = useHistory(); 
const location = useLocation()    
const { count } = useSelector((store) => store.count);
const [,dragRef] = useDrag({
  type: "ingredient",
  item: item
});
const dispatch = useDispatch(); 
const onClick = () => {
  dispatch({ type: INGREDIENT_ID, payload: item })
  history.push({ pathname: `/ingredients/${item._id}` })
  onOpen();
}
const copyArrIngredients = (e) => { 
  dispatch({type: COUNT_INGREDIENT_UP, index }); 
  dispatch({type: COPY_ARR_INGREDIENTS, item, key: uuidv4()}) 
  onOpen(); 
}   
const image = (
  <img className='' src={ item.image } alt={item.name} />
);

return (item.type === ingrType && 
(<Link to={{
  pathname: `/ingredients/${item._id}`,
  state: { background: location } 
}} ref={dragRef} onClick={onClick} className={`${styles.ingredients} mb-8`}>
  {count[index] > 0 && (<Counter count={count[index]} size="default" />)} 
  <div className='ml-4 mr-4'>{image}</div> 
  <div className={`${styles.price_and_icon} text text_type_digits-default`}>{item.price}
    <CurrencyIcon type="primary" /> 
  </div>           
  <p className={`${styles.text_container_0} name text text_type_main-small`}>{item.name}</p>
</Link>)
)
}  

Ingredients.propTypes = {
  item: ingredientPropTypes,
  onOpen: PropTypes.func.isRequired,
  ingrType: PropTypes.string,
  index: PropTypes.number
};

const Bun = ({ onOpen, ingrType, item, index }) => {
const history = useHistory();  
const location = useLocation()  
const { count } = useSelector((store) => store.count);
const [{isDrag},dragRef] = useDrag({
  type: "bun",
  item: item,
  collect: monitor => ({
    isDrag: monitor.isDragging() 
  })      
});
const dispatch = useDispatch(); 
const onClick = () => {
  dispatch({ type: INGREDIENT_ID, payload: item })
  history.replace({ pathname: `/ingredients/${item._id}` })
  onOpen();
}
const copyArrBun = (e) => { 
  if (index === 0) {
    dispatch({ type: COUNT_BUN_UP, index: '0' })
    dispatch({ type: COUNT_BUN_DOWN, index: '1' })
  } 
  else if (index === 1) {
    dispatch({ type: COUNT_BUN_UP, index: '1' })
    dispatch({ type: COUNT_BUN_DOWN, index: '0' })
  }  
  dispatch({type: COPY_ARR_BUN, item, index})
  onOpen(); 
} 
const image = (
  <img className='' src={ item.image } alt={item.name} />
);

return !isDrag && (item.type === ingrType && 
(<Link to={{
  pathname: `/ingredients/${item._id}`,
  state: { background: location }
}} ref={dragRef} style={{ position: "relative" }} onClick={onClick} className={`${styles.ingredients} mb-8`}>
  {count[index] > 0 && (<Counter count={count[index]} size="default" />)}
  <div className='ml-4 mr-4'>{image}</div> 
  <div className={`${styles.price_and_icon} text text_type_digits-default`}>{item.price}
    <CurrencyIcon type="primary" />
  </div>           
  <p className={`${styles.text_container_0} name text text_type_main-small`}>{item.name}</p>
</Link>)
)
}  
  
Bun.propTypes = {
  item: ingredientPropTypes,
  onOpen: PropTypes.func.isRequired,
  ingrType: PropTypes.string,
  index: PropTypes.number
};

export default function BurgerIngredients({ onOpen }) {
  
const { data } = useSelector((store) => store.data);
const [current, setCurrent] = React.useState('bun');
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
    setCurrent('bun')
  }
  if (sauceDomRect.top + scrollY <= 383 && sauceDomRect.top + scrollY > 263) {
    setTextColor({
      bunColor: 'text text_type_main-medium text_color_inactive mb-6',
      sauceColor: 'text text_type_main-medium mb-6',
      mainColor: 'text text_type_main-medium text_color_inactive mb-6'
    }); 
    setCurrent('sauce')
  }
  if (mainDomRect.top + scrollY <= 383 && mainDomRect.top + scrollY > 263) {
    setTextColor({
      bunColor: 'text text_type_main-medium text_color_inactive mb-6',
      sauceColor: 'text text_type_main-medium text_color_inactive mb-6',
      mainColor: 'text text_type_main-medium mb-6'
    }); 
    setCurrent('main')
  }
} 

return (
  <div className={styles.left_section}>
    <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p> 
    <div className="mb-10" style={{ display: 'flex' }}>
      <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={setCurrent}>
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
        <Bun index={index} key={item._id} onOpen={onOpen} item={item} ingrType='bun' /> )} 
      </div> 
      <p ref={headerSauceRef} className={textColor.sauceColor}>Соусы</p>  
      <div className={`${styles.BI_container} pl-4`}> 
        {data.isLoading && 'Загрузка...'} 
        {data.hasError && 'Произошла ошибка'}            
        {!data.isLoading &&
        !data.hasError &&
        !!data.length && 
        data.map((item, index) => item.type ==='sauce' &&
        <Ingredients index={index} key={item._id} onOpen={onOpen} item={item} ingrType='sauce' /> )}
      </div>   
      <p ref={headerMainRef} className={textColor.mainColor}>Начинки</p>  
      <div className={`${styles.BI_container} pl-4`}>
        {data.isLoading && 'Загрузка...'}
        {data.hasError && 'Произошла ошибка'}
        {!data.isLoading &&
        !data.hasError &&
        !!data.length &&
        data.map((item, index) => item.type ==='main' &&
        <Ingredients index={index} key={item._id} onOpen={onOpen} item={item} ingrType='main' /> )}
      </div>                   
    </div> 
  </div>  
)
}

BurgerIngredients.propTypes = {
  onOpen: PropTypes.func.isRequired
};