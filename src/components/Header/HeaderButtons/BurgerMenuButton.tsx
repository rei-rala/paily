import React from "react";
import { IMenu } from "../Header";

const BurgerMenu: React.FC<IMenu> = ({ activeMenu, setActiveMenu }) => {

  return (
    <div
      className={`burgerMenu ${activeMenu === 'burger' ? 'burgerActive' : ''}`}
      onClick={() => {
        activeMenu === 'burger'
          ? setActiveMenu(null)
          : setActiveMenu('burger')
      }}>
      <div></div>
      <div></div>
      <div></div>
    </div >
  )
}

export default BurgerMenu
