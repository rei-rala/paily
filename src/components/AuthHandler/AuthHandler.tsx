import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../../contexts/UserContext";
import Loading from "../Loading/Loading";

interface IAuthHandler {
  protectedPath: string
}

const AuthHandler: React.FC<IAuthHandler> = ({ protectedPath }) => {
  const { currentUser } = useContext(User)


  return (
    currentUser === undefined
      ? <Loading />
      : currentUser === null
        ? <Navigate to='/login' replace />
        : <Navigate to={protectedPath || '/main'} />
  )
}

export default AuthHandler