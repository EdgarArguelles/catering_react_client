/* eslint-disable max-lines */
import sinon from 'sinon';
import {act} from 'react-test-renderer';
import {waitFor} from '@testing-library/react';
import React from 'react';
import {renderQueryComponent} from 'app/../../test/TestHelper';
import Api from 'app/common/Api';
import Utils from 'app/common/Utils';
import {
  QUOTATIONS_KEY,
  useCreateQuotation,
  useDeleteQuotation,
  useEditQuotation,
  useQuotation,
  useQuotations,
} from 'app/hooks/data/Quotations';
import {changeError, changeFetching} from 'app/data/quotations/QuotationsReducer';

describe('Hooks -> Data -> Quotations', () => {
  const dispatchStub = sinon.stub();
  const graphqlStub = sinon.stub(Api, 'graphql');
  const invalidateQueriesStub = sinon.stub();
  let hookResponse;

  afterEach(() => {
    dispatchStub.reset();
    graphqlStub.reset();
    invalidateQueriesStub.reset();
    hookResponse = undefined;
  });

  const mountComponent = renderQueryComponent(({hook}) => {
    hookResponse = hook();
    return <div/>;
  }, {dispatchStub, invalidateQueriesStub});

  describe('useQuotation', () => {
    const quotationId = 5;
    const FIELDS = 'id name createdAt price menus{id name quantity courses{id position type{id} dishes{id price}}}';
    const body = {query: `{quotation(id: ${quotationId}) {${FIELDS}}}`};

    it('should not get quotation when loggedUser is not present', async () => {
      mountComponent(() => useQuotation(quotationId), {auth: {loggedUser: null}}, false);

      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 0)));
      expect(hookResponse.data).toBeUndefined();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(invalidateQueriesStub, 0);
    });

    it('should not get quotation when quotationId is not present', async () => {
      mountComponent(() => useQuotation(), {auth: {loggedUser: {}}}, false);

      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 0)));
      expect(hookResponse.data).toBeUndefined();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(invalidateQueriesStub, 0);
    });

    it('should get quotation when quotationId is present', async () => {
      const jsonExpected = {data: {quotation: {id: 1}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      mountComponent(() => useQuotation(quotationId), {auth: {loggedUser: {}}}, false);
      expect(hookResponse.data).toBeUndefined();
      expect(hookResponse.isFetching).toBeTruthy();

      // wait until fire useQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));
      expect(hookResponse.data).toStrictEqual({id: 1});
      expect(hookResponse.isFetching).toBeFalsy();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(invalidateQueriesStub, 0);
    });
  });

  describe('useQuotations', () => {
    const FIELDS = 'totalElements totalPages content{id name createdAt price}';
    const pageParam = {page: 0, size: 5, sort: ['createdAt'], direction: 'DESC'};
    const body = {query: `{quotationPage(pageDataRequest: ${Utils.stringifyPageDataRequest(pageParam)}) {${FIELDS}}}`};

    it('should not get quotations when loggedUser is not present', async () => {
      mountComponent(() => useQuotations(), {auth: {loggedUser: null}}, false);

      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 0)));
      expect(hookResponse.data).toBeUndefined();
      expect(hookResponse.quotations).toBeUndefined();
      expect(hookResponse.metaData).toBeUndefined();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 0);
      sinon.assert.callCount(invalidateQueriesStub, 0);
    });

    it('should get quotations when loggedUser is present', async () => {
      const jsonExpected = {data: {quotationPage: {content: [1, 2, 3], totalElements: 5, totalPages: 2}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
      const dataExpected = {
        pageParams: [undefined],
        pages: [{quotations: [1, 2, 3], metaData: {pagination: pageParam, totalElements: 5, totalPages: 2}}],
      };

      mountComponent(() => useQuotations(), {auth: {loggedUser: {}}}, false);
      expect(hookResponse.data).toBeUndefined();
      expect(hookResponse.quotations).toBeUndefined();
      expect(hookResponse.metaData).toBeUndefined();
      expect(hookResponse.isFetching).toBeTruthy();

      // wait until fire useInfiniteQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));
      expect(hookResponse.data).toStrictEqual(dataExpected);
      expect(hookResponse.quotations).toStrictEqual([1, 2, 3]);
      expect(hookResponse.metaData).toStrictEqual({pagination: pageParam, totalElements: 5, totalPages: 2});
      expect(hookResponse.isFetching).toBeFalsy();
      expect(hookResponse.hasNextPage).toBeTruthy();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(invalidateQueriesStub, 0);
    });

    it('should call fetchNextPage', async () => {
      const jsonExpected = {data: {quotationPage: {content: [1, 2, 3], totalElements: 5, totalPages: 2}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
      const jsonExpected2 = {data: {quotationPage: {content: [4, 5], totalElements: 5, totalPages: 2}}};
      const pag = {page: 1, size: 5, sort: ['createdAt'], direction: 'DESC'};
      const body2 = {query: `{quotationPage(pageDataRequest: ${Utils.stringifyPageDataRequest(pag)}) {${FIELDS}}}`};
      graphqlStub.withArgs(dispatchStub, body2).returns(jsonExpected2);
      const dataExpected = {
        pageParams: [undefined],
        pages: [{quotations: [1, 2, 3], metaData: {pagination: pageParam, totalElements: 5, totalPages: 2}}],
      };
      const dataExpected2 = {
        pageParams: [undefined, pag],
        pages: [
          {quotations: [1, 2, 3], metaData: {pagination: pageParam, totalElements: 5, totalPages: 2}},
          {quotations: [4, 5], metaData: {pagination: pag, totalElements: 5, totalPages: 2}},
        ],
      };

      mountComponent(() => useQuotations(), {auth: {loggedUser: {}}}, false);

      // wait until fire useInfiniteQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));
      expect(hookResponse.data).toStrictEqual(dataExpected);
      expect(hookResponse.quotations).toStrictEqual([1, 2, 3]);
      expect(hookResponse.metaData).toStrictEqual({pagination: pageParam, totalElements: 5, totalPages: 2});
      expect(hookResponse.isFetching).toBeFalsy();
      expect(hookResponse.hasNextPage).toBeTruthy();

      // call fetchNextPage
      hookResponse.fetchNextPage();
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 2)));
      expect(hookResponse.data).toStrictEqual(dataExpected2);
      expect(hookResponse.quotations).toStrictEqual([1, 2, 3, 4, 5]);
      expect(hookResponse.metaData).toStrictEqual({pagination: pag, totalElements: 5, totalPages: 2});
      expect(hookResponse.isFetching).toBeFalsy();
      expect(hookResponse.hasNextPage).toBeFalsy();
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 2);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body2);
      sinon.assert.callCount(invalidateQueriesStub, 0);
    });
  });

  describe('useCreateQuotation', () => {
    const quotation = {
      id: 8,
      menus: [{id: 1, price: 123, isSelected: true}, {id: 2, price: 789, isSelected: false}],
    };
    const body = {query: 'mutation {createQuotation(quotation: {id:8,menus:[{id:1},{id:2}]}) {id}}'};

    it('should create quotation successfully', async () => {
      const jsonExpected = {data: {createQuotation: {id: 1}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      mountComponent(() => useCreateQuotation(), {auth: {loggedUser: {}}}, false);

      const result = await hookResponse.mutateAsync(quotation);
      expect(result).toStrictEqual({id: 1});
      sinon.assert.callCount(dispatchStub, 3);
      sinon.assert.calledWithExactly(dispatchStub, {type: changeFetching.type, payload: true});
      sinon.assert.calledWithExactly(dispatchStub, {type: changeError.type, payload: null});
      sinon.assert.calledWithExactly(dispatchStub, {type: changeFetching.type, payload: false});
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(invalidateQueriesStub, 1);
      sinon.assert.calledWithExactly(invalidateQueriesStub, QUOTATIONS_KEY);
    });

    it('should handle create quotation error', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

      mountComponent(() => useCreateQuotation(), {auth: {loggedUser: {}}}, false);

      try {
        await hookResponse.mutateAsync(quotation);
        // eslint-disable-next-line no-empty
      } catch (error) {
      }
      sinon.assert.callCount(dispatchStub, 4);
      sinon.assert.calledWithExactly(dispatchStub, {type: changeFetching.type, payload: true});
      sinon.assert.calledWithExactly(dispatchStub, {type: changeError.type, payload: null});
      sinon.assert.calledWithExactly(dispatchStub, {type: changeError.type, payload: errorExpected});
      sinon.assert.calledWithExactly(dispatchStub, {type: changeFetching.type, payload: false});
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(invalidateQueriesStub, 0);
    });
  });

  describe('useEditQuotation', () => {
    const quotation = {
      id: 9,
      menus: [{id: 1, price: 123, isSelected: true}, {id: 2, price: 789, isSelected: false}],
    };
    const body = {query: 'mutation {updateQuotation(quotation: {id:9,menus:[{id:1},{id:2}]}) {id}}'};

    it('should create quotation successfully', async () => {
      const jsonExpected = {data: {updateQuotation: {id: 1}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      mountComponent(() => useEditQuotation(), {auth: {loggedUser: {}}}, false);

      const result = await hookResponse.mutateAsync(quotation);
      expect(result).toStrictEqual({id: 1});
      sinon.assert.callCount(dispatchStub, 3);
      sinon.assert.calledWithExactly(dispatchStub, {type: changeFetching.type, payload: true});
      sinon.assert.calledWithExactly(dispatchStub, {type: changeError.type, payload: null});
      sinon.assert.calledWithExactly(dispatchStub, {type: changeFetching.type, payload: false});
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(invalidateQueriesStub, 1);
      sinon.assert.calledWithExactly(invalidateQueriesStub, QUOTATIONS_KEY);
    });

    it('should handle create quotation error', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

      mountComponent(() => useEditQuotation(), {auth: {loggedUser: {}}}, false);

      try {
        await hookResponse.mutateAsync(quotation);
        // eslint-disable-next-line no-empty
      } catch (error) {
      }
      sinon.assert.callCount(dispatchStub, 4);
      sinon.assert.calledWithExactly(dispatchStub, {type: changeFetching.type, payload: true});
      sinon.assert.calledWithExactly(dispatchStub, {type: changeError.type, payload: null});
      sinon.assert.calledWithExactly(dispatchStub, {type: changeError.type, payload: errorExpected});
      sinon.assert.calledWithExactly(dispatchStub, {type: changeFetching.type, payload: false});
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(invalidateQueriesStub, 0);
    });
  });

  describe('useDeleteQuotation', () => {
    const quotationId = 7;
    const body = {query: 'mutation {deleteQuotation(id: 7) {id}}'};

    it('should create quotation successfully', async () => {
      const jsonExpected = {data: {deleteQuotation: {id: 1}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      mountComponent(() => useDeleteQuotation(), {auth: {loggedUser: {}}}, false);

      const result = await hookResponse.mutateAsync(quotationId);
      expect(result).toStrictEqual({id: 1});
      sinon.assert.callCount(dispatchStub, 3);
      sinon.assert.calledWithExactly(dispatchStub, {type: changeFetching.type, payload: true});
      sinon.assert.calledWithExactly(dispatchStub, {type: changeError.type, payload: null});
      sinon.assert.calledWithExactly(dispatchStub, {type: changeFetching.type, payload: false});
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(invalidateQueriesStub, 1);
      sinon.assert.calledWithExactly(invalidateQueriesStub, QUOTATIONS_KEY);
    });

    it('should handle create quotation error', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

      mountComponent(() => useDeleteQuotation(), {auth: {loggedUser: {}}}, false);

      try {
        await hookResponse.mutateAsync(quotationId);
        // eslint-disable-next-line no-empty
      } catch (error) {
      }
      sinon.assert.callCount(dispatchStub, 4);
      sinon.assert.calledWithExactly(dispatchStub, {type: changeFetching.type, payload: true});
      sinon.assert.calledWithExactly(dispatchStub, {type: changeError.type, payload: null});
      sinon.assert.calledWithExactly(dispatchStub, {type: changeError.type, payload: errorExpected});
      sinon.assert.calledWithExactly(dispatchStub, {type: changeFetching.type, payload: false});
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(invalidateQueriesStub, 0);
    });
  });
});