import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../../contexts/UserContext";
import { Window } from "../../../../contexts/WindowContext";
import { ICoin } from '../../../../services/coins'


interface ICoinBoard {
  shownCoin: ICoin
}

const CoinBoard: React.FC<ICoinBoard> = ({ shownCoin }) => {
  const { loading, setLoading } = useContext(Window)
  const { displayCurrency } = useContext(User)

  useEffect(() => {
    displayCurrency === undefined
      ? setLoading(true)
      : setLoading(false)
  }, [displayCurrency, setLoading])

  return (
    loading || displayCurrency === undefined
      ? <></>
      : <>
        <Link
          className='coin'
          to={`/cripto/${shownCoin.token}`
          }>
          <fieldset>
            <legend> {shownCoin.name} - {shownCoin.token}</legend>


            <div className="priceContainer">

              <img src={shownCoin.image} alt={shownCoin.name} />

              <div className='operatePrices'>
                <div>  <span> Buy  </span><span className='price'>{(shownCoin.buy * displayCurrency.price).toFixed(5)} </span> <span className='price'>{displayCurrency.currency} </span> </div>
                <div>  <span> Sell </span><span className='price'>{(shownCoin.sell * displayCurrency.price).toFixed(5)}</span> <span className='price'>{displayCurrency.currency} </span> </div>
              </div>
            </div>
          </fieldset>
        </Link >
      </>
  )
}

export default CoinBoard