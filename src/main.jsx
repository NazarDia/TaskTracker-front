import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './index.css';
import '../node_modules/modern-normalize/modern-normalize.css';
// fonts
import './fonts/Poppins-Medium.woff2';
import './fonts/Poppins-Regular.woff2';
import './fonts/Poppins-SemiBold.woff2';
//
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <PersistGate loading={null}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
