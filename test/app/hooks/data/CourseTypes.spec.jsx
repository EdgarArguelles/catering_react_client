/* eslint-disable max-lines */
import sinon from 'sinon';
import renderer, {act} from 'react-test-renderer';
import React, {useState} from 'react';
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
  const queryClient = new QueryClient();
  queryClient.setQueryData = setQueryDataStub;
  let component, hookResponse, store, wrapper;

  afterEach(() => {
    dispatchStub.reset();
    graphqlStub.reset();
    setQueryDataStub.reset();
  });

  const mountComponent = (hook, state, useRealStore) => {
    const Component = () => {
      const [value, setValue] = useState(null);
      hookResponse = hook(value);
      return <div value={value} onChange={newValue => setValue(newValue)}/>;
    };

    store = configureStore()(state);
    store.dispatch = dispatchStub;
    store = useRealStore ? createStore(reducers, state) : store;
    wrapper = renderer.create(<Provider store={store}><QueryClientProvider client={queryClient}>
      <Component/></QueryClientProvider></Provider>);
    component = wrapper.root.find(el => el.type === 'div');
  };

  describe('useCourseTypes', () => {
    const body = {query: '{activeCourseTypes {id name picture position status}}'};
    const callMultipleOnChange = async () => {
      await act(async () => await component.props.onChange());
      await act(async () => await component.props.onChange());
      await act(async () => await component.props.onChange());
      await act(async () => await component.props.onChange());
      await act(async () => await component.props.onChange());
      await act(async () => await component.props.onChange());
    };

    it('should load course types when success', async () => {
      const jsonExpected = {data: {activeCourseTypes: {value: 'test'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      mountComponent(() => useCourseTypes(), {}, false);
      await act(async () => await component.props.onChange()); // fire useQuery and wait for response

      expect(hookResponse.data).toStrictEqual({value: 'test'});
      expect(window.localStorage.getItem('courseTypesCached')).toStrictEqual(JSON.stringify({value: 'test'}));
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      window.localStorage.removeItem('courseTypesCached');
    });

    it('should not load course types when error and cache is not present', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

      mountComponent(() => useCourseTypes(), {}, false);
      await callMultipleOnChange();

      expect(hookResponse.status).toStrictEqual('error');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(setQueryDataStub, 0);
      sinon.assert.callCount(graphqlStub, 6);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
    });

    it('should restore course types when error and cache is present', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);
      window.localStorage.setItem('courseTypesCached', JSON.stringify({id: 5}));

      mountComponent(() => useCourseTypes(), {}, false);
      await callMultipleOnChange();

      expect(hookResponse.status).toStrictEqual('error');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(setQueryDataStub, 3);
      sinon.assert.calledWithExactly(setQueryDataStub, 'CourseTypes', {id: 5});
      sinon.assert.callCount(graphqlStub, 6);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      window.localStorage.removeItem('courseTypesCached');
    });
  });

  describe('useDBVersion', () => {
    const body = {query: '{version {version}}'};

    it('should not load version when courseTypes is not present', async () => {
      const jsonExpected = {data: {version: {version: 'version1'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
      window.localStorage.setItem('versionCached', '5');

      mountComponent(() => useDBVersion(null), {}, false);
      await act(async () => await component.props.onChange()); // fire useQuery and wait for response

      expect(hookResponse.data).toStrictEqual(undefined);
      expect(window.localStorage.getItem('versionCached')).toStrictEqual('5');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      window.localStorage.removeItem('versionCached');
    });

    it('should load version when courseTypes is present', async () => {
      const jsonExpected = {data: {version: {version: 'version1'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
      window.localStorage.setItem('versionCached', '5');

      mountComponent(() => useDBVersion(60), {}, false);
      await act(async () => await component.props.onChange()); // fire useQuery and wait for response

      expect(hookResponse.data).toStrictEqual('version1');
      expect(window.localStorage.getItem('versionCached')).toStrictEqual('version1');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      window.localStorage.removeItem('versionCached');
    });

    it('should not update version when caches is the same', async () => {
      const jsonExpected = {data: {version: {version: 'version1'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
      window.localStorage.setItem('versionCached', 'version1');

      mountComponent(() => useDBVersion(60), {}, false);
      await act(async () => await component.props.onChange()); // fire useQuery and wait for response

      expect(hookResponse.data).toStrictEqual('version1');
      expect(window.localStorage.getItem('versionCached')).toStrictEqual('version1');
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      window.localStorage.removeItem('versionCached');
    });
  });
});