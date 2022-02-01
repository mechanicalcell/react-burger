import React from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';



  
  function BunIngredients({ data, onOpen, current }) {
    const image = (
      <img className='' src={ data.image } alt={data.name} />
    );    
    return (
     <> 
    { data.type === 'bun' && 
    <div onClick={onOpen} className={`${styles.ingredients} mb-8`}>
      <div className='ml-4 mr-4'>{image}</div> 
      <p className={`${styles.price_and_icon} text text_type_digits-default`}>{data.price}
        <CurrencyIcon type="primary" />
      </p>             
      <p className={`${styles.text_container_0} text text_type_main-small`}>{data.name}</p>
    </div> }
    </>
    )
  }

  function SauceIngredients({ data, onOpen, current }) {
    const image = (
      <img className='' src={ data.image } alt={data.name} />
    );    
    return (
     <> 
    { data.type === 'sauce' && 
    <div onClick={onOpen} className={`${styles.ingredients} mb-8`}>
      <div className='ml-4 mr-4'>{image}</div> 
      <p className={`${styles.price_and_icon} text text_type_digits-default`}>{data.price}
        <CurrencyIcon type="primary" />
      </p>             
      <p className={`${styles.text_container_0} text text_type_main-small`}>{data.name}</p>
    </div> }
    </>
    )
  }
  
  function MainIngredients({ data, onOpen, current }) {
    const image = (
      <img className='' src={ data.image } alt={data.name} />
    );    
    return (
     <> 
    { data.type === 'main' && 
    <div onClick={onOpen} className={`${styles.ingredients} mb-8`}>
      <div className='ml-4 mr-4'>{image}</div> 
      <p className={`${styles.price_and_icon} text text_type_digits-default`}>{data.price}
        <CurrencyIcon type="primary" />
      </p>             
      <p className={`${styles.text_container_0} text text_type_main-small`}>{data.name}</p>
    </div> }
    </>
    )
  }

export default function BurgerIngredients({data, onOpen }) {
  const [current, setCurrent] = React.useState('one')  
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
      <div className={styles.over_flow_container_BI}>
        <p className="text text_type_main-medium mb-6">Булки</p>  
          <div className={`${styles.BI_container} pl-4`}>
            {data.isLoading && 'Загрузка...'}
            {data.hasError && 'Произошла ошибка'}            
            {!data.isLoading &&
            !data.hasError &&
            !!data.length &&
            data.map((item) => 
            <BunIngredients key={item._id} data={item} onOpen={onOpen} current={current} /> )}
          </div> 
          <p className="text text_type_main-medium mb-6">Соусы</p>  
          <div className={`${styles.BI_container} pl-4`}>
            {data.isLoading && 'Загрузка...'}
            {data.hasError && 'Произошла ошибка'}            
            {!data.isLoading &&
            !data.hasError &&
            !!data.length &&
            data.map((item) => 
            <SauceIngredients key={item._id} data={item} onOpen={onOpen} current={current} /> )}
          </div>  
          <p className="text text_type_main-medium mb-6">Начинки</p>  
          <div className={`${styles.BI_container} pl-4`}>
            {data.isLoading && 'Загрузка...'}
            {data.hasError && 'Произошла ошибка'}
            {!data.isLoading &&
            !data.hasError &&
            !!data.length &&
            data.map((item) => 
            <MainIngredients key={item._id} data={item} onOpen={onOpen} current={current} /> )}
          </div>                   
      </div> 
    </div>  
  )
}