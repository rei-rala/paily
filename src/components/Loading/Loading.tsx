import React, { useContext } from "react"
import { Window } from "../../contexts/WindowContext"
import LoadingStyled from "./LoadingStyled"
const LoadingSvg = require('./Double Ring-5.3s-400px.svg')


const Loading: React.FC<{ active?: boolean }> = () => {
  const { loading } = useContext(Window)

  return (
    loading
      ? <LoadingStyled className="loadingContainer">
        <img className='loadingImg' src={LoadingSvg} alt="Cargando..." title='Aguarde un momento' />
      </LoadingStyled>
      : null
  )
}

export default Loading