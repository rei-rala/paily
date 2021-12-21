import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useParams, Navigate } from "react-router";
import { User } from "../../../../contexts/UserContext";

import { ICoin, ICoinData } from "../../../../services/coins";
import { API_BASEURL } from "../../../../services";

import Section from "../../Section";
import CoinStyled from "./CoinStyled";
import Detail from "./Detail/Detail";
import Operate from "./Operate/Operate";

// temporal
import { current } from "../../../../db/tempCoin.json";
import io from "socket.io-client";
import Loading from "../../../Loading/Loading";
import { IBalance } from "../../../../services/user";
import CurrencyModifier from "../../../CurrencyModifier/CurrencyModifier";

let socket: any;
let timedOut = false;

export const operations = {
  DETAIL: "DETAIL",
  BUY: "BUY",
  SELL: "SELL",
};

const Coin = () => {
  const { currentUser, displayCurrency } = useContext(User);
  const { coinToken } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [userOperation, setUserOperation] = useState(operations.DETAIL);

  const [currentCoinDetails, setCurrentCoinDetails] = useState<ICoin>({
    name: "",
    token: "",
    image: "",
    buy: 0,
    sell: 0,
    change24h: 0,
    lastUpdated: 0,
  });

  const [currentUserBalance, setCurrentUserBalance] = useState({
    token: "",
    balance: 0,
  });

  useEffect(() => {
    socket = io(API_BASEURL);

    socket.on("criptoPrices", (newCoinsData: ICoinData) => {
      const foundCoin = newCoinsData?.details?.find(
        (coin) => coin.token === coinToken
      );
      const coinFull = foundCoin && {
        ...foundCoin,
        image: current.find((coin) => coin.token === coinToken)?.image || "",
        sell: foundCoin.buy * 0.95,
      };
      coinFull && setCurrentCoinDetails(coinFull);
    });
    return () => {
      socket.disconnect();
    };
  }, [coinToken]);

  useEffect(() => {
    new Promise((res, rej) => {
      const balances = currentUser?.balances?.find(
        (balance: IBalance) => balance.token === currentCoinDetails.token
      );

      !!balances
        ? res(balances)
        : timedOut && rej("No se encontro el balance")
    })
      .then((balances: any) => {
        setCurrentUserBalance(balances);
      })
      .catch(() => {
        setError(true);
        setLoaded(true);
      });
  }, [currentUser, currentCoinDetails]);

  useLayoutEffect(() => {
    currentUserBalance.token !== "" &&
      currentCoinDetails.name !== "" &&
      setLoaded(true);
  }, [currentUserBalance, currentCoinDetails]);

  return !loaded ? (
    <Loading />
  ) : error ? (
    <Navigate replace to="/404" />
  ) : (
    <Section title={currentCoinDetails.name}>
      <CurrencyModifier />

      <div className="sep">
        <hr />
      </div>

      <CoinStyled>
        {userOperation === operations.DETAIL ? (
          <Detail
            userBalance={currentUserBalance}
            coin={currentCoinDetails}
            setOperate={setUserOperation}
            currencyConversion={displayCurrency}
          />
        ) : (
          <Operate
            userBalance={currentUserBalance}
            operation={userOperation}
            setOperate={setUserOperation}
            currencyConversion={displayCurrency}
          />
        )}
      </CoinStyled>
    </Section>
  );
};

export default Coin;
