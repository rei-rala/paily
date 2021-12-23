import React from "react";
import { ICoin } from "../../../../../services/coins";
import { operations } from "../Coin";
import { formatDateFromNow } from "../../../../../utils";

interface IDetail {
  coin: ICoin,
  setOperate: React.Dispatch<React.SetStateAction<string>>,
  currencyConversion: {
    currency: string,
    price: number,
    digits: number
  },
  userBalance?: {
    token: string,
    balance: number
  }
}

const Detail: React.FC<IDetail> = ({ coin, setOperate, currencyConversion: { currency, price, digits }, userBalance }) => {
  return (
    <div className="coinDetails">

      <div className='coinDetails--main'>
        <img className='coinDetails--image' src={coin.image} alt={coin.name} /> <h3>{coin.token}</h3>
        {
          userBalance !== undefined
            ? <span>Tu saldo <strong> {userBalance.balance === -1 ? 0 : userBalance.balance} {coin.token}</strong></span>
            : <i className="balanceLoading">
              Cargando tus saldos <span>.</span><span>.</span><span>.</span>
            </i>
        }
        <span className='coinDetails--main--userBalance'>
          {
            userBalance !== undefined && coin.token !== currency
              ? `${currency} ${(userBalance.balance === -1 ? 0 : userBalance.balance * coin.sell * price).toFixed(digits)}`
              : null
          }
        </span>
        <div>
          <span>Variacion 24h: <b>{coin.change24h > 0 && '+'}{coin.change24h.toFixed(2)}%</b> </span>
          <span>Ultima actualizacion: <b>{coin.lastUpdated && formatDateFromNow(coin.lastUpdated, true)}</b></span>
        </div>
      </div>


      <div className='coinDetails--mid'>

        <div className='coinDetails--prices'>
          {
            coin.token === currency
              ? <></>
              : <>
                <span>  Buy <strong className='price'> {(price * coin.buy).toFixed(digits)} </strong>{currency}</span>
                <span> Sell <strong className='price'> {(price * coin.sell).toFixed(digits)} </strong>{currency}</span>
              </>
          }
        </div>

        <div className='coinDetails--operateBtns price'>
          <button onClick={() => setOperate(operations.BUY)}>Compra</button>
          <button onClick={() => setOperate(operations.SELL)}>Venta</button>
        </div>
      </div>
    </div>
  )
}

export default Detail