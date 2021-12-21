import React from "react"
import { ICoinData } from "../../services/coins"
import TokenBalance from "./TokenBalance/TokenBalance"
import UserBalanceStyled from "./UserBalanceStyled"

interface IBalance {
  token: string,
  balance: number,
}

interface ITokenBalance {
  userBalance: IBalance[]
  displayCurrency: {
    currency: string,
    price: number,
    digits: number,
  }
  coinsData: {
    details: ICoinData["details"]
  }
}


const UserBalance: React.FC<ITokenBalance> = ({ userBalance, displayCurrency: { currency, price, digits }, coinsData: { details } }) => {

  return <UserBalanceStyled className="userBalances">
    {
      userBalance.length > 1
        ? userBalance?.map((ub: IBalance) => (
          <TokenBalance
            key={'ub' + ub.token}
            token={ub.token}
            balance={ub.balance}
          />
        ))
        : null
    }
  </UserBalanceStyled >
}

export default UserBalance