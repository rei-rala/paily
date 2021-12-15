import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { User } from "../../../contexts/UserContext";


interface ICurrencyModBtn {
  currency: {
    currency: string,
    price: number
  }
}

const CurrencyModBtn: React.FC<ICurrencyModBtn> = ({ currency }) => {
  const { displayCurrency, changeDisplayCurrency } = useContext(User)

  const ref = useRef<HTMLButtonElement>(null)
  const [disabled, setDisabled] = useState(false)

  useLayoutEffect(() => {
    displayCurrency !== undefined && setDisabled(ref?.current?.textContent === displayCurrency.currency)
  }, [ref, displayCurrency])

  return (
    displayCurrency !== undefined
      ? <button onClick={() => changeDisplayCurrency(currency)} disabled={disabled} ref={ref} >
        {currency.currency}
      </button >
      : <></>
  )
}


export default CurrencyModBtn