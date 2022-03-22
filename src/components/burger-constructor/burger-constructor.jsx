import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../utils/types';
import { useContext } from 'react';
import { NewArrContext } from '../../services/newarr-context';
import { TotalPriceContext } from '../../services/totalprice-context';

const newArrayCount = ['count0', 'count1', 'count2', 'count3', 'count4', 'count5', 'count6', 'count7', 'count8', 'count9', 'count10', 'count11', 'count12', 'count13', 'count14']

function ConstructorIngredients({data, deleteIngr, index}) {
  const image = (
    <img className={styles.imageSize} src={ data.image } alt={data.name} />
  );
  return ((
      <div className={`${styles.main_list_container} mt-4`}>
        <div><DragIcon type="primary" /></div> 
        <ConstructorElement 
          text={data.name}
          price={data.price}
          thumbnail={data.image}
          handleClose={() => deleteIngr(data, index)}
        /> 
      </div> 
  )) 
} 

ConstructorIngredients.propTypes = {
  data: ingredientPropTypes.isRequired,
  deleteIngr: PropTypes.func.isRequired,
  index: PropTypes.number  
};
 
export default function BurgerConstructor({ onOpen, deleteIngr }) {
  const [totalPrice, setTotalPrice] = useContext(TotalPriceContext);    
  const {newArrBurgerConstructor, newArrBun} = useContext(NewArrContext);
  const isNewArr = useContext(NewArrContext);

  return (
    <div className={`${styles.right_section} ml-10 pt-25`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <div className='ml-10'> 
          {isNewArr.newArrBun.map(item => item.type === 'bun' && 
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
          {newArrBurgerConstructor.map((item, index) => item.type != 'bun' &&
          <ConstructorIngredients index={index} deleteIngr={deleteIngr} key={item.key} data={item} /> )}
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
  deleteIngr: PropTypes.func.isRequired  
};