/**
 * It's important to note that you'll only have a single store in a Redux application.
 * When you want to split your data handling logic, you'll use reducer composition
 * instead of many stores.
 */
// IE libraries
import 'isomorphic-fetch';
import 'url-search-params-polyfill';

import '../index.html';
import 'assets/img/icon-128x128.png';
import './App.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, useSelector} from 'react-redux';
import {blue, red} from '@material-ui/core/colors';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from './middlewares/Logger';
import temporalStorage from './middlewares/TemporalStorage';
import reducers from './Reducers';
import Router from './router/Router';
import Offline from './common/components/offline/Offline';

const store = createStore(reducers, applyMiddleware(thunkMiddleware, logger, temporalStorage));

const App = () => {
  const type = useSelector(state => state.theme);

  // overwrite primary and secondary
  const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: red,
      type,
    },
    typography: {
      fontFamily: 'Comic Sans MS',
      useNextVariants: true,
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      {Router}
      <Offline/>
    </MuiThemeProvider>
  );
};

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));

// load worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js'));
}