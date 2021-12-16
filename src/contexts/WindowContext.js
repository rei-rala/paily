import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router";

export const Window = createContext();

export const WindowContext = (props) => {
  const location = useLocation().pathname

  const [scrolled, setScrolled] = useState(false)
  const [currentPath, setCurrentPath] = useState(location)
  const [loading, setLoading] = useState(false)

  const working = () => setLoading(true)
  const finishWorking = () => setLoading(false)

  const scrollTop = (behavior) => window.scrollTo({ top: 0, behavior });


  useEffect(() => {
    sessionStorage.setItem('currentPath', location)
    setCurrentPath(location)
    scrollTop()

    return () => sessionStorage.setItem('lastPath', location)
  }, [location])

  useEffect(() => {
    const checkAndSetScrolled = () => {
      const scrolledEnough = (window.scrollY / document.body.clientHeight) > 0.2
      setScrolled(scrolledEnough)
    }

    window.addEventListener('scroll', checkAndSetScrolled)
    return () => window.removeEventListener('scroll', checkAndSetScrolled)
  }, [])

  return (
    <Window.Provider
      value={{
        scrolled,
        scrollTop,
        currentPath,
        loading, setLoading, working, finishWorking
      }}
    >
      {props.children}
    </Window.Provider>
  );
};
