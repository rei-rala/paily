import React, { useContext, useEffect, useState } from "react"
import { Window } from "../../contexts/WindowContext"
import LoadingStyled from "./LoadingStyled"
const LoadingSvg = require('./Double Ring-5.3s-400px.svg')


const Loading = () => {
  const { loading } = useContext(Window)

  const [Wait, sWait] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      sWait(false)
    }, 500);
  }, [])


  return (
    loading || Wait
      ? <LoadingStyled className="loadingContainer">
        <img className='loadingImg' src={LoadingSvg} alt="Cargando..." title='Aguarde un momento' />
      </LoadingStyled>
      : <></>
  )
}

export default Loading