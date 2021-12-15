import React, { useContext } from "react";
import { Modal as ModalData } from "../../contexts/ModalContext"
import ModalStyled from "./ModalStyled";

const Modal: React.FC = () => {
  const { children, title, action, customAccept, isOpen, setIsOpen } = useContext(ModalData);

  return (
    isOpen === false || isOpen === undefined
      ? null
      : <ModalStyled
        onClick={() => setIsOpen(false)}
      >
        <div className={`modal ${isOpen ? 'open' : 'off'}`} onClick={e => e.stopPropagation()}>
          <fieldset>
            {title && title !== '' && <legend> {title} </legend>}

            {
              children && <div className="modal__content"
              >
                {children}
              </div>
            }

            <div className='modal__buttons'>
              {
                action
                  ? <button onClick={() => action()}>{customAccept ? customAccept : 'Aceptar'}</button>
                  : null
              }
              <button onClick={() => setIsOpen(!isOpen)}>Salir</button>
            </div>
          </fieldset>
        </div>
      </ModalStyled>
  )
}

export default Modal