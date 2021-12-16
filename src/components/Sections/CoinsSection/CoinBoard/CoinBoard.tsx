import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../../contexts/UserContext";
import { Window } from "../../../../contexts/WindowContext";
import { ICoin } from '../../../../services/coins'
import Loading from "../../../Loading/Loading";

import { current } from '../../../../db/tempCoin.json'

interface ICoinBoard {
  shownCoin: ICoin
}

const CoinBoard: React.FC<ICoinBoard> = ({ shownCoin }) => {
  const { loading, setLoading } = useContext(Window)
  const { displayCurrency } = useContext(User)

  const coinDetails = {
    ...shownCoin,
    image: current.find(x => x.token === shownCoin.token ?? ' ')?.image || '',
    sell: shownCoin.buy * 0.9
  }

  useEffect(() => {
    displayCurrency === undefined
      ? setLoading(true)
      : setLoading(false)
  }, [displayCurrency, setLoading])

  return (
    loading || displayCurrency === undefined
      ? <Loading active />
      : <>
        <Link
          className='coin'
          to={`/cripto/${coinDetails.token}`
          }>
          <fieldset>
            <legend> {coinDetails.name} - {coinDetails.token}</legend>


            <div className="priceContainer">

              <img src={coinDetails.image} alt={coinDetails.name} />

              <div className='operatePrices'>
                <div>  <span> Buy  </span><span className='price'>{displayCurrency.currency === coinDetails.token ? "-" : (coinDetails.buy * displayCurrency.price).toFixed(2)} </span> <span className='price'>{displayCurrency.currency} </span> </div>
                <div>  <span> Sell </span><span className='price'>{displayCurrency.currency === coinDetails.token ? "-" : (coinDetails.sell * displayCurrency.price).toFixed(2)}</span> <span className='price'>{displayCurrency.currency} </span> </div>
              </div>
            </div>
          </fieldset>
        </Link >
      </>
  )
}

export default CoinBoard