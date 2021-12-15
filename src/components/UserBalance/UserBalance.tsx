import React from "react"
import TokenBalance from "./TokenBalance/TokenBalance"
import UserBalanceStyled from "./UserBalanceStyled"

interface IBalance {
  token: string,
  balance: number,
}

interface ITokenBalance {
  userBalance: IBalance[]
  currency: string,
  price: number
}


const UserBalance: React.FC<ITokenBalance> = ({ userBalance, currency, price }) => {
  return <UserBalanceStyled className="userBalances">

    {
      userBalance.length
        ? <>
          {/* {currency && <>{currency} {price}</>} */}
          {userBalance.map((ub: IBalance) => (
            <TokenBalance
              key={'ub' + ub.token}
              token={ub.token}
              balance={ub.balance}
            />
          ))}
        </>
        : null
    }
  </UserBalanceStyled>
}

export default UserBalance