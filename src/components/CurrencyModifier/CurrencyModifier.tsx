import React from "react";
import CurrencyModBtn from "./CurrencyModBtn/CurrencyModBtn";

import CurrencyModifierStyled from "./CurrencyModifierStyled";

const USDT = {
  currency: 'USDT',
  price: 1
}
const ARS = {
  currency: 'ARS',
  price: 205
}

const BTC = {
  currency: 'BTC',
  price: USDT.price / 50985.09
}

const ETH = {
  currency: 'ETH',
  price: USDT.price / 4362.26464
}


const CurrencyModifier = () => {


  return <CurrencyModifierStyled className="priceDisplay">
    <em> Mostrar valores en </em>
    <div className="priceDisplay__btns">
      <CurrencyModBtn currency={ARS} />
      <CurrencyModBtn currency={USDT} />
      <CurrencyModBtn currency={BTC} />
      <CurrencyModBtn currency={ETH} />
    </div>
  </CurrencyModifierStyled>
}


export default CurrencyModifier
