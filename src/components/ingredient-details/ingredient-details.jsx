import styles from '../ingredient-details/ingredient-details.module.css';

export default function IngredientDetails({isNewArr}) {

return ( 
  <div className={styles.ingredient_details_box}> 
    <div className={styles.img_box}> 
      <img src={isNewArr.newArrIngredientDetails.image} alt={isNewArr.newArrIngredientDetails.name} />
    </div>
    <div className={`${styles.name_modal} text text_type_main-medium mt-4`}>{isNewArr.newArrIngredientDetails.name}</div>
    <div className={styles.modal_ingredients}>
      <div className={'text text_type_main-small'}>Калории,ккал {isNewArr.newArrIngredientDetails.calories}</div>  
      <div className={'text text_type_main-small'}>Белки,г {isNewArr.newArrIngredientDetails.proteins}</div>  
      <div className={'text text_type_main-small'}>Жиры,г {isNewArr.newArrIngredientDetails.fat}</div>
      <div className={'text text_type_main-small'}>Углеводы,г {isNewArr.newArrIngredientDetails.carbohydrates}</div>  
    </div>
  </div>
)
}




 
   
     
     
  
    
