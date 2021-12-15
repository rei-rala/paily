import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import RegisterForm from "./RegisterForm/RegisterForm";
import LoginForm from "./LogInForm/LogInForm";
import { User } from "../../../contexts/UserContext";
import { URL_USERS, API_BASEURL } from "../../../services/urls";
import { Window } from "../../../contexts/WindowContext";
import { Modal } from "../../../contexts/ModalContext";

export interface IAccessForm {
  cancel: boolean,
  setCancel: React.Dispatch<React.SetStateAction<boolean>>,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  currentUser: any,
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>,
  credentials: ICredentials | null,
  setCredentials: React.Dispatch<React.SetStateAction<ICredentials | null>>,
  configModal: (title: string, message: string) => void,
}

export interface ICredentials {
  email: string,
  password: string
}

const AccessSection: React.FC<{ sectionStr?: string }> = ({ sectionStr }) => {
  const { loading, setLoading } = useContext(Window)
  const { currentUser, setCurrentUser } = useContext(User)
  const { configModal } = useContext(Modal)

  const notLoggedIn = currentUser === null

  const [credentials, setCredentials] = useState<ICredentials | null>(null)
  const [cancel, setCancel] = useState(false)


  useEffect(() => {
    const sessionAbortController = new AbortController()

    if (notLoggedIn) {
      axios.get(URL_USERS, {
        signal: sessionAbortController.signal,
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": API_BASEURL,
          "Access-Control-Allow-Credentials": "true",
        }
      })
        .then((user) => {
          if (user) {
            setCurrentUser(user.data)
          }
        })
        .catch(err => { console.info('No se recupero sesion') })
    }

    return () => {
      sessionAbortController.abort()
    }
  }, [notLoggedIn, setCurrentUser])

  return (
    sectionStr === "register"
      ? <RegisterForm
        configModal={configModal}
        loading={loading} setLoading={setLoading}
        credentials={credentials} setCredentials={setCredentials}
        cancel={cancel} setCancel={setCancel}
        currentUser={currentUser} setCurrentUser={setCurrentUser}
      />
      : <LoginForm
        configModal={configModal}
        loading={loading} setLoading={setLoading}
        credentials={credentials} setCredentials={setCredentials}
        cancel={cancel} setCancel={setCancel}
        currentUser={currentUser} setCurrentUser={setCurrentUser}
      />
  );
}

export default AccessSection