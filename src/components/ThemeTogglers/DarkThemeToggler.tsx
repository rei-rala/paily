import React, { useContext } from "react";
import { User } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

const DarkThemeToggler = () => {
  const { darkTheme, setDarkTheme } = useContext(User)
  return (
    <button
      onClick={() => { setDarkTheme(!darkTheme) }}
    >
      Dark Theme {
        darkTheme === undefined || darkTheme === true
          ? <FontAwesomeIcon className='on' icon={faToggleOn} color='green' fill='green' />
          : <FontAwesomeIcon className='off' icon={faToggleOff} />
      }
    </button>
  )
}

export default DarkThemeToggler