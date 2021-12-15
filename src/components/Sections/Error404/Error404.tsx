import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import Section from "../Section";



const Error404 = () => {
  const navigate = useNavigate()

  return <Section title={'Error 404'}>

    <div className="pageBody">
      <FontAwesomeIcon icon={faExclamationCircle} className='imgError' />
      <p>No se ha encontrado la pagina solicitada</p>
    </div>

    <div className="navigationBtns">
      <button onClick={() => navigate(-1)}>Atras</button>
      <Link to='/'><button>Home</button></Link>
    </div>

  </Section>
}

export default Error404