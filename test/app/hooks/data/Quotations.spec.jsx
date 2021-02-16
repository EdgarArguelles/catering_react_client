/* eslint-disable max-lines */
import sinon from 'sinon';
import {act} from 'react-test-renderer';
import {waitFor} from '@testing-library/react';
import React from 'react';
import {renderQueryComponent} from 'app/../../test/TestHelper';
import Api from 'app/common/Api';
import Utils from 'app/common/Utils';
import {useQuotation, useQuotations} from 'app/hooks/data/Quotations';

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

      // wait until fire useQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));
      expect(hookResponse.data).toStrictEqual({id: 1});
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
      const jsonExpected = {data: {quotationPage: {content: [1, 2, 3], totalElements: 15, totalPages: 6}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);
      const dataExpected = {
        pageParams: [undefined],
        pages: [{quotations: [1, 2, 3], metaData: {pagination: pageParam, totalElements: 15, totalPages: 6}}],
      };

      mountComponent(() => useQuotations(), {auth: {loggedUser: {}}}, false);

      // wait until fire useInfiniteQuery
      await act(() => waitFor(() => sinon.assert.callCount(graphqlStub, 1)));
      expect(hookResponse.data).toStrictEqual(dataExpected);
      expect(hookResponse.quotations).toStrictEqual([1, 2, 3]);
      expect(hookResponse.metaData).toStrictEqual({pagination: pageParam, totalElements: 15, totalPages: 6});
      sinon.assert.callCount(dispatchStub, 0);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(invalidateQueriesStub, 0);
    });
  });
});