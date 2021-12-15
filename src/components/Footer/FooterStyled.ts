import styled from "styled-components";

const FooterStyled = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;

  height: calc(var(--headerHeight)/2.5) ;
  width: 100%;
  
  svg, img {
    height:75%;
    cursor: pointer;
    color: var(--headerFooterColor);

    &:hover {
      color: lightblue;
    }
  }

`

export default FooterStyled