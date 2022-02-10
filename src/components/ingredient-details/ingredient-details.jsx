import styles from '../ingredient-details/ingredient-details.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

export default function IngredientDetails({data, onOpen}) {
const [isMem, setIsMem] = useState({ newArr: [] });

const ingrArr = Array.from(document.querySelectorAll('article'))

//в реакте нельзя искать элементы в document. 
//Он был создан для того, чтобы этого не делать 
//Вы говорите про элемент .name ? Если требуется, то попробую сделать через RefForward
const newArray = () => {
  ingrArr.map(ing => 
    ing.addEventListener('click', e => { data.map(item => {
      if (ing.querySelectorAll('.name')[0].innerHTML == item.name) {
        return setIsMem({newArr: item})  
      }   
    })}) 
  ) 
}

useEffect(()=>{
  newArray();
  return () => {
    document.removeEventListener("click", newArray());
    console.log('eee')
  }
}, [])  

return (
  <div className={styles.hidden_ingredient_details}> 
    <div className={styles.img_box}>
      <img src={isMem.newArr.image} alt={isMem.newArr.name} />
    </div>
    <p className={`${styles.name_modal} text text_type_main-medium mt-4`}>{isMem.newArr.name}</p>
    {isMem.newArr.name && 
    <p className={styles.modal_ingredients}>
      <div className={'text text_type_main-small'}>Калории,ккал {isMem.newArr.calories }</div>  
      <div className={'text text_type_main-small'}>Белки,г {isMem.newArr.proteins }</div>  
      <div className={'text text_type_main-small'}>Жиры,г {isMem.newArr.fat }</div>
      <div className={'text text_type_main-small'}>Углеводы,г {isMem.newArr.carbohydrates }</div>  
    </p>
    }
  </div>
)

}



 
   
     
     
  
    
