import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../../contexts/UserContext";
import { ICoin } from '../../../../services/coins'

import { current } from '../../../../db/tempCoin.json'
import Loading from "../../../Loading/Loading";

interface ICoinBoard {
  shownCoin: ICoin
}

const CoinBoard: React.FC<ICoinBoard> = ({ shownCoin }) => {
  const { displayCurrency: { currency, price, digits } } = useContext(User)

  const coinDetails = {
    ...shownCoin,
    sell: shownCoin.buy * 0.95 ?? 0,
    image: current.find(x => x.token === shownCoin.token ?? ' ')?.image || ''
  }


  return (
    currency === undefined
      ? <Loading />
      : <>
        <Link
          className='coin'
          to={`/cripto/${coinDetails.token}`}
        >
          <fieldset>
            <legend> {coinDetails.name} - {coinDetails.token}</legend>

            <div className="priceContainer">

              <img src={coinDetails.image} alt={coinDetails.name} />

              <div className='operatePrices'>
                <div>  <span> Buy  </span><span className='price'>{currency === coinDetails.token ? "-" : (coinDetails.buy * price).toFixed(digits)} </span> <span className='price'>{currency} </span> </div>
                <div>  <span> Sell </span><span className='price'>{currency === coinDetails.token ? "-" : (coinDetails.sell * price).toFixed(digits)}</span> <span className='price'>{currency} </span> </div>
              </div>
            </div>
          </fieldset>
        </Link >
      </>
  )
}

export default CoinBoard