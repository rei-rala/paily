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

      .balanceLoading span {
        position:relative;
        animation: Bounce calc(var(--animTimeSecs)* 1) ease infinite;

        &:nth-child(2) {
          animation-delay: calc(var(--animTimeSecs)* 0.1); 
        }
        &:nth-child(3) {
          animation-delay: calc(var(--animTimeSecs)* 0.2); 
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