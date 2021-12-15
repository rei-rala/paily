import React, { useContext, useState, useEffect } from "react";
import { User } from "../../../contexts/UserContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { IMenu } from "../Header";

const UserMenuButton: React.FC<IMenu> = ({ activeMenu, setActiveMenu }) => {
  const { currentUser } = useContext(User)

  const [errorOnImg, setErrorOnImg] = useState(false)
  const logged = currentUser !== undefined && currentUser !== null

  useEffect(() => {
    !logged && setErrorOnImg(false)
  }, [logged])

  return (
    <div
      className='userImg'
      title={logged ? `Toca para entrar a tu perfil ${currentUser?.name}` : "Inicia sesion"}
      onClick={() => {
        activeMenu === 'user'
          ? setActiveMenu(null)
          : setActiveMenu('user')
      }}>

      {
        !errorOnImg && (logged && currentUser?.image !== '') && currentUser?.image !== undefined
          ? <img src={currentUser.image} alt={currentUser?.name} onError={() => setErrorOnImg(true)} />
          : <FontAwesomeIcon icon={faUserCircle} />
      }
    </div>
  )
}

export default UserMenuButton