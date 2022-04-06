import styles from '../ingredient-details/ingredient-details.module.css';
import { useSelector } from 'react-redux';

export default function IngredientDetails() {

const { newArrIngredientDetails } = useSelector(store => store.isNewArr)  

return ( 
  <div className={styles.ingredient_details_box}> 
    <div className={styles.img_box}> 
      <img src={newArrIngredientDetails.image} alt={newArrIngredientDetails.name} />
    </div>
    <div className={`${styles.name_modal} text text_type_main-medium mt-4`}>{newArrIngredientDetails.name}</div>
    <div className={styles.modal_ingredients}>
      <div className={'text text_type_main-small'}>Калории,ккал {newArrIngredientDetails.calories}</div>  
      <div className={'text text_type_main-small'}>Белки,г {newArrIngredientDetails.proteins}</div>  
      <div className={'text text_type_main-small'}>Жиры,г {newArrIngredientDetails.fat}</div>
      <div className={'text text_type_main-small'}>Углеводы,г {newArrIngredientDetails.carbohydrates}</div>  
    </div>
  </div>
)
}




 
   
     
     
  
    
