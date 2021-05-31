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
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { blue, red } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import logger from './middlewares/Logger';
import temporalStorage from './middlewares/TemporalStorage';
import reducer from './Reducers';
import Router from './router/Router';
import Offline from './common/components/offline/Offline';
import { changeIsLandscape } from 'app/AppReducer';

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ serializableCheck: false }), logger, temporalStorage],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const dispatch = useDispatch();
  const type = useSelector(state => state.app.theme);

  useEffect(() => {
    window.addEventListener('orientationchange',
      () => dispatch(changeIsLandscape(window.matchMedia('(orientation: portrait)').matches)));
  }, [dispatch]);

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
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {Router}
        <Offline />
      </MuiThemeProvider>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));

// load worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js'));
}