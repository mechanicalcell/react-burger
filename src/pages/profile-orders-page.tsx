import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { getCookie } from '../components/utils/cookie';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../services/action-types';
import { convertDate } from './feed-page';
import styles from './page-container.module.css';

export function ProfileOrders() {
    const { path } = useRouteMatch();
    const profileStyle = path === '/profile' ? 'text text_type_main-large' : 'text text_type_main-large text_color_inactive'
    const orderHistoryStyle = path === '/profile/orders' || path === '/profile/orders:id' ? 'text text_type_main-large' : 'text text_type_main-large text_color_inactive'
    const logoutStyle = path === '/logout' ? 'text text_type_main-large' : 'text text_type_main-large text_color_inactive'  
  
  return (
    <div className={`${styles.profile_order_container}`}>
      <NavLink to={{ pathname: `/profile` }} className={profileStyle}> 
        <p className="text text_type_main-medium">Профиль</p> 
      </NavLink>
      <NavLink to={{ pathname: `/profile/orders` }} className={`${orderHistoryStyle} mt-6`}> 
        <p className="text text_type_main-medium">История заказов</p>  
      </NavLink>
      <NavLink to={{ pathname: `/logout` }} className={`${logoutStyle} mt-6`}> 
        <p className="text text_type_main-medium">Выход</p>
      </NavLink>
    </div>       
  );
} 

const UserOrder: FC<any> = ({ item, onOpen }) => {
const history = useHistory();
const location = useLocation() 
const { orders, wsConnected } = useSelector((store: any) => store.orders);
const { data } = useSelector((store: any) => store.data);
const orderIngredients = data.filter((i: any) => item.ingredients.includes(i._id))
const sumIngredients = orderIngredients.map((i: any) => i.price).reduce((sum: number, item: number ) => sum += item,0)
const onClick = () => {
  history.push({ pathname: `/profile/orders/${item._id}` });
  onOpen();
}

return orders.success && (
<Link to={{
        pathname: `/profile/orders/${item._id}`,
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
  
const ProfileOrdersPage: FC<any> = ({onOpen}) => {
const { path } = useRouteMatch();
const { getResult } = useSelector((store: any) => store.profile);
const { loginResult } = useSelector((store: any) => store.login);
const dispatch = useDispatch()
useEffect(() => {
if (getResult.success || loginResult.success) {
  dispatch({type: WS_CONNECTION_START, payload: `orders?token=${getCookie('token')}`})
} else {
    dispatch({type: WS_CONNECTION_CLOSED})
}
}, [dispatch, getResult, loginResult]);
const { orders, wsConnected } = useSelector((store: any) => store.orders);

return (
<div>
  <ProfileOrders />
  <div className={styles.main_orders_container}>
    <div className={styles.left_feed_container}>
      {orders.success && orders.orders.map((item: any) => <UserOrder item={item} key={item._id} onOpen={onOpen} />)}
    </div> 
  </div>  
</div> 
)
}

export default ProfileOrdersPage