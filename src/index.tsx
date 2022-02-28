import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './i18n/config';
import './firebase/config';
import './index.css';

import App from './App';
import { store } from './store/store';


ReactDOM.render(
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <App/>
        </Provider>
      </Suspense>
    </BrowserRouter>,
    document.getElementById('root')
);


