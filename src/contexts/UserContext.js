import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { URL_USERS, API_BASEURL } from '../services/urls'

import { Window } from "./WindowContext";

export const User = createContext();

const currencies = [
  {
    currency: 'USD',
    price: 1,
    digits: 2
  },
  {
    currency: 'ARS',
    price: 205,
    digits: 2
  }
]

export const UserContext = ({ children }) => {
  const { scrollTop } = useContext(Window)

  const [currentUser, setCurrentUser] = useState(null)
  const notLoggedIn = currentUser === null || currentUser === undefined
  const [retrievingUser, setRetrievingUser] = useState(true)

  const [darkTheme, setDarkTheme] = useState(false)
  const [animations, setAnimations] = useState(false)

  const [displayCurrency, setDisplayCurrency] = useState(currencies.USD)

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
    const sessionAbortController = new AbortController()

    if (notLoggedIn) {
      setRetrievingUser(true)

      axios.get(URL_USERS, {
        signal: sessionAbortController.signal,
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": API_BASEURL,
          "Access-Control-Allow-Credentials": "true",
        }
      })
        .then((user) => {
          if (user) {
            setCurrentUser(user.data);
            setRetrievingUser(false)
          }
        })
        .catch(err => { console.info('No se recupero sesion'); setRetrievingUser(false) })
    }

    return () => {
      sessionAbortController.abort()
    }
  }, [notLoggedIn, setCurrentUser, setRetrievingUser])

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
        localStorage.setItem('displayCurrency', 'USD')
        setDisplayCurrency(currencies.USD)
      })

    const darkThemeLocal = new Promise((res, rej) => {
      const localDarkSetting = JSON.parse(localStorage.getItem('darkTheme'))
      localDarkSetting === true || localDarkSetting === false
        ? res(localDarkSetting)
        : rej('Dark theme no valido')
    })
      .then(setDarkTheme)
      .catch(() => localStorage.setItem('darkTheme', false))


    const noAnimationsLocal = new Promise((res, rej) => {
      const localNoAnimSetting = JSON.parse(localStorage.getItem('noAnimations'))
      localNoAnimSetting === true || localNoAnimSetting === false
        ? res(localNoAnimSetting)
        : rej('No animations no valido')
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
        animations, setAnimations, scrollToTop,
        retrievingUser, setRetrievingUser
      }}
    >
      {children}
    </User.Provider>
  );
};
