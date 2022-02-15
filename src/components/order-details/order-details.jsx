import styles from './order-details.module.css';

export default function OrderDetails() {
  return (
    <div onClick={e => e.stopPropagation()}> 
      <p className={`${styles.order_number} mt-8`}>034536</p>
      <p className={'text text_type_main-medium ml-25'}>идентификатор заказа</p>  
    </div>
  )  
}