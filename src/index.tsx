import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { WindowContext, UserContext, ModalContext } from './contexts';

import './GlobalStylesResources.css'
import GlobalStyles from './GlobalStyles';

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