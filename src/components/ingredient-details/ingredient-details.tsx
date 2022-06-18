import styles from '../ingredient-details/ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { TingredientPropTypes } from '../utils/types';
import { useAppSelector } from '../..';

export default function IngredientDetails() {
const { id } = useParams<{id: string}>()  
const { data } = useAppSelector(store => store.data) 

return (<div>{data.filter((item: TingredientPropTypes) => item._id === id).map((item: TingredientPropTypes) => 
  (<div key={item._id} className={styles.ingredient_details_box}> 
    <div className={styles.img_box}> 
      <img src={item.image} alt={item.name} />
    </div>
    <div className={`${styles.name_modal} text text_type_main-medium mt-4`}>{item.name}</div>
    <div className={styles.modal_ingredients}>
      <div className={'text text_type_main-small'}>Калории,ккал {item.calories}</div>  
      <div className={'text text_type_main-small'}>Белки,г {item.proteins}</div>  
      <div className={'text text_type_main-small'}>Жиры,г {item.fat}</div>
      <div className={'text text_type_main-small'}>Углеводы,г {item.carbohydrates}</div>  
    </div>  
  </div>))}</div> 
) 
}




 
   
     
     
  
    
