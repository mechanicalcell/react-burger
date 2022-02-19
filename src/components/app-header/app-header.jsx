import { BurgerIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Logo, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './app-header.module.css';

export default function AppHeader() {
  return (
    <>
      <header className={styles.navigation_panel}>
        <nav className={styles.content}>
          <div className={styles.navigation_box}>
            <nav className={styles.navigation_link}>
              <div className={styles.icon_container}>
                <BurgerIcon />     
              </div> 
              <p className={`${styles.text_container} text text_type_main-small ml-2`}>Конструктор</p>
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
          <nav className={styles.navigation_link}>
            <div className={styles.icon_container}>
              <ProfileIcon type="secondary"/>     
            </div>  
            <p className={`${styles.text_container} text text_type_main-small ml-2`}>Личный кабинет</p>
          </nav>
        </nav>
      </header>
    </>
  )
}