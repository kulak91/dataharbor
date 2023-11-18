import './index.css';
import 'reset-css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '~/libs/packages/store/store.js';

import { App } from './app.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store.instance}>
      <App />
    </Provider>
  </React.StrictMode>,
);
