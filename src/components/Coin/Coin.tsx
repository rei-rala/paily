import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { Window } from "../../contexts/WindowContext";
import { User } from "../../contexts/UserContext";

import { ICoin, getCriptoByToken } from "../../services/coins";

import Section from "../Sections/Section";
import Detail from "./Detail/Detail";
import Operate from "./Operate/Operate";

import CoinStyled from "./CoinStyled";

import { current } from '../../db/tempCoin.json'

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
    price: -1,
    digits: 2
  })

  const [currentUserBalance, setCurrentUserBalance] = useState({
    token: '?',
    balance: -1
  })

  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [userOperation, setUserOperation] = useState('')
  const [cancel, setCancel] = useState(false)

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
        if ((!!coinToken || !!tokenName || tokenName === '') && !cancel) {
          getCriptoByToken(tokenName, signal)
            .then(({ data }) => {
              console.log(data)
              if (data) {
                setCurrentCoinDetails({
                  ...data,
                  sell: data.buy * 0.925 ?? 0,
                  image: current.find(x => x.token === data.token ?? '')?.image || '',
                })
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
      }).catch(x => x)

      const awaitCurrencyDisplay = new Promise((resolve) => {
        if (currentDisplayCurrency.currency !== '?' && currentDisplayCurrency.price > 0) { resolve(true) }
      })


      console.log({ awaitTokenData, awaitUserData, awaitCurrencyDisplay })

      const promises = [awaitTokenData, /* awaitUserData, */ awaitCurrencyDisplay]
      Promise.all(promises)
        .catch((v) => {
          setError(true)
          console.log(v)
        })
        .then(() => setLoaded(true))
        .finally(() => setLoading(false))
    }

    return () => {
      try {
        cancel && controller.abort()
      } catch (err) {
        console.warn('Coin', err)
      } finally {
        if (timeout !== undefined) { clearTimeout(timeout) }
        setLoading(false)
      }
      setCancel(true)
    }
  }, [coinToken, currentUser, currentCoinDetails, currentDisplayCurrency, loaded, cancel, setLoading])

  return (
    loading || !loaded
      ? <></>
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