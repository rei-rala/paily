import React from "react";
import { ICoin } from "../../../services/coins";
import CurrencyModifier from "../../CurrencyModifier/CurrencyModifier";
import Loading from "../../Loading/Loading";


interface IDetail {
  coin: ICoin,
  setOperate: React.Dispatch<React.SetStateAction<string>>,
  currencyConversion: {
    currency: string,
    price: number
  },
  userBalance: {
    token: string,
    balance: number
  }
}

const Detail: React.FC<IDetail> = ({ coin, setOperate, currencyConversion: { currency, price }, userBalance }) => {

  return (
    currency === undefined
      ? <Loading active />
      : <>
        <div className="coinDetails">

          <div className='coinDetails--main'>
            <img className='coinDetails--image' src={coin.image} alt={coin.name} /> <h3>{coin.token}</h3>
            <strong> {userBalance.balance} {coin.token}</strong>
            <span className='coinDetails--main--userBalance'>{
              coin.token === currency
                ? null
                : `${currency} ${(userBalance.balance * coin.sell * price).toFixed(5)}`
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
                    <span>  Buy <strong className='price'> {(price * coin.buy).toFixed(5)} </strong>{currency}</span>
                    <span> Sell <strong className='price'> {(price * coin.sell).toFixed(5)} </strong>{currency}</span>
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