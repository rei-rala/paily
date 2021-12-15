import styled from "styled-components";

const CoinStyled = styled.div`
  .btnSection {
    justify-content: center;
    gap: 2rem;
  }

  .coinDetails {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &--image {
      width: 50%;
      max-width: 5rem;
      max-height: 25%;

      border: none;
    }
    &--main {
      display: flex;
      flex-direction: row;
      justify-content: center;

      hr, strong {
        font-size:larger;
      }
      span {
        height:2rem;
      }
    }
  
    .varianceTable {
      width: 100%;
      display: flex;
      flex-direction: column;

      div {
        display: flex;
        flex-direction: row !important;
        justify-content: space-evenly;

        width: 100%;

        strong,
        span {
          max-width: 25%;
          text-align: center;
        }
      }
    }

    div:not(.coinDetails--header) {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 100%;
    }

    .coinDetails--prices{
      display:flex;
      justify-content: center;
      align-items:center;
      height: 5rem;
    }

    &--operateBtns {
      flex-direction: row !important;
      justify-content: center;
      gap: 10%;

      button {
        padding: 0.5rem;
        min-width: 5rem;
      }
    }
  }
  
`

export default CoinStyled