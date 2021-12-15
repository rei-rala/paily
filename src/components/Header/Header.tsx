import React, { useContext, useState } from "react";

import { Window } from "../../contexts/WindowContext";
import { User } from "../../contexts/UserContext";

import HeaderStyled from "./HeaderStyled";
import BurgerMenu from "./HeaderButtons/BurgerMenuButton";
import MainMenu from "./HeaderMenus/MainMenu/MainMenu";
import UserMenu from "./HeaderMenus/UserMenu/UserMenu";
import Brand from "./HeaderButtons/Brand";
import UserMenuButton from "./HeaderButtons/UserMenuButton";

export interface IMenu {
  activeMenu: string | null | undefined,
  setActiveMenu: (arg: string | null | undefined) => void | null,
  user: undefined | null | {
    id: number,
    email: string
    image: string,
    balances: any[]
  }
}

const Header: React.FC = () => {
  const { scrolled } = useContext(Window)
  const { currentUser } = useContext(User)

  const [activeMenu, setActiveMenu] = useState<string | null | undefined>(null)


  return (
    <>
      {
        activeMenu === 'burger'
          ? <MainMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} user={currentUser} />
          : activeMenu === 'user'
            ? <UserMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} user={currentUser} />
            : null
      }

      <HeaderStyled className={scrolled && !activeMenu ? 'scrolled' : ''}>
        <BurgerMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} user={currentUser} />
        <Brand />
        <UserMenuButton activeMenu={activeMenu} setActiveMenu={setActiveMenu} user={currentUser} />
      </HeaderStyled>
    </>
  )
}

export default Header