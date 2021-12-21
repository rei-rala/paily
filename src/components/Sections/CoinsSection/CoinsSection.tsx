import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ICoin, ICoinData } from "../../../services/coins";

import { Modal } from "../../../contexts/ModalContext";
import Section from "../Section";
import CoinBoard from "./CoinBoard/CoinBoard";

import CurrencyModifier from "../../CurrencyModifier/CurrencyModifier";
import { User } from "../../../contexts/UserContext";
import UserBalance from "../../UserBalance/UserBalance";
import CoinSectionStyled from "./CoinsSectionStyled";

import { io } from "socket.io-client";
import { API_BASEURL } from "../../../services";
import Loading from "../../Loading/Loading";

let socket: any;

const CoinsSection: React.FC = () => {
  const { configModal } = useContext(Modal);
  const { currentUser, displayCurrency } = useContext(User);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const refreshPage = () => navigate(0);

  const [coinsData, setCoinsData] = useState<ICoinData>({
    _id: "",
    timestamp: 0,
    details: [],
  });

  useEffect(() => {
    if (coinsData._id === "") {
      setLoading(true);
      socket = io(API_BASEURL);

      socket.on("criptoPrices", (newCoinsData: ICoinData) => {
        coinsData._id !== newCoinsData._id && setCoinsData(newCoinsData);
      });
    } else {
      setLoading(false);
    }
    return () => {
      socket.disconnect();
    };
  }, [coinsData._id, setLoading]);

  useEffect(() => {
    coinsData._id !== "" && coinsData.details.length === 0 && setError(true);
  }, [coinsData]);

  return currentUser === undefined || displayCurrency === undefined || loading
    ? <Loading />
    : error
      ? <>
        <strong>Se produjo un error. Comprueba tu conexion a internet.</strong>
        <div className="navigationBtns">
          <button onClick={refreshPage}>Reintentar</button>
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
      </>
      : (
        <Section title="Cripto">
          <CurrencyModifier />

          <CoinSectionStyled>

            {/* TODO
            {currentUser !== null && displayCurrency?.price > 0 && currentUser?.balances?.length > 0 && (
              <div className="resume">
                <h5>Tus saldos</h5>

                {
                  currentUser.balances.reduce(
                    (prev: number, curr: IBalance) => {
                      return prev + (displayCurrency.price * curr.balance);
                    }, 0)//.toFixed(displayCurrency.digits)
                }
                {' '}
                {displayCurrency.currency}

              </div>
            )}
            */}

            {
              currentUser !== null && <UserBalance
                userBalance={currentUser.balances}
                displayCurrency={displayCurrency}
                coinsData={coinsData}
              />
            }
            {coinsData?.details?.map((coin: ICoin) => (
              <CoinBoard key={coin.token} shownCoin={coin} />
            ))}


            <div className="btnSection">
              <button
                onClick={() =>
                  configModal(
                    "Como operar",
                    "Querido, cliquea una moneda y elige tu opcion"
                  )
                }
              >
                How to buy or sell?
              </button>
            </div>
          </CoinSectionStyled>
        </Section>
      );
};

export default CoinsSection;
