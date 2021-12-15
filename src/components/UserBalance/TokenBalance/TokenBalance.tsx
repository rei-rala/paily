import React from "react";

interface ITokenBalance {
  token: string,
  balance: number
}

const TokenBalance: React.FC<ITokenBalance> = ({ token, balance }) => {
  return <div>
    <span>{token}</span> <span>{balance}</span>
  </div>
}

export default TokenBalance