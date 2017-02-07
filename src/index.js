import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Welcome from './components/Welcome';
import './index.css';

import statusReducer from './reducers';

/* eslint-disable no-underscore-dangle, no-undef */
const store = createStore(
  statusReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

ReactDOM.render(
  <Provider store={store}>
    <Welcome />
  </Provider>,
  document.getElementById('root'),
);
