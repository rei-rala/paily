import React, { useContext } from "react";
import { User } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

const AnimationsToggler = () => {
  const { animations, setAnimations } = useContext(User)
  return (
    <button onClick={() => setAnimations(!animations)}>
      Animations {
        animations === undefined || animations === true
          ? <FontAwesomeIcon className='on' icon={faToggleOn} />
          : <FontAwesomeIcon className='off' icon={faToggleOff} />
      }
    </button>
  )
}

export default AnimationsToggler