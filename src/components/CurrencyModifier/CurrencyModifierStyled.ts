import styled from "styled-components";

const CurrencyModifierStyled = styled.div`
  &.priceDisplay {
    text-align: center;
    .priceDisplay__btns {
      display: flex;
      flex-direction: row !important;
      justify-content: center;
      gap: 0.5rem;
      
      button {
        width:15% !important;
        min-width:fit-content;
      }
    }
  }
`

export default CurrencyModifierStyled