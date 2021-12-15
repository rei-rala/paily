import React, { createContext, useState, useEffect, useContext } from "react";
import { Window } from "./WindowContext";

export const User = createContext();

const currencies = [
  {
    currency: 'USDT',
    price: 1
  },
  {
    currency: 'ARS',
    price: 205
  }
]

export const UserContext = ({ children }) => {
  const { scrollTop, /* currentPath */ } = useContext(Window)

  const [currentUser, setCurrentUser] = useState(null)

  const [darkTheme, setDarkTheme] = useState(false)
  const [animations, setAnimations] = useState(false)

  const [displayCurrency, setDisplayCurrency] = useState(currencies.USDT)

  const logOut = async () => setCurrentUser(false)

  const scrollToTop = () => {
    animations !== true
      ? scrollTop('auto')
      : scrollTop('smooth')
  }

  const changeDisplayCurrency = (newCurrency) => {
    localStorage.setItem('displayCurrency', newCurrency.currency)
    setDisplayCurrency(newCurrency)
  }

  useEffect(() => {
    const currencyLocal = new Promise((res, rej) => {
      const currency = localStorage.getItem('displayCurrency')
      const search = currencies.find((c) => c.currency === currency)

      if (!!currency && !!search) {
        res(search)
      } else {
        rej('No currency found')
      }
    })
      .then(newCurrency => {
        setDisplayCurrency(newCurrency)
      })
      .catch(() => {
        localStorage.setItem('displayCurrency', 'USDT')
        setDisplayCurrency(currencies.USDT)
      })

    const darkThemeLocal = new Promise((res, rej) => {
      const localDarkSetting = JSON.parse(localStorage.getItem('darkTheme'))
      localDarkSetting === true || localDarkSetting === false
        ? res(localDarkSetting)
        : rej('Dark theme desactivado o no valido')
    })
      .then(setDarkTheme)
      .catch(() => localStorage.setItem('darkTheme', false))


    const noAnimationsLocal = new Promise((res, rej) => {
      const localNoAnimSetting = JSON.parse(localStorage.getItem('noAnimations'))
      localNoAnimSetting === true || localNoAnimSetting === false
        ? res(localNoAnimSetting)
        : rej('No animations desactivado o no valido')
    })
      .then(setAnimations)
      .catch(() => localStorage.setItem('noAnimations', false))

    Promise.all([currencyLocal, darkThemeLocal, noAnimationsLocal])
      .then(() => console.log('Obtenidas preferencias desde localStorage'))

  }, [])

  useEffect(() => {
    darkTheme !== undefined && localStorage.setItem('darkTheme', darkTheme)
  }, [darkTheme])

  useEffect(() => {
    animations !== undefined && localStorage.setItem('noAnimations', animations)
  }, [animations])


  return (
    <User.Provider
      value={{
        currentUser, setCurrentUser, logOut,
        displayCurrency, changeDisplayCurrency,
        darkTheme, setDarkTheme,
        animations, setAnimations, scrollToTop
      }}
    >
      {children}
    </User.Provider>
  );
};
