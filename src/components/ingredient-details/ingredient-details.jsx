import styles from '../ingredient-details/ingredient-details.module.css';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../utils/types';

export default function IngredientDetails({ isVisible, isNewArr }) {

return (isVisible && 
  <div onClick={e => e.stopPropagation()} className={styles.hidden_ingredient_details}> 
    <div className={styles.img_box}> 
      <img src={isNewArr.newArr.image} alt={isNewArr.newArr.name} />
    </div>
    <div className={`${styles.name_modal} text text_type_main-medium mt-4`}>{isNewArr.newArr.name}</div>
    <div className={styles.modal_ingredients}>
      <div className={'text text_type_main-small'}>Калории,ккал {isNewArr.newArr.calories}</div>  
      <div className={'text text_type_main-small'}>Белки,г {isNewArr.newArr.proteins}</div>  
      <div className={'text text_type_main-small'}>Жиры,г {isNewArr.newArr.fat}</div>
      <div className={'text text_type_main-small'}>Углеводы,г {isNewArr.newArr.carbohydrates}</div>  
    </div>
  </div>
)
}

IngredientDetails.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isNewArr: ingredientPropTypes
}; 



 
   
     
     
  
    
