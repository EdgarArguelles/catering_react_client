/* eslint-disable max-lines */
import sinon from 'sinon';
import {act} from 'react-test-renderer';
import {waitFor} from '@testing-library/react';
import React from 'react';
import {renderQueryComponent} from 'app/../../test/TestHelper';
import Api from 'app/common/Api';
import {ACTIVE_DISHES_KEY, CACHE, DISH_KEY} from 'app/hooks/data/Dishes';
import {useCourseTypes, useDBVersion} from 'app/hooks/data/CourseTypes';

describe('Hooks -> Data -> CourseTypes', () => {
  const dispatchStub = sinon.stub();
  const graphqlStub = sinon.stub(Api, 'graphql');
  const setQueryDataStub = sinon.stub();
  const invalidateQueriesStub = sinon.stub();
  const removeQueriesStub = sinon.stub();
  let hookResponse;

  afterEach(() => {
    dispatchStub.reset();
    graphqlStub.reset();
    setQueryDataStub.reset();
    invalidateQueriesStub.reset();
    removeQueriesStub.reset();
    hookResponse = undefined;
    window.localStorage.removeItem('courseTypesCached');
    window.localStorage.removeItem('versionCached');
    window.localStorage.removeItem(CACHE);
  });

  const mountComponent = renderQueryComponent(({hook}) => {
    hookResponse = hook();
    return <div/>;
  }, {dispatchStub, setQueryDataStub, invalidateQueriesStub, removeQueriesStub});

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
      sinon.assert.callCount(invalidateQueriesStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);

      // wait until fire useQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));
      expect(hookResponse.data).toStrictEqual({value: 'test'});
      expect(window.localStorage.getItem('courseTypesCached')).toStrictEqual(JSON.stringify({value: 'test'}));
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(setQueryDataStub, 0);
      sinon.assert.callCount(invalidateQueriesStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);
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
      sinon.assert.callCount(invalidateQueriesStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);

      // wait until fire useQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 6)));
      expect(hookResponse.status).toStrictEqual('error');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 6);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(setQueryDataStub, 0);
      sinon.assert.callCount(invalidateQueriesStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);
    });

    it('should not restore course types when online and error and cache is not present', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

      mountComponent(() => useCourseTypes(), {app: {isOnline: true}}, false);
      // should use undefined as initial data when online before useQuery is fired
      expect(hookResponse.data).toBeUndefined();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(setQueryDataStub, 0);
      sinon.assert.callCount(invalidateQueriesStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);

      // wait until fire useQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 6)));
      expect(hookResponse.status).toStrictEqual('error');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 6);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(setQueryDataStub, 0);
      sinon.assert.callCount(invalidateQueriesStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);
    });

    it('should restore course types when online and error and cache is present', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);
      window.localStorage.setItem('courseTypesCached', JSON.stringify({id: 5}));

      mountComponent(() => useCourseTypes(), {app: {isOnline: true}}, false);
      // should use undefined as initial data when online before useQuery is fired
      expect(hookResponse.data).toBeUndefined();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(setQueryDataStub, 0);
      sinon.assert.callCount(invalidateQueriesStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);

      // wait until fire useQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 6)));
      expect(hookResponse.status).toStrictEqual('error');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 6);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(setQueryDataStub, 1);
      sinon.assert.calledWithExactly(setQueryDataStub, 'CourseTypes', {id: 5});
      sinon.assert.callCount(invalidateQueriesStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);
    });

    it('should use cache as initial data when offline and cache is present', async () => {
      window.localStorage.setItem('courseTypesCached', JSON.stringify({id: 5}));

      mountComponent(() => useCourseTypes(), {app: {isOnline: false}}, false);
      expect(hookResponse.data).toStrictEqual({id: 5});
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(setQueryDataStub, 0);
      sinon.assert.callCount(invalidateQueriesStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);

      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 0)));
      expect(hookResponse.data).toStrictEqual({id: 5});
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(setQueryDataStub, 0);
      sinon.assert.callCount(invalidateQueriesStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);
    });
  });

  describe('useDBVersion', () => {
    const body = {query: '{version {version}}'};

    it('should not load version when courseTypes is not present', async () => {
      window.localStorage.setItem('versionCached', '5');
      window.localStorage.setItem(CACHE, 'old value');

      mountComponent(() => useDBVersion(null), {}, false);
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 0)));

      expect(hookResponse.data).toBeUndefined();
      expect(window.localStorage.getItem('versionCached')).toStrictEqual('5');
      expect(window.localStorage.getItem(CACHE)).toStrictEqual('old value');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(setQueryDataStub, 0);
      sinon.assert.callCount(invalidateQueriesStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);
    });

    it('should load version when courseTypes is present', async () => {
      const jsonExpected = {data: {version: {version: 'version1'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
      window.localStorage.setItem('versionCached', '5');
      window.localStorage.setItem(CACHE, 'old value');

      mountComponent(() => useDBVersion(60), {}, false);
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));

      expect(hookResponse.data).toStrictEqual('version1');
      expect(window.localStorage.getItem('versionCached')).toStrictEqual('version1');
      expect(window.localStorage.getItem(CACHE)).toStrictEqual(null);
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(setQueryDataStub, 0);
      sinon.assert.callCount(invalidateQueriesStub, 1);
      sinon.assert.calledWithExactly(invalidateQueriesStub, ACTIVE_DISHES_KEY);
      sinon.assert.callCount(removeQueriesStub, 1);
      sinon.assert.calledWithExactly(removeQueriesStub, DISH_KEY);
    });

    it('should not update version when cache is the same', async () => {
      const jsonExpected = {data: {version: {version: 4}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
      window.localStorage.setItem('versionCached', '4');
      window.localStorage.setItem(CACHE, 'old value');

      mountComponent(() => useDBVersion(60), {}, false);
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));

      expect(hookResponse.data).toStrictEqual(4);
      expect(window.localStorage.getItem('versionCached')).toStrictEqual('4');
      expect(window.localStorage.getItem(CACHE)).toStrictEqual('old value');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(setQueryDataStub, 0);
      sinon.assert.callCount(invalidateQueriesStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);
    });

    it('should not update version when cache is not present', async () => {
      const jsonExpected = {data: {version: {version: 4}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
      window.localStorage.setItem(CACHE, 'old value');

      mountComponent(() => useDBVersion(60), {}, false);
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));

      expect(hookResponse.data).toStrictEqual(4);
      expect(window.localStorage.getItem('versionCached')).toStrictEqual(null);
      expect(window.localStorage.getItem(CACHE)).toStrictEqual('old value');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(setQueryDataStub, 0);
      sinon.assert.callCount(invalidateQueriesStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);
    });
  });
});