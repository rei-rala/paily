import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getTokenList, ICoin } from '../../../services/coins'

import { Modal } from "../../../contexts/ModalContext";
import Section from "../Section";
import CoinBoard from "./CoinBoard/CoinBoard";

import CurrencyModifier from "../../CurrencyModifier/CurrencyModifier";
import { User } from "../../../contexts/UserContext";
import UserBalance from "../../UserBalance/UserBalance";
import { Window } from "../../../contexts/WindowContext";

interface IBalance {
  token: string,
  balance: number,
}

const CoinsSection: React.FC = () => {
  const { configModal } = useContext(Modal)
  const { currentUser, displayCurrency } = useContext(User)
  const { setLoading } = useContext(Window)

  const navigate = useNavigate()
  const refreshPage = () => navigate(0)

  const [coinsData, setCoinsData] = useState<ICoin[]>([])

  useEffect(() => {
    setLoading(true)
    const controller = new AbortController()
    const signal = controller.signal

    getTokenList(signal)
      .then((res: ICoin[]) => {
        console.log(res)
        setCoinsData(res)
      })
      .catch((err: any) => { })
      .finally(() => setLoading(false))

    return () => {
      try {
        controller.abort()
      } catch (err) {
        console.log('Coin Section', err)
      } finally {
        setLoading(false)
      }
    }
  }, [setLoading])


  return (
    <Section
      title='Cripto'
    >
      <div className='coin__container'>
        {
          coinsData?.length > 0
            ? <>
              {
                displayCurrency?.price !== undefined && displayCurrency?.price > 0 && currentUser?.balances?.length > 0 && <>
                  <div className="resume">

                    <h5>Tus saldos</h5>
                    {
                      currentUser.balances.length > 1
                        ? <span>
                          {
                            (currentUser.balances.reduce((prev: number, curr: IBalance) => prev + (curr.balance * (coinsData.find((x) => x.token === curr.token)?.sell || 1) * (displayCurrency.price)), 0)).toFixed(5)
                          }
                          {' '}
                          {displayCurrency.currency}
                        </span>
                        : null
                    }
                  </div>

                  <UserBalance userBalance={currentUser.balances} currency={displayCurrency.currency} price={displayCurrency.price} />
                </>
              }
              <CurrencyModifier />
              {coinsData.map((coin: ICoin) => <CoinBoard key={coin.token} shownCoin={coin} />)}

              <div className="btnSection">
                <button onClick={() =>
                  configModal(
                    'Como operar',
                    'Querido, cliquea una moneda y elige tu opcion'
                  )
                }>How to buy or sell?</button>
              </div>
            </>
            : <>
              <strong>Se produjo un error. Comprueba tu conexion a internet.</strong>
              <div className="navigationBtns">
                <button onClick={refreshPage}>Reintentar</button>
                <Link to='/'><button>Home</button></Link>
              </div>
            </>
        }
      </div>
    </ Section >
  )
}

export default CoinsSection;