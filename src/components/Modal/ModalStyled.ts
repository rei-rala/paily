import styled from "styled-components";

const ModalStyled = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: grid;
    place-items: center;

    width: 100%;
    height: 100%;

    background-color: hsla(0, 0%, 0%, var(--minOpacity));
    animation: fadeToModal calc(var(--animTimeSecs)* 0.5) 1;

    z-index: 99;

    div.modal {
      width: 80%;
      max-width: 30rem;
      max-height: 50%;
      opacity:1;

      &.open {
        animation: calc(var(--animTimeSecs)* 0.5) 1 ease Appear;
      }

      img {
        max-width: 1rem;
        max-height: 1rem;
      }

      fieldset, legend {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--bkgColor);
        border: 3px ridge var(--borderColor);
        border-radius: 1rem;
        overflow: hidden;

        & *:not(button) {
            text-align: center;
            color:var(--fontColor);
          }
      }

      legend {
        margin: 0 auto;
        max-width: 12rem;
        padding: 0.5rem 0.75rem;
        font-weight: bold;
      }

      &__content, &__buttons {
        display:flex;
        align-items:center;
        justify-content:center;
        margin: 1rem 0;
      }
      &__buttons {
        gap: 5%;
        width: 100%;

        button {
          width: 5rem;
          max-width: 30%;
        }
      }
    
  }
`
export default ModalStyled