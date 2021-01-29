import renderer from 'react-test-renderer';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {createStore} from 'redux';
import {QueryClient, QueryClientProvider} from 'react-query';
import reducers from 'app/Reducers';

const getStore = (dispatchStub, state, useRealStore) => {
  const store = configureStore()(state);
  store.dispatch = dispatchStub;
  return useRealStore ? createStore(reducers, state) : store;
};

export const renderQueryComponent = (Component, {dispatchStub, setQueryDataStub, removeQueriesStub}) =>
  (hook, state, useRealStore) => {
    const queryClient = new QueryClient({defaultOptions: {queries: {retry: false, staleTime: Infinity}}});
    setQueryDataStub && (queryClient.setQueryData = setQueryDataStub);
    removeQueriesStub && (queryClient.removeQueries = removeQueriesStub);

    const store = getStore(dispatchStub, state, useRealStore);
    const wrapper = renderer.create(
      <Provider store={store}><QueryClientProvider client={queryClient}>
        <Component hook={hook}/>
      </QueryClientProvider></Provider>,
    );

    return {wrapper, store};
  };

export const renderReduxComponent = (Component, dispatchStub) => (hook, state, useRealStore) => {
  const store = getStore(dispatchStub, state, useRealStore);
  const wrapper = renderer.create(<Provider store={store}><Component hook={hook}/></Provider>);

  return {wrapper, store};
};