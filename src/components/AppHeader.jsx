import { BurgerIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Logo, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components"

export default function AppHeader() {
  return (
    <>
      <header className="navigation_panel">
        <nav className="content">
          <div className="navigation_box">
            <nav className="navigation_link">
              <div className='icon_container'>
                <BurgerIcon />     
              </div> 
              <p className="text_container text text_type_main-small ml-2">Конструктор</p>
            </nav>
            <nav className="navigation_link ml-2">
              <div className='icon_container'>
                <ListIcon type="secondary" />    
              </div>
              <p className="text_container text text_type_main-small ml-2">Лента заказов</p>
            </nav>
          </div>
          <div className='logo_container'>
            <Logo />  
          </div>
          <nav className="navigation_link">
            <div className='icon_container'>
              <ProfileIcon type="secondary" />     
            </div>  
            <p className="text_container text text_type_main-small ml-2">Личный кабинет</p>
          </nav>
        </nav>
      </header>
    </>
  )
}