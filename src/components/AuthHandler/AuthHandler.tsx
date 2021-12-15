import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../../contexts/UserContext";
import { Window } from "../../contexts/WindowContext";

interface IAuthHandler {
  protectedPath: string
}

const AuthHandler: React.FC<IAuthHandler> = ({ protectedPath }) => {
  const { currentUser } = useContext(User)
  const { loading } = useContext(Window)


  return (
    loading || currentUser === undefined
      ? <></>
      : currentUser === null
        ? <Navigate to='/login' replace />
        : <Navigate to={protectedPath || '/main'} />
  )
}

export default AuthHandler