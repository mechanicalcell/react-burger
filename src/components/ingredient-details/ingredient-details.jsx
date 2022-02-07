import styles from '../ingredient-details/ingredient-details.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

export default function IngredientDetails({data, onOpen}) {
  const [isMem, setIsMem] = useState({ newArr: [] });

useEffect(()=>{
  newArray();
  return () => {
    document.removeEventListener("click", newArray);
  }
}, [])  

const ingrArr = Array.from(document.querySelectorAll('article'))

const newArray = () => {
  ingrArr.map(ing => 
    ing.addEventListener('click', e => { 
      if (ing.querySelectorAll('.name')[0].innerHTML == data.name) {
        return setIsMem({newArr: data})  
      }   
    })) 
}

return (
  <div> 
    
    <img src={isMem.newArr.image} alt={isMem.newArr.name} />
    <p className={styles.name_modal}>{isMem.newArr.name}</p>
    {isMem.newArr.name && 
    <p className={styles.modal_ingredients}>Калории,ккал {isMem.newArr.calories }  Белки,г {isMem.newArr.proteins }  Жиры,г {isMem.newArr.fat }  </p>
    }
  </div>
)

}



 
   
     
     
  
    
