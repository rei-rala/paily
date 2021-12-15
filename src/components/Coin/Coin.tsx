import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { Window } from "../../contexts/WindowContext";
import { User } from "../../contexts/UserContext";

import { ICoin, getByToken } from "../../services/coins";

import Section from "../Sections/Section";
import Detail from "./Detail/Detail";
import Operate from "./Operate/Operate";

import CoinStyled from "./CoinStyled";
import Loading from "../Loading/Loading";

const Coin = () => {
  const { currentUser, displayCurrency } = useContext(User)
  const { loading, setLoading } = useContext(Window)
  const { coinToken } = useParams()


  const [currentCoinDetails, setCurrentCoinDetails] = useState<ICoin>({
    name: `Cargando ${coinToken}`,
    token: '?',
    image: '?',
    buy: 0,
    sell: 0,
  })

  const [currentDisplayCurrency, setCurrentDisplayCurrency] = useState({
    currency: '?',
    price: -1
  })

  const [currentUserBalance, setCurrentUserBalance] = useState({
    token: '?',
    balance: -1
  })

  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [userOperation, setUserOperation] = useState('')

  useEffect(() => {
    if (displayCurrency) {
      setCurrentDisplayCurrency(displayCurrency)
    }
  }, [displayCurrency])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    let timeout: ReturnType<typeof setTimeout>

    if (!loaded) {
      setLoading(true)

      const awaitTokenData = new Promise((resolve, reject) => {
        const tokenName = typeof coinToken === 'string' ? (coinToken).toUpperCase() : ''
        if (!!coinToken || !!tokenName || tokenName === '') {
          getByToken(tokenName, signal)
            .then((x: ICoin) => {
              if (x) {
                setCurrentCoinDetails(x)
                resolve(true)
              }
              else { reject('error') }
            })
            .catch(console.warn)
        }
      })

      const awaitUserData = new Promise((resolve, reject) => {
        if (currentUser?.balances && currentCoinDetails.token !== '?') {
          const found = currentUser.balances.find((x: ICoin) => x.token === currentCoinDetails.token)
          if (found) {
            setCurrentUserBalance(found)
            resolve(true)
          } else {
            reject('Error')
          }
        }
      })

      const awaitCurrencyDisplay = new Promise((resolve) => {
        if (currentDisplayCurrency.currency !== '?' && currentDisplayCurrency.price > 0) { resolve(true) }
      })

      const slowResponse = new Promise((resolve) => {
        const time = process.env.slowed === 'true' ? 2000 : 0

        timeout = setTimeout(() => {
          resolve(true)
        }, time)
      })

      const promises = [awaitTokenData, awaitUserData, awaitCurrencyDisplay, slowResponse]

      Promise.all(promises)
        .then(() => setLoaded(true))
        .catch((v) => {
          setError(true)
        })
        .finally(() => setLoading(false))
    }

    return () => {
      try {
        controller.abort()
      } catch (err) {
        console.warn('Coin', err)
      } finally {
        if (timeout !== undefined) { clearTimeout(timeout) }
        setLoading(false)
      }
    }
  }, [coinToken, currentUser, currentCoinDetails, currentDisplayCurrency, loaded, setLoading])

  return (
    loading
      ? <Loading active />
      : error
        ? <Navigate replace to='/404' />
        : <Section
          title={currentCoinDetails.name}
        >
          <CoinStyled >
            {
              userOperation
                ? <Operate userBalance={currentUserBalance} operation={userOperation} setOperate={setUserOperation} currencyConversion={currentDisplayCurrency} />
                : <Detail userBalance={currentUserBalance} coin={currentCoinDetails} setOperate={setUserOperation} currencyConversion={currentDisplayCurrency} />
            }
          </CoinStyled>
        </ Section >
  )
}

export default Coin