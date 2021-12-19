import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { WindowContext, UserContext, ModalContext } from './contexts';

import './GlobalStylesResources.css'
import GlobalStyles from './GlobalStyles';

//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <WindowContext>
        <UserContext>
          <ModalContext>

              <GlobalStyles />
              <App />

          </ModalContext >
        </UserContext>
      </WindowContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
