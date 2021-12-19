import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ICoin } from '../../../services/coins'

import { Modal } from "../../../contexts/ModalContext";
import Section from "../Section";
import CoinBoard from "./CoinBoard/CoinBoard";

import CurrencyModifier from "../../CurrencyModifier/CurrencyModifier";
import { User } from "../../../contexts/UserContext";
import UserBalance from "../../UserBalance/UserBalance";
import { Window } from "../../../contexts/WindowContext";
import CoinSectionStyled from "./CoinsSectionStyled";


import { io } from "socket.io-client";
import { API_BASEURL } from '../../../services'
interface IBalance {
  token: string,
  balance: number,
}

interface ICoinDataSocket {
  timestamp: number,
  details: ICoin[],
}

let socket: any;


const CoinsSection: React.FC = () => {
  const { configModal } = useContext(Modal)
  const { currentUser, displayCurrency } = useContext(User)
  const { loading, setLoading } = useContext(Window)

  const navigate = useNavigate()
  const refreshPage = () => navigate(0)

  const [coinsData, setCoinsData] = useState<ICoin[]>([])

  useEffect(() => {
    coinsData.length === 0 && setLoading(true)
    coinsData.length > 0 && setLoading(false)
  }, [coinsData, setLoading])


  useEffect(() => {
    socket = io(API_BASEURL)

    socket.on('criptoPrices', (coinsData: ICoinDataSocket) => {
      setCoinsData(coinsData.details)
      console.info(coinsData)
    })
  }, [])



  return (
    loading
      ? <></>
      : <Section
        title='Cripto'
      >
        <CoinSectionStyled>
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
                              (currentUser.balances.reduce((prev: number, curr: IBalance) => prev + (curr.balance * (coinsData.find((x) => x.token === curr.token)?.sell || 1) * (displayCurrency.price)), 0)).toFixed(displayCurrency.digits)
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
        </CoinSectionStyled>
      </ Section >
  )
}

export default CoinsSection;