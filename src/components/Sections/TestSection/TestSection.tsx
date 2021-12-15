import React from "react";
import { Link } from "react-router-dom";

import ModalTester from "../../../ModalTester";
import Section from "../Section";


const TestSection = () => {

  return <Section title='main'>
    <ModalTester />

    <div className="btnSection">
      <Link to='/cripto'><button>Ir a Criptos</button></Link>
    </div>
  </Section>
}

export default TestSection