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
    background-color: rgba(0, 0, 0, var(--minOpacity));
    animation: Appear calc(var(--animTimeSecs)* 2) 1 ease-in-out;

    img.loadingImg {
      max-width: 50vw;
      max-height: 50vh;

      animation: Enlighten calc(var(--animTimeSecs)* 2) Pulse ease-in-out;
      transform: translateY(-20%);
    }
  }
`

export default LoadingStyled