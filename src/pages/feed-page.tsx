import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../services/action-types";
import styles from './page-container.module.css';

export const convertDate = (date: string): string => {
  const orderDate = new Date(date).setHours(0, 0, 0, 0);
  const currentDate = new Date().setHours(0, 0, 0, 0);
  let day = new Date(orderDate).toLocaleDateString("ru-RU", {});
  if (orderDate === currentDate) {
    day = "Сегодня";
  } else if (currentDate - orderDate == 24 * 60 * 60 * 1000) {
    day = "Вчера";
  } else if (currentDate - orderDate == -24 * 60 * 60 * 1000) {
    day = "Завтра";
  }
  const time = new Date(date).toLocaleTimeString("ru-Ru", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
  return `${day}, ${time}`;
};

const Order: FC<any> = ({ item, onOpen }) => {
const history = useHistory();
const location = useLocation() 
const { orders, wsConnected } = useSelector((store: any) => store.orders);
const { data } = useSelector((store: any) => store.data);
const orderIngredients = data.filter((i: any) => item.ingredients.includes(i._id))
const sumIngredients = orderIngredients.map((i: any) => i.price).reduce((sum: number, item: number ) => sum += item,0)
const onClick = () => {
  history.push({ pathname: `/feed/${item._id}` })
  onOpen()
}

return wsConnected && (
<Link to={{
        pathname: `/feed/${item._id}`,
        state: { background: location } 
      }} 
      onClick={onClick} 
      className={styles.text_order_container}
>
  <div className={styles.feed_order_container}>
    <div className={styles.feed_number_container}>
      <p className={"text text_type_digits-default"}>#{item.number}</p><p className="text text_type_main-default">{convertDate(item.createdAt)}</p>
    </div>  
    <p className={`${styles.feed_name_container} text text_type_main-medium`}>{item.name}</p>
    <div className={styles.feed_sum_container}>
      <div className={styles.feed_ingredients_container}>
       {orderIngredients.map((i: any) => <img className={styles.round_ingredients_container} src={ i.image } alt={ i.name } key={i._id} />)}
      </div>
      <div className={styles.feed_sum_icon_container}>
        <p className="text text_type_digits-default mr-2">{sumIngredients}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  </div>
</Link>)
}  
  
const FeedPage: FC<any> = ({onOpen}) => {
const { path } = useRouteMatch();
const { getResult } = useSelector((store: any) => store.profile);
const { loginResult } = useSelector((store: any) => store.login);
const dispatch = useDispatch()
useEffect(() => {
if (path === '/feed') {
  dispatch({type: WS_CONNECTION_START, payload: 'orders/all'})
} else {
    dispatch({type: WS_CONNECTION_CLOSED})
}
}, [dispatch]);
const { orders, wsConnected } = useSelector((store: any) => store.orders);

return (
  <div>
  <p className="text text_type_main-large mt-10 ml-25">Лента заказов</p> 
  <div className={styles.main_feed_container}>
    <div className={styles.left_feed_container}>
      {wsConnected && orders.success && orders.orders.map((item: any) => <Order item={item} key={item._id} onOpen={onOpen} />)}
    </div> 
    <div className={styles.right_feed_container}>
      <div className={styles.main_ready_container}>
        <div>
          <div className={styles.ready_container}>
            <p className="text text_type_main-medium">Готовы:</p>
          </div>
          <div className={styles.ready_order_numbers_container}>
            <p className="text text_type_digits-default text_color_inactive mb-2">{orders.success && orders.orders[0].status === 'done' && orders.orders[0].number}</p>
            <p className="text text_type_digits-default text_color_inactive mb-2">{orders.success && orders.orders[1].status === 'done' && orders.orders[1].number}</p>
            <p className="text text_type_digits-default text_color_inactive mb-2">{orders.success && orders.orders[2].status === 'done' && orders.orders[2].number}</p>
            <p className="text text_type_digits-default text_color_inactive mb-2">{orders.success && orders.orders[3].status === 'done' && orders.orders[3].number}</p>
            <p className="text text_type_digits-default text_color_inactive mb-2">{orders.success && orders.orders[4].status === 'done' && orders.orders[4].number}</p>
          </div>
        </div>
        <div>
          <div className={styles.not_ready_container}>
          <p className="text text_type_main-medium">В работе:</p>
          </div>
          <div className={styles.not_ready_order_numbers_container}>
            <p className="text text_type_digits-default mb-2">{orders.success && orders.orders[0].status !== 'done' && orders.orders[0].number}</p>
            <p className="text text_type_digits-default mb-2">{orders.success && orders.orders[1].status !== 'done' && orders.orders[0].number}</p>
            <p className="text text_type_digits-default mb-2">{orders.success && orders.orders[2].status !== 'done' && orders.orders[0].number}</p>
          </div>
        </div>
      </div>
      <p className="text text_type_main-medium">Выполнено за все время:</p>
      <p className="text text_type_digits-large mb-15">{wsConnected && orders.success && orders.total}</p>
      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large mb-15">{wsConnected && orders.success && orders.totalToday}</p>
    </div> 
  </div>  
  </div> 
)
}

export default FeedPage