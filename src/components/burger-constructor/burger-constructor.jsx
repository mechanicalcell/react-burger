import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../utils/types';
import { useSelector } from 'react-redux';
import { useDrop } from "react-dnd";

function ConstructorIngredients({ingredients, deleteIngr}) {
return (ingredients.map(item =>
  <div key={item.key} className={`${styles.main_list_container} mt-4`}>
    <div><DragIcon type="primary" /></div> 
    <ConstructorElement 
      text={item.name}
      price={item.price}
      thumbnail={item.image}
      handleClose={() => deleteIngr(item, item.index)}
    /> 
  </div> 
)) 
} 

ConstructorIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  deleteIngr: PropTypes.func.isRequired
};
 
export default function BurgerConstructor({ onOpen, 
                                            deleteIngr, 
                                            totalPrice,
                                            ingredientHandleDrop,
                                            bunHandleDrop }) {
const { newArrBurgerConstructor, newArrBun } = useSelector(store => store.isNewArr);
const ingredients  = newArrBurgerConstructor.map(item => item).filter((item, index) => item.type !== 'bun')
const [{isHoverIngredient}, ingredientDropTarget] = useDrop({
  accept: "ingredient",
  drop(item) {
    ingredientHandleDrop(item, item.index);
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
        <ConstructorIngredients deleteIngr={deleteIngr} ingredients={ingredients} />
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
      <Button onClick={onOpen} type="primary" size="medium" >
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