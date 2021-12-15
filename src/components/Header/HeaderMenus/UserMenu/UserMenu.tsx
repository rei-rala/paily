import React, { useContext } from "react";
import UserMenuStyled from "./UserMenuStyled";
import { IMenu } from "../../Header";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../../../contexts/ModalContext";
import { APIlogOut } from "../../../../services/user";
import { User } from "../../../../contexts/UserContext";


const UserMenu: React.FC<IMenu> = ({ activeMenu, setActiveMenu, user }) => {
  const { setCurrentUser } = useContext(User)
  const { configModal } = useContext(Modal)


  const preLogOut = async () => {
    await APIlogOut()
      .finally(() => {
        configModal()
        setActiveMenu(null)
        setCurrentUser(false)
      })
  }

  return (
    <UserMenuStyled className={`menu ${activeMenu}`}>
      {
        !user
          ? <strong>Inicie sesion para administrar su cuenta</strong>
          : <>
            <div className="userMenuSection greeting">
              <span>Hola <strong>{user.email}</strong>!</span>
            </div>

            <div className="sep"> <hr /> </div>
            <div className="userMenuSection">
              <Link to='/user'>
                <FontAwesomeIcon icon={faUser} /> <span>Perfil</span>
              </Link>
            </div>

            <div className="userMenuSection">
              <Link to='/user/config'>
                <FontAwesomeIcon icon={faCog} /> <span>Ajustes</span>
              </Link>
            </div>
            <div className="sep"> <hr /> </div>
            <div
              style={{ cursor: 'pointer' }}
              className="userMenuSection"
              onClick={
                () => configModal(
                  'Cerrar Sesion',
                  <span>Desea cerrar la sesion de <strong> {user.email}</strong>?</span>,
                  preLogOut
                )}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> <span>Cerrar Sesion</span>
            </div>
          </>
      }

    </UserMenuStyled >
  )
}

export default UserMenu