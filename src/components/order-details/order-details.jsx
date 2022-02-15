import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function OrderDetails() {
  return (
    <div onClick={e => e.stopPropagation()}> 
      <p className={`${styles.order_number} mt-4`}>034536</p>
      <p className={`${styles.order_id_text} text text_type_main-medium mt-8`}>идентификатор заказа</p>  
      <div className={`${styles.order_icon} mt-15`}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className={`${styles.order_status_text} text text_type_main-small mt-15`}>Ваш заказ начали готовить</p> 
      <p className={`${styles.order_info_text} text text_type_main-small mt-2`}>Дождитесь готовности на орбитальной станции</p>   
    </div>
  )  
}