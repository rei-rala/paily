import styled from 'styled-components'

export const SectionStyled = styled.section`

display: flex;
flex-direction: column;
justify-content: center;

margin: calc(var(--headerHeight) + 0.5rem) 0 calc(var(--footerHeight) + 0.5rem) 0;
padding: 0 0.25rem;
width: calc(100% - 1rem);

/* background-blend-mode: var(--blend); */
background-blend-mode: soft-light;
background: var(--bkgColor);
background-image: linear-gradient(
  to right,
  #0f0c29,
  #24243e,
  #302b63,
  #302b63,
  #302b63,
  #24243e,
  #0f0c29
  );

border-radius: 0.5rem;
overflow: hidden;

transition: background calc(var(--animTimeSecs) * 0.25);

& > *:not(.sep) {
  max-width: 100%;
  &:last-child {
    margin-bottom: 0.25rem;
  }
}


h1,
h2,
h3,
h4,
h5,
h6 {
  text-transform: capitalize;
  text-align: center;
}

img {
  border: 1px inset rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
}

.mainBackBtn {
  position: fixed;
  top: 10vh;
  left: 5vw;

  display: grid;
  place-items: center;

  width: fit-content;
  cursor: pointer;

  padding: 0.25rem;
  border-radius: 50%;

  svg,
  img {
    width: 1.5rem;
    height: 1.5rem;
  }
}

.btnSection {
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin: 1rem 0 0.5rem 0;

  width: 100%;
}


.switchSection {
  display:grid;
  place-items: center;
  width: 100%;
  margin: 0.5rem 0;

  a {
    text-decoration: underline;
  }
}

.loginFormContainer {
  form {
    display:flex;
    flex-direction:column;
    align-items:center;

    .inputGroup, .formGroup {
      display: flex;
      justify-content: center;
      align-items:center;   
    }
    .formGroup {
      flex-direction:column;
      
      div.error input {
        border-color: hsla(0, 100%, 50%, 1);
        animation: calc(var(--animTimeSecs)* 0.5) BorderError infinite alternate;
      }
    }

    strong {
      height: 2rem;
      opacity: 0;
      transition: opacity calc(var(--animTimeSecs)* 0.5);
      
      &.formError {
        opacity: 1;       
      }
    }
    
    input {
      height: 2rem;
      border-width: 3px;
    }
  }
}

.pageBody,
.navigationBtns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;

  .imgError {
    width: 5rem;
    height: 5rem;
  }
}

.navigationBtns {
  flex-direction: row;
  gap: 1rem;
}

.pageBody,
.navigationBtns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;

  .imgError {
    width: 5rem;
    height: 5rem;
  }
}

.navigationBtns {
  flex-direction: row;
  gap: 1rem;
}
  

&.userSection {
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    margin: 0.5rem;
  }

  .sendSection {
    display: grid;
    place-items: center;
    button {
      font-weight: bold;
    }
  }

  form {
    max-width: 80%;

    .profileEditGroup {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      
      padding: 1rem 0;
      text-align:center;

      input {
        width: 100%;
      }
      
      img {
        object-fit: contain;
        width: 100%;
        height: 15rem;
        max-height: 40%;
      }

      &.image .subGroup {
        position: relative;
        display:flex;
        gap: 0.1rem;

        width: 100%;


        input, button {
          border-radius: 0.25rem;
        }
        input {
          flex:4;
        }
        button {
          padding: 0;
          font-size: 0.7rem;
        }

        .removeImg {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.25rem;

          display:grid;
          place-items: center;

          width:2rem;
          height:2rem;

          cursor: pointer;

          svg {
            height: 100%;
            width: 100%;
            object-fit: cover;
            transition: transform calc( var(--animTimeSecs) * 0.5);
          }
          
          svg:hover,
          svg:active {
            transform: scale(1.1);
          }
        }
      }
    }
  }
}

`