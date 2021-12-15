import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../../contexts/UserContext";
import { Window } from "../../contexts/WindowContext";
import Loading from "../Loading/Loading";

interface IAuthHandler {
  protectedPath: string
}

const AuthHandler: React.FC<IAuthHandler> = ({ protectedPath }) => {
  const { currentUser } = useContext(User)
  const { loading } = useContext(Window)


  return (
    loading || currentUser === undefined
      ? <Loading active />
      : currentUser === null
        ? <Navigate to='/login' replace />
        : <Navigate to={protectedPath || '/main'} />
  )
}

export default AuthHandler