/* eslint-disable max-lines */
import sinon from 'sinon';
import renderer, {act} from 'react-test-renderer';
import {waitFor} from '@testing-library/react';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {createStore} from 'redux';
import {QueryClient, QueryClientProvider} from 'react-query';
import Api from 'app/common/Api';
import reducers from 'app/Reducers';
import {useCourseTypes, useDBVersion} from 'app/hooks/data/CourseTypes';

describe('Hooks -> Data -> CourseTypes', () => {
  const dispatchStub = sinon.stub();
  const graphqlStub = sinon.stub(Api, 'graphql');
  const setQueryDataStub = sinon.stub();
  let hookResponse, queryClient, store;

  beforeEach(() => {
    queryClient = new QueryClient();
    queryClient.setQueryData = setQueryDataStub;
  });

  afterEach(() => {
    dispatchStub.reset();
    graphqlStub.reset();
    setQueryDataStub.reset();
    hookResponse = undefined;
    window.localStorage.removeItem('courseTypesCached');
    window.localStorage.removeItem('versionCached');
  });

  const mountComponent = (hook, state, useRealStore) => {
    const Component = () => {
      hookResponse = hook();
      return <div/>;
    };

    store = configureStore()(state);
    store.dispatch = dispatchStub;
    store = useRealStore ? createStore(reducers, state) : store;
    renderer.create(<Provider store={store}><QueryClientProvider client={queryClient}>
      <Component/></QueryClientProvider></Provider>);
  };

  describe('useCourseTypes', () => {
    const body = {query: '{activeCourseTypes {id name picture position status}}'};

    it('should load course types when success', async () => {
      const jsonExpected = {data: {activeCourseTypes: {value: 'test'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      mountComponent(() => useCourseTypes(), {app: {isOnline: true}}, false);
      // should use undefined as initial data when online before useQuery is fired
      expect(hookResponse.data).toBeUndefined();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(setQueryDataStub, 0);

      // wait until fire useQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));
      expect(hookResponse.data).toStrictEqual({value: 'test'});
      expect(window.localStorage.getItem('courseTypesCached')).toStrictEqual(JSON.stringify({value: 'test'}));
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(setQueryDataStub, 0);
    });

    it('should not load course types when error and cache is not present', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

      mountComponent(() => useCourseTypes(), {app: {isOnline: false}}, false);
      // should use undefined as initial data when offline and cache is not present before useQuery is fired
      expect(hookResponse.data).toBeUndefined();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(setQueryDataStub, 0);

      // wait until fire useQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 6)));
      expect(hookResponse.status).toStrictEqual('error');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 6);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(setQueryDataStub, 0);
    });

    it('should restore course types when error and cache is present', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);
      window.localStorage.setItem('courseTypesCached', JSON.stringify({id: 5}));

      mountComponent(() => useCourseTypes(), {app: {isOnline: false}}, false);
      // should use cache as initial data when offline and cache is present before useQuery is fired
      expect(hookResponse.data).toStrictEqual({id: 5});
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(setQueryDataStub, 0);

      // wait until fire useQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 6)));
      expect(hookResponse.status).toStrictEqual('error');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 6);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(setQueryDataStub, 1);
      sinon.assert.calledWithExactly(setQueryDataStub, 'CourseTypes', {id: 5});
    });
  });

  describe('useDBVersion', () => {
    const body = {query: '{version {version}}'};

    it('should not load version when courseTypes is not present', async () => {
      window.localStorage.setItem('versionCached', '5');

      mountComponent(() => useDBVersion(null), {}, false);
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 0)));

      expect(hookResponse.data).toBeUndefined();
      expect(window.localStorage.getItem('versionCached')).toStrictEqual('5');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(setQueryDataStub, 0);
    });

    it('should load version when courseTypes is present', async () => {
      const jsonExpected = {data: {version: {version: 'version1'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
      window.localStorage.setItem('versionCached', '5');

      mountComponent(() => useDBVersion(60), {}, false);
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));

      expect(hookResponse.data).toStrictEqual('version1');
      expect(window.localStorage.getItem('versionCached')).toStrictEqual('version1');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(setQueryDataStub, 0);
    });

    it('should not update version when caches is the same', async () => {
      const jsonExpected = {data: {version: {version: 4}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
      window.localStorage.setItem('versionCached', '4');

      mountComponent(() => useDBVersion(60), {}, false);
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));

      expect(hookResponse.data).toStrictEqual(4);
      expect(window.localStorage.getItem('versionCached')).toStrictEqual('4');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(setQueryDataStub, 0);
    });
  });
});