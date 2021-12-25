import styled from "styled-components";

const HeaderStyled = styled.header<{ scrolled?: boolean }>`
  --sizeSquare: 2rem;
  --shadowOnHover:0 0 0px 2px var(--headerFooterColor);
  
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem;

  height:var(--headerHeight);
  width: 100vw;
  
  transition: opacity calc(var(--animTimeSecs)* 0.5);
  cursor: default;
  
  opacity: ${(props) => props.scrolled === true ? 'var(--minOpacity)' : '1'};
      
  .userImg, .burgerMenu {
    border: 1px solid var(--borderColor);
    cursor: pointer;
    
    &:hover {
      border-color: black;
      box-shadow: var(--shadowOnHover);
    }
  }

  .userImg {
    display: grid;
    place-items: center;
    border-radius: 50%;
    overflow:hidden;

    svg,
    img {
      width: var(--sizeSquare) !important;
      height: var(--sizeSquare) !important;

      min-width: var(--sizeSquare) !important;
      min-height: var(--sizeSquare) !important;
    }
  }

  .burgerMenu {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: var(--headerFooterColor);

    height: var(--sizeSquare) !important;
    width: var(--sizeSquare) !important;

    min-width: var(--sizeSquare) !important;
    min-height: var(--sizeSquare) !important;

    padding: 0.25rem;

    border-radius: 0.5rem;

    div {
      border-radius: 1rem;
      background-color: #5e6167;
      padding: 7.5% 0;
      width: 80%;
      transition: all calc(var(--animTimeSecs)* 0.5);
    }
  }

  .burgerActive div {
    &:nth-child(2) {
      background-color: hsla(0, 100%, 50%, 1);
      opacity: 0;
      width:0;
    }
    &:nth-child(1) {
      transform: translateY(191%) rotate(45deg);
    }
    &:nth-child(3) {
      transform: translateY(-191%) rotate(-45deg);
    }
  }
`

export default HeaderStyled