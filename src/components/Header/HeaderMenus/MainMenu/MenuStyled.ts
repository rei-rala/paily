import styled from "styled-components";

const MenuStyled = styled.div`
  position: fixed;
  top: var(--headerHeight);
  left: 0;

  &, & nav {
    display:flex;
  flex-direction:column;
  align-items:center;
  gap:0.5rem;
  }
  
  background-color:  var(--bkgColor);
  border: 0 solid var(--borderColor);
  border-bottom-width: 5px;
  color: var(--fontColor);
  opacity: calc(var(--minOpacity) * 1.05);
  
  padding:0.5rem;
  padding-bottom: 1rem;
  max-height: 60vh;
  width:100%;

  overflow-y: scroll;
  z-index:99;

  a, a:visited {
    color: var(--fontColor);
  }

  a.active {
    font-weight:bold;
  }


  .sitePreferences {
    > * {
      margin: 0 0.5rem;
    }
  }

  .priceDisplay {
    display:flex;
    flex-direction:column;
    align-items:center;
    gap: 0.5rem;
  }  
`

export default MenuStyled