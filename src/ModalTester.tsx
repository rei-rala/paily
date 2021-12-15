import React, { useContext, useState } from "react";
import { Modal } from "./contexts/ModalContext";

const ModalTester = () => {
  const { isOpen, configModal } = useContext(Modal)

  const [valueA, setValueA] = useState('')
  const [valueB, setValueB] = useState('')


  return <form
    onSubmit={e => e.preventDefault()}
    style={{ margin:'auto',display: 'flex', flexDirection: 'column', alignItems:'center', maxWidth: '20rem' }}
  >
    <input type="text" placeholder='Titulo' onChange={ev => setValueA(ev.target.value)} />
    <input type="text" placeholder='Texto' onChange={ev => setValueB(ev.target.value)} />
    <input type="text" placeholder='Funcion' disabled />


    <button
      disabled={isOpen}
      onClick={
        isOpen
          ? void 0
          : () => configModal(
            valueA,
            valueB
          )}>
      Probar Modal
    </button >
  </form>
}

export default ModalTester