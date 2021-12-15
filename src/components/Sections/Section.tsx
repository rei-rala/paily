import React, { /* useCallback, */ useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";

import { SectionStyled } from "./SectionStyled";
import { Window } from "../../contexts/WindowContext";
import { User } from "../../contexts/UserContext";

interface ISection {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  props?: any;
}

const Section: React.FC<ISection> = ({ children, className, title }, props) => {
  const { currentPath, scrolled, loading } = useContext(Window)
  const { currentUser, scrollToTop } = useContext(User)

  const [hideGoBack, setHideGoBack] = useState(false)

  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  useEffect(() => {
    const lastPath = localStorage.getItem('lastPath')
    setHideGoBack(
      (lastPath !== '/login' && lastPath !== '/register')
      || ['/', '/404', '/login'].some(path => path === currentPath)
    )
  }, [currentPath])

  return (
    loading === undefined || currentUser === undefined
      ? <></>
      : (currentUser === null || currentUser === false) && ['/login', '/register', '/404'].every(path => path !== currentPath)
        ? <Navigate to='/login' replace />
        : <SectionStyled className={`section ${className ?? ''}`
        } {...props}>

          {
            hideGoBack
              ? null
              : <div className="mainBackBtn" title='Click para volver atras' onClick={goBack}><FontAwesomeIcon icon={faArrowLeft} /></div>
          }

          {
            title && <>
              <div className="sep">
                <hr />
              </div>
              <h1>{title}</h1>
              <div className="sep">
                <hr />
              </div>
            </>
          }
          {children}

          <div
            className={`backToTopBtn ${scrolled ? '' : 'notVisible'}`}
            title='Click para ir arriba'
            onClick={scrollToTop}
          >
            <FontAwesomeIcon icon={faArrowCircleUp} className='toTopIcon' />
          </div>

          <div className="sep">
            <hr />
          </div>
        </SectionStyled >
  );
}

export default Section;