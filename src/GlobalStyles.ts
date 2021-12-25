import { createGlobalStyle, } from "styled-components"

const GlobalStyles = createGlobalStyle`

  * {
    border-color: var(--borderColor);
    box-sizing: border-box;
    color: var(--fontColor);

    &[data-icon="toggle-on"] path {
      fill:green ;
    }
    &[data-icon="toggle-off"] path {
      color:red ;
    }
  }

  body {
    div.app {
    display:flex;
    flex-direction: column;
    align-items:center;
    }

    margin: 0;
    padding: 0;
    min-height: 100%;
    width: 100%;
    padding: 0.5rem;
    overflow: hidden scroll !important;

    font-family: var(--defaultFontFamily);
    background-color: var(--bkgColor);
    color: var(--fontColor);
  }
 
  header, footer {
    font-family: 'Comfortaa', cursive !important;
    font-size: x-large;

    z-index: 999;
    background: linear-gradient(
      90deg,
      hsl(220, 9%, 20%),
      hsl(216, 6%, 33%),
      hsl(220, 9%, 20%)
    );

    * {
    color: var(--headerFooterColor);
    }
  }

  footer {
    opacity: var(--minOpacity);
    * {
      max-height:90%;
    }
  }

  button {
    cursor: pointer;
    background-color: var(--btnBkgColor);
    color: var(--btnColor);
    border-radius: 0.5rem;
    padding: 0.25rem 0.5rem;
    min-width: 5rem;
    &:disabled {
      filter: invert(1);
      cursor: not-allowed;
    }
  }

  :not(.headerTitle) a ,
  :not(.headerTitle) a::visited{
    color: var(--fontColor);
  }
  
  a,
  a:visited {
    text-decoration: none;
  }

  input {
    color: var(--btnColor);
    background-color: var(--compBkgColor);
    border-radius:1rem;
    text-align:center;
  }

  input:disabled {
    background-color: var(--btnColor);
    color: var(--compBkgColor);
  }

  img {
    object-fit: cover;
  }

  .faint {
    opacity: 0.5;
  }

  .sep {
    display: block ; 
    width:100%;
  
    hr { 
      border-width: 1px  ;
      border-style:inset ;
    }
  }

  div.menu.burger,
  div.menu.user {
    animation: calc(var(--animTimeSecs)* 0.25) MenuActive ease-in-out;
    transition: background calc(var(--animTimeSecs)* 0.5);
  }


  .mainBackBtn {
    color: var(--bkgColor);
    border: 1px solid var(--borderColor);
    background: var(--bkgColor);
  }

  .backToTopBtn {
    position: fixed;
    right: 10%;
    bottom: 8%;

    cursor: pointer;
    transition: opacity calc(var(--animTimeSecs)* 0.33)  ease-in-out;

    .toTopIcon {
      width: 2rem;
      height: 2rem;
      background-color:var(--bkgColor);
      border: 1px solid var(--bkgColor);
      border-radius:50%;
    }
  }

  .mainBackBtn,
  .backToTopBtn {
    z-index: 99;
    &:hover,
    &:active {
      transform: scale(1.1);
    }

    &:active {
      filter: grayscale(1);
    }
  }

  .price,
  .prices {
    font-family: var(--priceFontFamily);
    text-overflow: ellipsis;
  }

  section.section {
    animation: Appear calc(var(--animTimeSecs)* 0.5) 1 ease-in-out;
  }

`

export default GlobalStyles