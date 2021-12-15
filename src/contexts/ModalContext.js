import React, { createContext, useState } from "react";

export const Modal = createContext();

export const ModalContext = (props) => {
  const [isOpen, setIsOpen] = useState(() => { });

  const [children, setChildren] = useState(<></>);
  const [title, setTitle] = useState("");
  const [action, setAction] = useState(() => setIsOpen(false));
  const [customAccept, setCustomAccept] = useState(null)

  const configModal = (configTitle, configChildren, configAction, customAcceptBtn) => {

    if (!isOpen) {
      configTitle ? setTitle(configTitle) : setTitle(undefined)
      configChildren ? setChildren(configChildren) : setChildren(undefined)
      configAction ? setAction(() => configAction) : setAction(undefined)
      action !== undefined && customAcceptBtn ? setCustomAccept(customAcceptBtn) : setCustomAccept('Aceptar')

      if (configTitle === undefined && configChildren === undefined) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }
  }

  return (
    <Modal.Provider
      value={{
        configModal,
        children, setChildren,
        title, setTitle,
        customAccept, setCustomAccept,
        action, setAction,
        isOpen, setIsOpen,
      }}
    >
      {props.children}
    </Modal.Provider>
  );
};
