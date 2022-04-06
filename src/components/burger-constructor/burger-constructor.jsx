import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../utils/types';
import { useSelector } from 'react-redux';

function ConstructorIngredients({item, deleteIngr, index}) {
  return ((
      <div className={`${styles.main_list_container} mt-4`}>
        <div><DragIcon type="primary" /></div> 
        <ConstructorElement 
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={() => deleteIngr(item, index)}
        /> 
      </div> 
  )) 
} 

ConstructorIngredients.propTypes = {
  item: ingredientPropTypes.isRequired,
  deleteIngr: PropTypes.func.isRequired,
  index: PropTypes.number  
};
 
export default function BurgerConstructor({ onOpen, 
                                            deleteIngr, 
                                            totalPrice }) {
  const { newArrBurgerConstructor, newArrBun } = useSelector(store => store.isNewArr);
  return (
    <div className={`${styles.right_section} ml-10 pt-25`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <div className='ml-10'> 
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
        <div className={styles.over_flow_container_BC}>
          {newArrBurgerConstructor.map((item, index) => item.type !== 'bun' &&
          <ConstructorIngredients index={index} deleteIngr={deleteIngr} key={item.key} item={item} /> )}
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
  totalPrice: PropTypes.number
};