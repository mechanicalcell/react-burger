import React from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Ingredients({ data, onOpen, current }) {
  const image = (
    <img className='' src={ data.image } alt={data.name} />
  );
  return ((
    (<>
      { data.type === 'bun' && current === 'one' &&
      <div onClick={onOpen} className='ingredients mb-8'>
        <div className='test_container ml-4 mr-4'>{image}</div> 
        <p className="price_and_icon text text_type_digits-default">{data.price}
          <CurrencyIcon type="primary" />
        </p>             
        <p className="text_container_0 text text_type_main-small">{data.name}</p>
      </div> }

      { data.type === 'sauce' && current === 'two' &&
      <div onClick={onOpen} className='ingredients mb-8'>
        <div className='test_container ml-4 mr-4'>{image}</div> 
        <p className="price_and_icon text text_type_digits-default">{data.price}
          <CurrencyIcon type="primary" />
        </p>             
        <p className="text_container_0 text text_type_main-small">{data.name}</p>
      </div> }

      { data.type === 'main' && current === 'three' &&
      <div onClick={onOpen} className='ingredients mb-8'>
        <div className='test_container ml-4 mr-4'>{image}</div> 
        <p className="price_and_icon text text_type_digits-default">{data.price}
          <CurrencyIcon type="primary" />
        </p>             
        <p className="text_container_0 text text_type_main-small">{data.name}</p>
      </div> }
    </>)     
  )) 
} 

export default function BurgerIngredients({data, onOpen }) {
  const [current, setCurrent] = React.useState('one')  
  return (
    <div className='left_section'>
      <p className="test_container text text_type_main-large mt-10 mb-5">Соберите бургер</p> 
      <div className="test_container mb-10" style={{ display: 'flex' }}>
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
      <div className='over_flow_container_BI'>
        <p className="test_container text text_type_main-medium mb-6">Соусы</p>  
          <div className='BI_container pl-4'>
            {data.isLoading && 'Загрузка...'}
            {!data.isLoading &&
            //data.hasError &&
            data.length &&
            data.map((item, index) => 
            <Ingredients data={item} onOpen={onOpen} current={current} /> )}
          </div>  
      </div> 
    </div>  
  )
}