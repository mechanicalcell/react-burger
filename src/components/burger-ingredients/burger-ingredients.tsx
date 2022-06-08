import React, { FC, RefObject, SyntheticEvent } from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDrag } from "react-dnd";
import { ingredientIdCopyAction } from "../../services/actions/copy-arr";
import { TIngredients } from "./burger-ingredients-types";
import { TingredientPropTypes } from "../utils/types";

const Ingredients: FC<TIngredients> = ({ onOpen, ingrType, item, index }) => {
const history = useHistory(); 
const location = useLocation()    
const { count } = useSelector((store: any) => store.count);
const [,dragRef] = useDrag({
  type: "ingredient",
  item: {item}
});
const dispatch = useDispatch(); 
const onClick = () => {
  dispatch(ingredientIdCopyAction(item))
  history.push({ pathname: `/ingredients/${item._id}` })
  onOpen();
}
const image = (
  <img className='' src={ item.image } alt={item.name} />
);

return (
  <div>
    {(item.type === ingrType && 
    (<Link to={{
             pathname: `/ingredients/${item._id}`,
             state: { background: location } 
           }} 
           ref={dragRef} 
           onClick={onClick} 
           className={`${styles.ingredients} mb-8`}>
      {count[index] > 0 && (<Counter count={count[index]} size="default" />)} 
      <div className='ml-4 mr-4'>{image}</div> 
      <div className={`${styles.price_and_icon} text text_type_digits-default`}>{item.price}
        <CurrencyIcon type="primary" /> 
      </div>           
      <p className={`${styles.text_container_0} name text text_type_main-small`}>{item.name}</p>
    </Link>)
    )}
  </div>)
}  

const Bun: FC<TIngredients> = ({ onOpen, ingrType, item, index }) => {
const history = useHistory();  
const location = useLocation()  
const { count } = useSelector((store: any) => store.count);
const [{isDrag},dragRef] = useDrag<{item: TingredientPropTypes}, void, {isDrag: boolean}>({
  type: "bun",
  item: {item},
  collect: monitor => ({
    isDrag: monitor.isDragging() 
  })      
});
const dispatch = useDispatch(); 
const onClick = () => {
  dispatch(ingredientIdCopyAction(item))
  history.replace({ pathname: `/ingredients/${item._id}` })
  onOpen();
}
const image = (
  <img className='' src={ item.image } alt={item.name} />
);

return (
  <div>
    {!isDrag && (item.type === ingrType && 
    (<Link to={{
             pathname: `/ingredients/${item._id}`,
             state: { background: location }
           }} 
           ref={dragRef} 
           onClick={onClick} 
           className={`${styles.ingredients} mb-8`}>
      {count[index] > 0 && (<Counter count={count[index]} size="default" />)}
      <div className='ml-4 mr-4'>{image}</div> 
      <div className={`${styles.price_and_icon} text text_type_digits-default`}>{item.price}
        <CurrencyIcon type="primary" />
      </div>           
      <p className={`${styles.text_container_0} name text text_type_main-small`}>{item.name}</p>
    </Link>)
    )}
  </div>)
}  
  
export default function BurgerIngredients({ onOpen }: { onOpen: () => void }) {
  
const { data } = useSelector((store: any) => store.data);
const [current, setCurrent] = React.useState('bun');
const [textColor, setTextColor] = React.useState({
  bunColor: 'text text_type_main-medium text_color_inactive mb-6',
  sauceColor: 'text text_type_main-medium text_color_inactive mb-6',
  mainColor: 'text text_type_main-medium text_color_inactive mb-6'
});  
const headerBunRef = useRef(null) as RefObject<any> | null;
const headerSauceRef = useRef(null) as RefObject<any> | null;
const headerMainRef = useRef(null) as RefObject<any> | null;

const getDomRect = () => {
  const scrollY = window.scrollY 
  const bunDomRect = headerBunRef ? headerBunRef.current.getBoundingClientRect() : null;
  const sauceDomRect = headerSauceRef ? headerSauceRef.current.getBoundingClientRect() : null;
  const mainDomRect = headerMainRef ? headerMainRef.current.getBoundingClientRect() : null;    
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
        data.map((item: TingredientPropTypes, index: number) => item.type ==='bun' &&
        <Bun index={index} key={item._id} onOpen={onOpen} item={item} ingrType='bun' /> )} 
      </div> 
      <p ref={headerSauceRef} className={textColor.sauceColor}>Соусы</p>  
      <div className={`${styles.BI_container} pl-4`}> 
        {data.isLoading && 'Загрузка...'} 
        {data.hasError && 'Произошла ошибка'}            
        {!data.isLoading &&
        !data.hasError &&
        !!data.length && 
        data.map((item: TingredientPropTypes, index: number) => item.type ==='sauce' &&
        <Ingredients index={index} key={item._id} onOpen={onOpen} item={item} ingrType='sauce' /> )}
      </div>   
      <p ref={headerMainRef} className={textColor.mainColor}>Начинки</p>  
      <div className={`${styles.BI_container} pl-4`}>
        {data.isLoading && 'Загрузка...'}
        {data.hasError && 'Произошла ошибка'}
        {!data.isLoading &&
        !data.hasError &&
        !!data.length &&
        data.map((item: TingredientPropTypes, index: number) => item.type ==='main' &&
        <Ingredients index={index} key={item._id} onOpen={onOpen} item={item} ingrType='main' /> )}
      </div>                   
    </div> 
  </div>  
)
}