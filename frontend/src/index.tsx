import '~/assets/css/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { RouterProvider } from '~/libs/components/components.js';
import { store } from '~/libs/packages/store/store.js';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store.instance}>
      <RouterProvider />
    </Provider>
  </React.StrictMode>,
);
