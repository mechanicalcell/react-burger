import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

const burgerConstructorPropTypes = PropTypes.shape({
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number,
  type: PropTypes.string.isRequired,
  __v: PropTypes.number,
  _id: PropTypes.string.isRequired
});  

function ConstructorIngredients({ data }) {
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
        /> 
      </div> 
  )) 
} 

ConstructorIngredients.propTypes = {
  data: burgerConstructorPropTypes.isRequired
};
 
export default function BurgerConstructor({data, onOpen, isVisible, orderModal}) {
  return (
    <div className={`${styles.right_section} ml-10 pt-25`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <div className='ml-10'>
          {data.map((item) => item.name === 'Краторная булка N-200i' &&
          <ConstructorElement
            key={item._id}
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={item.image}
          />)}
        </div>     
        <div className={styles.over_flow_container_BC}>
          {data.isLoading && 'Загрузка...'}
          {data.hasError && 'Произошла ошибка'}
          {!data.isLoading &&
          !data.hasError &&
          !!data.length &&
          data.map((item) => item.type != 'bun' &&
          <ConstructorIngredients key={item._id} data={item} /> )}
        </div> 
        <div className='ml-10'>
          {data.map((item) => item.name === 'Краторная булка N-200i' &&
          <ConstructorElement
            key={item._id}
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={item.image}
          />)}
        </div>
      </div>
      <div className={`${styles.order_container} mt-10 mb-2`}>
        <p className={`${styles.text_ingredient_container} text text_type_digits-default mr-2`}>610</p>    
        <p className='mr-10'><CurrencyIcon type="primary" /></p>
        <Button onClick={onOpen}  type="primary" size="medium">
           Оформить заказ {onOpen && isVisible.visible && orderModal}
        </Button>
      </div>
    </div>  
  )
}

  BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(burgerConstructorPropTypes).isRequired,
    onOpen: PropTypes.func.isRequired,
    isVisible: PropTypes.objectOf(PropTypes.bool).isRequired,
    modal1: PropTypes.element 
  };