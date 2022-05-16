import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../utils/types';
import { useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { REORDER_BURGER_CONSTRUCTOR
} from "../../services/actions/copy-arr";
import { useHistory } from 'react-router-dom';

function ConstructorIngredients({item, index, deleteIngr}) {
const dispatch = useDispatch();
const ref = useRef(null);
const { newArrBurgerConstructor } = useSelector(store => store.isNewArr);
const [{isDrag}, dragRef] = useDrag({
  type: "ingredients",
  item: {item, index},
});
   
const copyNewArrBurgerConstructor = useMemo(() => [...newArrBurgerConstructor],[newArrBurgerConstructor]);
const hoverIndex = index;
const ingredientsHandleDrop = useCallback((index) => {
  copyNewArrBurgerConstructor.splice(hoverIndex, 0, copyNewArrBurgerConstructor.splice(index, 1)[0])
  dispatch({ type: REORDER_BURGER_CONSTRUCTOR, payload: copyNewArrBurgerConstructor })
}, 
[hoverIndex, dispatch, copyNewArrBurgerConstructor]
);

const [{isHoverIngredients}, ingredientsDropTarget] = useDrop({
  accept: "ingredients",
  drop({item, index}) { 
    ingredientsHandleDrop(index);
  },
  collect: monitor => ({ 
    isHoverIngredients: monitor.isOver(),
  })  
});    

const borderColor = isHoverIngredients ? 'gray' : 'transparent';

return (!isDrag && 
(<div ref={dragRef(ingredientsDropTarget(ref))} 
      className={`${styles.main_list_container} mt-4`}
      style={{ border: '2px solid #4C4CFF', borderColor }}>  
  <div><DragIcon type="primary" /></div> 
  <ConstructorElement 
    text={item.name}
    price={item.price}
    thumbnail={item.image}
    handleClose={() => deleteIngr(item, item.index)}
  /> 
</div>)         
) 
} 
  
ConstructorIngredients.propTypes = {
  item: ingredientPropTypes.isRequired,
  deleteIngr: PropTypes.func.isRequired
};
 
export default function BurgerConstructor({ onOpen, 
                                            deleteIngr, 
                                            totalPrice,
                                            ingredientHandleDrop,
                                            bunHandleDrop }) {
const { newArrBurgerConstructor, newArrBun } = useSelector(store => store.isNewArr);

const [{isHoverIngredient}, ingredientDropTarget] = useDrop({
  accept: "ingredient",
  drop(item) { 
    ingredientHandleDrop(item, item.index, item.key);
  },
  collect: monitor => ({ 
    isHoverIngredient: monitor.isOver(),
  })  
});    

const [{isHoverBun}, bunDropTarget] = useDrop({
  accept: "bun",
  drop(item) {
    bunHandleDrop(item, item.index); 
  },
  collect: monitor => ({
    isHoverBun: monitor.isOver(),
  })  
});

const borderColor = isHoverBun || isHoverIngredient ? 'gray' : 'transparent';

const history = useHistory()

const { getResult } = useSelector(store => store.profile);  

const onClick = useCallback(() => {
  if (getResult.user.email === null) { 
      history.replace("/login"); 
    } else {
      if (getResult.user.email) {  
        onOpen()
      }
  }
}, [getResult, history, onOpen]);  

return (
  <div className={`${styles.right_section} ml-10 pt-25`}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div ref={bunDropTarget} className='ml-10' style={{ border: '2px solid #4C4CFF',
                                                          height: '80px',
                                                          borderColor }}>
        {newArrBun.map(item => item.type === 'bun' && 
        <ConstructorElement
          key={item._id}
          type="top"
          isLocked={true}
          text={`${item.name} (верх)`}
          price={item.price}
          thumbnail={item.image}
        />)} 
      </div>     
      <div ref={ingredientDropTarget} 
           style={{ borderColor }} 
           className={styles.over_flow_container_BC}>
        {newArrBurgerConstructor.map((item, index) => item.type !== 'bun' &&
        <ConstructorIngredients index={index} key={item.key} deleteIngr={deleteIngr} item={item} /> )}
      </div> 
      <div className='ml-10'> 
        {newArrBun.map(item => item.type === 'bun' &&
        <ConstructorElement 
          key={item._id}
          type="bottom"
          isLocked={true}
          text={`${item.name} (низ)`}
          price={item.price}
          thumbnail={item.image}
        />)} 
      </div>
    </div>
    <div className={`${styles.order_container} mt-10 mb-2`} >
      <p className={`${styles.text_ingredient_container} text text_type_digits-medium mr-2`}>{totalPrice}</p>    
      <p className='mr-10'><CurrencyIcon type="primary" /></p>
      <Button onClick={onClick} type="primary" size="medium" >
        Оформить заказ 
      </Button>
    </div>
  </div>  
)
}

BurgerConstructor.propTypes = {
  onOpen: PropTypes.func.isRequired,
  deleteIngr: PropTypes.func.isRequired,
  totalPrice: PropTypes.number,
  ingredientHandleDrop: PropTypes.func,
  bunHandleDrop: PropTypes.func
};