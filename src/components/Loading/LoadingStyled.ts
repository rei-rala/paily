import styled from "styled-components";

const LoadingStyled = styled.div`
  &.loadingContainer {
    position:fixed;
    top:0;
    left:0;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100% !important;

    z-index: 99999;
    background: hsla(var(--compBkgColor), 0.75); 
    animation: Appear calc(var(--animTimeSecs)* 1) 1 ease-in-out;

    img.loadingImg {
      max-width: 60vw;
      max-height: 60vh;
      object-fit: contain;

      animation: Enlighten calc(var(--animTimeSecs)* 2) Pulse ease-in-out;
      transform: translateY(-20%);
    }
  }
`

export default LoadingStyled