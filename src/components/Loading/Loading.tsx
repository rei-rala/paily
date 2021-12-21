import React from "react"
import LoadingStyled from "./LoadingStyled"
const LoadingSvg = require('./Double Ring-5.3s-400px.svg')


const Loading: React.FC<{ active?: boolean }> = () => {

  return (
    <LoadingStyled className="loadingContainer">
      <img className='loadingImg' src={LoadingSvg} alt="Cargando..." title='Aguarde un momento' />
    </LoadingStyled>
  )
}

export default Loading