import styles from '../ingredient-details/ingredient-details.module.css';
import { useSelector } from 'react-redux';

export default function IngredientDetails() {
const { newArrIngredientDetails } = useSelector(store => store.isNewArr)  
const { ingredientIdCopy } = useSelector((store) => store.isNewArr);    
return ( 
  <div className={styles.ingredient_details_box}> 
    <div className={styles.img_box}> 
      <img src={ingredientIdCopy.image} alt={ingredientIdCopy.name} />
    </div>
    <div className={`${styles.name_modal} text text_type_main-medium mt-4`}>{ingredientIdCopy.name}</div>
    <div className={styles.modal_ingredients}>
      <div className={'text text_type_main-small'}>Калории,ккал {ingredientIdCopy.calories}</div>  
      <div className={'text text_type_main-small'}>Белки,г {ingredientIdCopy.proteins}</div>  
      <div className={'text text_type_main-small'}>Жиры,г {ingredientIdCopy.fat}</div>
      <div className={'text text_type_main-small'}>Углеводы,г {ingredientIdCopy.carbohydrates}</div>  
    </div>
  </div>
)
}




 
   
     
     
  
    
