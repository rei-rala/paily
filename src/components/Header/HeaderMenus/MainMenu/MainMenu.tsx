import React from "react";
import { NavLink } from "react-router-dom";
import CurrencyModifier from "../../../CurrencyModifier/CurrencyModifier";
import AnimationsToggler from "../../../ThemeTogglers/AnimationsToggler";
import DarkThemeToggler from "../../../ThemeTogglers/DarkThemeToggler";
import MenuStyled from "./MenuStyled";

import { IMenu } from "../../Header";

const MainSubMenu: React.FC<IMenu> = ({ activeMenu, user }) => {

  return (
    <MenuStyled className={`menu ${activeMenu}`}>

      <nav>
        {
          user === undefined || user === null
            ? <NavLink to='/login'>Iniciar sesion</NavLink>
            : <>
              <NavLink to='/main'>Home</NavLink>
              <NavLink to='/cripto'>Criptos</NavLink>
            </>
        }
      </nav>

      <div className="sep"> <hr /> </div>

      <strong>Preferencias</strong>
      <div className="sitePreferences">
        <AnimationsToggler />
        <DarkThemeToggler />
      </div>



      {
        (user !== undefined && user !== null) && <>
          <CurrencyModifier />
          <div className="sep"> <hr /> </div>
        </>
      }

    </MenuStyled>
  )
}

export default MainSubMenu