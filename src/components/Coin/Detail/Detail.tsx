import React from "react";
import { ICoin } from "../../../services/coins";
import CurrencyModifier from "../../CurrencyModifier/CurrencyModifier";

interface IDetail {
  coin: ICoin,
  setOperate: React.Dispatch<React.SetStateAction<string>>,
  currencyConversion: {
    currency: string,
    price: number,
    digits: number
  },
  userBalance: {
    token: string,
    balance: number
  }
}

const Detail: React.FC<IDetail> = ({ coin, setOperate, currencyConversion: { currency, price, digits }, userBalance }) => {

  return (
    currency === undefined
      ? <></>
      : <>
        <div className="coinDetails">

          <div className='coinDetails--main'>
            <img className='coinDetails--image' src={coin.image} alt={coin.name} /> <h3>{coin.token}</h3>
            <span>Tu saldo <strong> {userBalance.balance === -1 ? 0 : userBalance.balance} {coin.token}</strong></span>
            <span className='coinDetails--main--userBalance'>
              {
                coin.token === currency ? null : `${currency} ${(userBalance.balance === -1 ? 0 : userBalance.balance * coin.sell * price).toFixed(digits)}`
              }
            </span>
          </div>

          <CurrencyModifier />

          <div className='coinDetails--mid'>
            <div>
              <h4> Variacion</h4>

              <div className="varianceTable table">
                <div className="table__headers">
                  <strong>15m</strong>
                  <strong>24h</strong>
                  <strong>30d</strong>
                  <strong>360d</strong>
                </div>
                <div className="table__body">
                  <span>-1.23%</span>
                  <span>-5.11%</span>
                  <span>+7.03%</span>
                  <span>+2322%</span>
                </div>
              </div>

            </div>

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
              <button onClick={() => setOperate('BUY')}>Compra</button>
              <button onClick={() => setOperate('SELL')}>Venta</button>
            </div>
          </div>
        </div>


      </>
  )
}

export default Detail