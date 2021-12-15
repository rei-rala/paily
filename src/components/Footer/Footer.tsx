import React, { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

import { Modal } from "../../contexts/ModalContext";
import FooterStyled from "./FooterStyled";

const Footer: React.FC = () => {

  const { configModal } = useContext(Modal);

  const visitSocialMedia = (url: string) => {
    const page = url.split('.')[1]

    configModal(
      "Confirmar visita", // configTitle
      <span>Visitar mi perfil de <b>{page}</b>?</span>, // configChildren
      () => window.open(url, "_blank", "noopener noreferrer"), // configAction
      'Ir' // Custom button text
    )
  }

  return (
    <FooterStyled>
      <FontAwesomeIcon
        icon={faLinkedin}
        onClick={() => visitSocialMedia("https://www.LinkedIn.com/in/ramon-irala-220362110")}
      />
      <FontAwesomeIcon
        icon={faGithub}
        onClick={() => visitSocialMedia("https://www.GitHub.com/rei-rala")}
      />
    </FooterStyled>
  )
}

export default Footer