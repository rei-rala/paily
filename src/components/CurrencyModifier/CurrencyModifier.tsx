import React from "react";
import CurrencyModBtn from "./CurrencyModBtn/CurrencyModBtn";

import CurrencyModifierStyled from "./CurrencyModifierStyled";

const USD = {
  currency: 'USD',
  price: 1,
  digits: 2
}
const ARS = {
  currency: 'ARS',
  price: 205,
  digits: 2
}

const BTC = {
  currency: 'BTC',
  price: USD.price / 50985.09,
  digits: 5
}

const ETH = {
  currency: 'ETH',
  price: USD.price / 4362.26464,
  digits: 5
}


const CurrencyModifier = () => {


  return <CurrencyModifierStyled className="priceDisplay">
    <em> Mostrar valores en </em>
    <div className="priceDisplay__btns">
      <CurrencyModBtn currency={ARS} />
      <CurrencyModBtn currency={USD} />
      <CurrencyModBtn currency={BTC} />
      <CurrencyModBtn currency={ETH} />
    </div>
  </CurrencyModifierStyled>
}


export default CurrencyModifier
