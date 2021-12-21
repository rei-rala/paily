import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import { Modal } from "../../../../../contexts/ModalContext";
import { getCriptoByToken } from "../../../../../services/coins";
import { operations } from "../Coin";


interface IOperate {
  operation: string | null | undefined,
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

const Operate: React.FC<IOperate> = ({ operation, setOperate, currencyConversion, userBalance }) => {
  const { coinToken } = useParams()
  const { configModal } = useContext(Modal)

  const [validOperation, setValidOperation] = useState(true)

  const [coinDetails, setCoinDetails] = useState({
    name: '',
    token: '',
    image: '',
    buy: 0,
    sell: 0
  })

  useEffect(() => {
    const tokenName = typeof coinToken === 'string' && (coinToken).toUpperCase()
    if (!!coinToken && !!tokenName) {
      getCriptoByToken(tokenName)
        .then(setCoinDetails)
        .catch(() => setValidOperation(false))
    }
  }, [coinToken])



  return operation && ['BUY', 'SELL'].includes(operation) && validOperation

    ? <>

      <span> Compra {coinDetails.buy} | Venta {coinDetails.sell} </span>

      <div className="btnSection">
        <button
          onClick={
            coinDetails.buy === 0 || coinDetails.sell === 0
              ? () => null
              : () => configModal(
                operation === 'BUY' ? 'Comprar ' : 'Vender ' + coinDetails.token,
                <span> {operation === 'BUY' ? 'Comprar' : 'Vender'} XXXX <img src={coinDetails.image} alt={coinDetails.name}></img><strong>{coinDetails.name}</strong> por {currencyConversion.price} {currencyConversion.currency}? </span>,
                () => window.alert(`Confirmada ${operation === 'BUY' ? 'Compra' : 'Venta'} de ${coinDetails.token}`),
                'Confirmar'
              )
          }
        >
          {operation === operations.BUY ? 'Comprar' : 'Vender'}
        </button>
        <button onClick={() => setOperate(operations.DETAIL)}>Atras</button>
      </div>
    </>
    : <Navigate to='/404' />
}

export default Operate