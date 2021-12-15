import React, { useContext, useLayoutEffect, useState } from "react";

import { Window } from "../../contexts/WindowContext";
import { User } from "../../contexts/UserContext";

import HeaderStyled from "./HeaderStyled";
import BurgerMenu from "./HeaderButtons/BurgerMenuButton";
import MainMenu from "./HeaderMenus/MainMenu/MainMenu";
import UserMenu from "./HeaderMenus/UserMenu/UserMenu";
import Brand from "./HeaderButtons/Brand";
import UserMenuButton from "./HeaderButtons/UserMenuButton";
import { IUser } from "../../services/user";

export interface IMenu {
  activeMenu: string | null | undefined,
  setActiveMenu: (arg: string | null) => void | null,
  user: IUser | false | null
}

const Header: React.FC = () => {
  const { scrolled } = useContext(Window)
  const { currentUser } = useContext(User)

  const [userData, setUserData] = useState<IUser | null>(null)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  useLayoutEffect(() => {
    !currentUser
      ? setUserData(null)
      : setUserData(currentUser)
  }, [currentUser])

  return (
    <>
      {
        activeMenu === 'burger'
          ? <MainMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} user={userData} />
          : activeMenu === 'user'
            ? <UserMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} user={userData} />
            : null
      }

      <HeaderStyled className={scrolled && !activeMenu ? 'scrolled' : ''}>
        <BurgerMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} user={userData} />
        <Brand />
        <UserMenuButton activeMenu={activeMenu} setActiveMenu={setActiveMenu} user={userData} />
      </HeaderStyled>
    </>
  )
}

export default Header