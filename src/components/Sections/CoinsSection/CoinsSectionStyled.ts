import styled from "styled-components";

const CoinSectionStyled = styled.div`

display: flex;
flex-direction: column;
align-items:center;
gap: 1rem;

strong {
  margin: auto;
}

.resume {
  display:flex;
  flex-direction:column;
  align-items:center;

  span {
    font-size:larger;
    font-family: var(--priceFontFamily);
  }
}
  
.coin {
  width: 95%;
  transition: transform calc(var(--animTimeSecs)* 0.5);
  cursor: pointer;

  legend {
    text-transform: capitalize;
  }

  fieldset, legend {
    border: 2px groove var(--borderColor);  
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
  }

  &:hover,
  &:active {
    transform: scale(1.025);
  }

  .priceContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      border-radius: 50%;
      max-width: 3rem;
      max-height: 3rem;
      
      border: 2px solid var(--borderColor);
    }
  }

  .operatePrices {
    min-width: 75%;
    padding: 1%;

    & > div {
      display: flex;
      justify-content: space-between;
      width: 100%;
      gap: 0.5rem;
      overflow: hidden;
      word-break: break;
      text-overflow: ellipsis;
    }

    span:nth-child(2) {
      flex: 2;
      text-align: end;
    }
  }
}

`

export default CoinSectionStyled