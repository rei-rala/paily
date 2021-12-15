import React, { useContext } from "react";
import { Window } from "../../../contexts/WindowContext";
import { Link } from "react-router-dom";

const Brand = () => {
  const { currentPath } = useContext(Window)
  return (
    <span className="headerTitle">
      {
        ['/', '/login', '/main'].some(path => path === currentPath)
          ? "paily"
          : <Link to='/main'> paily </Link>
      }
    </span>
  )
}

export default Brand