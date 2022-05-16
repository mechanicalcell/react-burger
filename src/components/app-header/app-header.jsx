import { BurgerIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Logo, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './app-header.module.css';
import { Link, NavLink } from 'react-router-dom';

export default function AppHeader() {
  return (
    <>
      <header className={styles.navigation_panel}>
        <nav className={styles.content}>
          <div className={styles.navigation_box}>
            <nav>
            <NavLink to='/' 
                     className={styles.navigation_link}
                     activeClassName={styles.navigation_link}>  
              <div className={styles.icon_container}>
                <BurgerIcon />     
              </div> 
              <p className={`${styles.text_container} text text_type_main-small ml-2`}>Конструктор</p>
            </NavLink>
            </nav>
            <nav className={`${styles.navigation_link} ml-2`}>
              <div className={styles.icon_container}>
                <ListIcon type="secondary" />    
              </div>
              <p className={`${styles.text_container} text text_type_main-small ml-2`}>Лента заказов</p>
            </nav>
          </div>
          <div className={styles.logo_container}>
            <Logo />  
          </div>
          <nav>
          <Link to='/profile' className={styles.navigation_link}>
            <div className={styles.icon_container}>
              <ProfileIcon type="secondary"/>     
            </div>  
            <p className={`${styles.text_container} text text_type_main-small ml-2`}>Личный кабинет</p>
          </Link>
          </nav>
        </nav>
      </header>
    </>
  )
}