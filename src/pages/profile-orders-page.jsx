import AppHeader from "../components/app-header/app-header";
import { NavLink, useRouteMatch } from 'react-router-dom';

export function ProfileOrdersPage() {
    const { path } = useRouteMatch();
    const profileStyle = path === '/profile' ? 'text text_type_main-large' : 'text text_type_main-large text_color_inactive'
    const orderHistoryStyle = path === '/profile/orders' || path === '/profile/orders:id' ? 'text text_type_main-large' : 'text text_type_main-large text_color_inactive'
    const logoutStyle = path === '/logout' ? 'text text_type_main-large' : 'text text_type_main-large text_color_inactive'  
  
  return (
    <div>
    <AppHeader />
    <div style={{ display: 'flex', 
                  marginTop: '200px',
                  marginLeft: '100px',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  width: '240px' }}>
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
    </div>
  );
} 