import React, { useContext, useState } from "react";

import RegisterForm from "./RegisterForm/RegisterForm";
import LoginForm from "./LogInForm/LogInForm";
import { User } from "../../../contexts/UserContext";
import { Modal } from "../../../contexts/ModalContext";
import Loading from "../../Loading/Loading";

export interface IAccessForm {
  cancel: boolean,
  setCancel: React.Dispatch<React.SetStateAction<boolean>>,
  loading?: boolean,
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
  const { currentUser, setCurrentUser } = useContext(User)
  const { configModal } = useContext(Modal)


  const [credentials, setCredentials] = useState<ICredentials | null>(null)
  const [loading, setLoading] = useState(false)
  const [cancel, setCancel] = useState(false)


  return (
    loading === true
    ? <Loading />
    : sectionStr === "register"
      ? <RegisterForm
        configModal={configModal}
        setLoading={setLoading}
        credentials={credentials} setCredentials={setCredentials}
        cancel={cancel} setCancel={setCancel}
        currentUser={currentUser} setCurrentUser={setCurrentUser}
      />
      : <LoginForm
        configModal={configModal}
        setLoading={setLoading}
        credentials={credentials} setCredentials={setCredentials}
        cancel={cancel} setCancel={setCancel}
        currentUser={currentUser} setCurrentUser={setCurrentUser}
      />
  );
}

export default AccessSection