/* eslint-disable max-lines */
import sinon from 'sinon';
import {act} from 'react-test-renderer';
import {waitFor} from '@testing-library/react';
import React from 'react';
import {renderQueryComponent} from 'app/../../test/TestHelper';
import Api from 'app/common/Api';
import {CACHE, useActiveDishesByCourseType, useDish, useDishesByIds} from 'app/hooks/data/Dishes';

describe('Hooks -> Data -> Dishes', () => {
  const FIELDS = 'id name description picture price status categories{name}';
  const dispatchStub = sinon.stub();
  const graphqlStub = sinon.stub(Api, 'graphql');
  const removeQueriesStub = sinon.stub();
  let hookResponse;

  afterEach(() => {
    dispatchStub.reset();
    graphqlStub.reset();
    removeQueriesStub.reset();
    hookResponse = undefined;
    window.localStorage.removeItem(CACHE);
  });

  const mountComponent = renderQueryComponent(({hook}) => {
    hookResponse = hook();
    return <div/>;
  }, {dispatchStub, removeQueriesStub});

  describe('useActiveDishesByCourseType', () => {
    const courseTypeId = 5;
    const body = {query: `{courseType(id: ${courseTypeId}) {activeDishes{${FIELDS}}}}`};

    it('should not get dishes when courseTypeId is not present', async () => {
      mountComponent(() => useActiveDishesByCourseType(), {}, false);
      // should use undefined as initial data when cache is not present before useQuery is fired
      expect(hookResponse.data).toBeUndefined();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);

      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 0)));
      expect(hookResponse.data).toBeUndefined();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);
    });

    it('should get dishes when courseTypeId is present', async () => {
      const jsonExpected = {data: {courseType: {activeDishes: [{id: 1}, {id: 2, courseTypeId: 9}, {id: 3, extra: 4}]}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
      window.localStorage.setItem(CACHE, JSON.stringify([{id: 3}, {id: 4}]));
      const hookResponseExpected = [{id: 1, courseTypeId}, {id: 2, courseTypeId}, {id: 3, courseTypeId, extra: 4}];
      const cacheExpected = [{id: 4}, {id: 1, courseTypeId}, {id: 2, courseTypeId}, {id: 3, extra: 4, courseTypeId}];

      mountComponent(() => useActiveDishesByCourseType(courseTypeId), {}, false);
      // should use undefined as initial data when cache do not have dishes with courseType before useQuery is fired
      expect(hookResponse.data).toBeUndefined();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);

      // wait until fire useQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));
      expect(hookResponse.data).toStrictEqual(hookResponseExpected);
      expect(window.localStorage.getItem(CACHE)).toStrictEqual(JSON.stringify(cacheExpected));
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(removeQueriesStub, 1);
      sinon.assert.calledWithExactly(removeQueriesStub, 'Dish');
    });

    it('should not get dishes when error and cache do not have dishes with courseType', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);
      window.localStorage.setItem(CACHE, JSON.stringify([{id: 3}, {id: 4}]));

      mountComponent(() => useActiveDishesByCourseType(courseTypeId), {}, false);
      // should use undefined as initial data when cache do not have dishes with courseType before useQuery is fired
      expect(hookResponse.data).toBeUndefined();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);

      // wait until fire useQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));
      expect(hookResponse.status).toStrictEqual('error');
      expect(window.localStorage.getItem(CACHE)).toStrictEqual(JSON.stringify([{id: 3}, {id: 4}]));
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(removeQueriesStub, 0);
    });

    it('should not fetch dishes when cache have dishes with courseType', async () => {
      const cacheValue = [
        {id: 6, courseTypeId, status: 1}, {id: 7, courseTypeId: 2, status: 1}, {id: 8},
        {id: 9, courseTypeId, status: 1}, {id: 10, courseTypeId},
      ];
      window.localStorage.setItem(CACHE, JSON.stringify(cacheValue));

      mountComponent(() => useActiveDishesByCourseType(courseTypeId), {}, false);
      // should use cache as initial data when cache have dishes with courseType before useQuery is fired
      expect(hookResponse.data).toStrictEqual([
        {id: 6, courseTypeId, status: 1}, {id: 9, courseTypeId, status: 1},
      ]);
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);

      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 0)));
      expect(hookResponse.data).toStrictEqual([
        {id: 6, courseTypeId, status: 1}, {id: 9, courseTypeId, status: 1},
      ]);
      expect(window.localStorage.getItem(CACHE)).toStrictEqual(JSON.stringify(cacheValue));
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);
    });
  });

  describe('useDish', () => {
    const dishId = 8;
    const body = {query: `{dish(id: ${dishId}) {${FIELDS}}}`};

    it('should not get dish when dishId is not present', async () => {
      mountComponent(() => useDish(), {}, false);
      // should use undefined as initial data when cache is not present before useQuery is fired
      expect(hookResponse.data).toBeUndefined();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);

      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 0)));
      expect(hookResponse.data).toBeUndefined();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);
    });

    it('should get dish when dishId is present', async () => {
      const jsonExpected = {data: {dish: {value: 'test'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
      window.localStorage.setItem(CACHE, JSON.stringify([{id: 3}, {id: 4}]));

      mountComponent(() => useDish(dishId), {}, false);
      // should use undefined as initial data when cache do not have the dish id before useQuery is fired
      expect(hookResponse.data).toBeUndefined();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);

      // wait until fire useQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));
      expect(hookResponse.data).toStrictEqual({value: 'test'});
      expect(window.localStorage.getItem(CACHE)).toStrictEqual(JSON.stringify([{id: 3}, {id: 4}, {value: 'test'}]));
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(removeQueriesStub, 0);
    });

    it('should not get dish when error and cache do not have the dish id', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);
      window.localStorage.setItem(CACHE, JSON.stringify([{id: 3}, {id: 4}]));

      mountComponent(() => useDish(dishId), {}, false);
      // should use undefined as initial data when cache do not have the dish id before useQuery is fired
      expect(hookResponse.data).toBeUndefined();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);

      // wait until fire useQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));
      expect(hookResponse.status).toStrictEqual('error');
      expect(window.localStorage.getItem(CACHE)).toStrictEqual(JSON.stringify([{id: 3}, {id: 4}]));
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(removeQueriesStub, 0);
    });

    it('should not fetch dish when cache have the dish id', async () => {
      window.localStorage.setItem(CACHE, JSON.stringify([{id: 3}, {id: dishId}, {id: 4}]));

      mountComponent(() => useDish(dishId), {}, false);
      // should use cache as initial data when cache have the dish id before useQuery is fired
      expect(hookResponse.data).toStrictEqual({id: dishId});
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);

      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 0)));
      expect(hookResponse.data).toStrictEqual({id: dishId});
      expect(window.localStorage.getItem(CACHE)).toStrictEqual(JSON.stringify([{id: 3}, {id: dishId}, {id: 4}]));
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);
    });
  });

  describe('useDishesByIds', () => {
    it('should not get dishes when dishesId is not present', async () => {
      mountComponent(() => useDishesByIds(), {}, false);
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 0)));
      expect(hookResponse).toStrictEqual({dishes: [], isAnyFetching: false});
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);
    });

    it('should not get dishes when dishesId has invalid values', async () => {
      mountComponent(() => useDishesByIds([undefined, null, 0, null, '']), {}, false);
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 0)));
      expect(hookResponse).toStrictEqual({dishes: [], isAnyFetching: false});
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(removeQueriesStub, 0);
    });

    it('should fetch 2 dishes', async () => {
      const dishesId = [2, undefined, 3, null, 1, 0, 3, 4, null, 3, 1, '', 2];
      const dish1 = {id: 1, name: 'test 1'};
      const dish2 = {id: 2, name: 'test 2'};
      const dish3 = {id: 3, name: 'test 3'};
      const dish4 = {id: 4, name: 'test 4'};
      const body2 = {query: `{dish(id: 2) {${FIELDS}}}`};
      const body3 = {query: `{dish(id: 3) {${FIELDS}}}`};
      graphqlStub.withArgs(dispatchStub, body2).returns({data: {dish: dish2}});
      graphqlStub.withArgs(dispatchStub, body3).returns({data: {dish: dish3}});
      window.localStorage.setItem(CACHE, JSON.stringify([dish1, dish4]));

      mountComponent(() => useDishesByIds(dishesId), {}, false);
      expect(hookResponse).toStrictEqual({dishes: [], isAnyFetching: true});

      // wait until fire all useQueries
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 2)));
      expect(hookResponse).toStrictEqual({dishes: [dish2, dish3, dish1, dish4], isAnyFetching: false});
      expect(window.localStorage.getItem(CACHE)).toStrictEqual(JSON.stringify([dish1, dish4, dish2, dish3]));
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 2);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body2);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body3);
      sinon.assert.callCount(removeQueriesStub, 0);
    });
  });
});