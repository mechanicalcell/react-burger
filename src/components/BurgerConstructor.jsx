import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
//import '../index.css';
import './burgerconstructor.css';

function ConstructorIngredients({ data }) {
  const image = (
    <img className='imageSize' src={ data.image } alt={data.name} />
  );
  return ((
    <>
      <div className='main_list_container mt-4'>
        <p><DragIcon type="primary" /></p>
        <div className='list_container ml-2 pt-4 pb-4'>
          <div>{image}</div> 
            <p className="text_ingredient_container text text_type_main-default ml-5 mr-5 pr-10 pl-10">{data.name}</p>
            <p className="text_ingredient_container text text_type_digits-default mr-5">{data.price}
            <CurrencyIcon type="primary" />
          </p>
          <p className='text_ingredient_container mr-8'><DeleteIcon type="primary" /></p> 
        </div>
      </div> 
    </>     
  )) 
} 
 
export default function BurgerConstructor({data, onOpen, isVisible, modal1}) {
    return (
      <div className='right_section ml-10'>
        <div className='over_flow_container_BC mt-25'>
          {data.isLoading && 'Загрузка...'}
          {!data.isLoading &&
          !data.hasError &&
          data.length &&
          data.map((item, index) => 
          <ConstructorIngredients key={index} data={item} /> )}
        </div> 
        <div className='order_container mt-10 mb-2'>
          <p className="text_ingredient_container text text_type_digits-default mr-2">610</p>    
          <p className='mr-10'><CurrencyIcon type="primary" /></p>
          <Button onClick={onOpen}  type="primary" size="medium">
            Оформить заказ {onOpen && isVisible.visible && modal1}
          </Button>
        </div>
      </div>  
    )
  }