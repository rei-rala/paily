import React from "react";

const FormGroup: React.FC<{ element: JSX.Element, error: any, touch: any }> = ({ element, error, touch }) => {

  return (

    <div className="formGroup">
      <div className={`inputGroup ${(error && touch) ? 'error' : ''}`}>
        {element}
      </div>
      <strong className={(error && touch) ? 'formError' : ''}>
        {
          error && touch
            ? error
            : null
        }
      </strong>
    </div>
  )
}

export default FormGroup