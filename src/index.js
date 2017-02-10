import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App';
import Upload from './components/Upload';
import Gallery from './components/Gallery';
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
    <Router history={hashHistory}>
      <Route path="/" component={App} />
      <Route path="/upload" component={Upload} />
      <Route path="/gallery" component={Gallery} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
