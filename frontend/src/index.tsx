import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import store from '../src/app/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
