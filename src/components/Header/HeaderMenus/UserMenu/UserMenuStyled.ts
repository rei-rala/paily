import styled from "styled-components";

const UserMenuStyled = styled.div`
  position: fixed;
  top: var(--headerHeight);
  right: 0;

  display:flex;
  flex-direction:column;
  align-items:center;
  gap:0.5rem;

  background-color:  var(--bkgColor);
  border: 5px solid var(--borderColor);
  border-top-width: 0;
  border-radius: 0 0  0.5rem 0.5rem ;
  color: var(--fontColor);
  opacity: calc(var(--minOpacity) * 1.05);
  
  padding: 1rem 0.5rem;
  max-height: 60vh;
  width: 20rem;
  max-width: 50%;

  text-align: center;

  overflow: hidden;
  z-index:99;

  a, a:visited {
    color: var(--fontColor);
  }

  a.active {
    font-weight:bold;
  }


  .userMenuSection {    
    &.greeting {
      cursor: default !important;
      width:100%;
      word-break: break;
      
      text-overflow: ellipsis;
    }

    a {
      width: 100%;
      cursor: pointer;
    }

    svg {
      height: 1rem;
      width: 1rem;
      aspect-ratio: 1/1;
    }

    &:hover,
    &:active {
      svg[data-icon="user"],
      svg[data-icon="sign-out-alt"] {
        animation: Shake calc(var(--animTimeSecs)*1.5) infinite ease;
      }
      svg[data-icon="cog"] {
        animation: RotateRight calc(var(--animTimeSecs)*1.5) infinite ease;
      }
    }
  }
`

export default UserMenuStyled