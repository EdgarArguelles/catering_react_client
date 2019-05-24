/**
 * It's important to note that you'll only have a single store in a Redux application.
 * When you want to split your data handling logic, you'll use reducer composition
 * instead of many stores.
 */
// IE libraries
import 'isomorphic-fetch';
import 'url-search-params-polyfill';

import '../index.html';
import '../assets/img/icon-128x128.png';
import './App.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {blue, red} from '@material-ui/core/colors';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from './middlewares/Logger';
import temporalStorage from './middlewares/TemporalStorage';
import reducers from './Reducers';
import Router from './router/Router';

const store = createStore(reducers, applyMiddleware(thunkMiddleware, logger, temporalStorage));

// overwrite primary and secondary
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
  typography: {
    useNextVariants: true,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      {Router}
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app'),
);

// load worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js'));
}