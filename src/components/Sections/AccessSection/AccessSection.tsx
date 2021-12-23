import React, { useContext, useState } from "react";

import RegisterForm from "./RegisterForm/RegisterForm";
import LoginForm from "./LogInForm/LogInForm";
import { User } from "../../../contexts/UserContext";
import { Modal } from "../../../contexts/ModalContext";

export interface IAccessForm {
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

  return (
    sectionStr === "register"
      ? <RegisterForm
        configModal={configModal}
        credentials={credentials} setCredentials={setCredentials}
        currentUser={currentUser} setCurrentUser={setCurrentUser}
      />
      : <LoginForm
        configModal={configModal}
        credentials={credentials} setCredentials={setCredentials}
        currentUser={currentUser} setCurrentUser={setCurrentUser}
      />
  );
}

export default AccessSection