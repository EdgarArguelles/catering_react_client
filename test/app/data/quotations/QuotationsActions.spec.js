/* eslint-disable max-lines */
import {expect} from 'chai';
import sinon from 'sinon';
import Api from '../../../../src/app/common/Api';
import QuotationsActions, {ACTION_TYPES} from '../../../../src/app/data/quotations/QuotationsActions';

describe('Data -> Quotations -> Actions', () => {
  const dispatchStub = sinon.stub();
  const graphqlStub = sinon.stub(Api, 'graphql');

  afterEach(() => {
    dispatchStub.reset();
    graphqlStub.reset();
  });

  describe('cleanError', () => {
    it('should dispatch QUOTATIONS_CLEAN_ERROR', () => {
      const result = QuotationsActions.cleanError();

      expect(result).to.deep.equal({type: ACTION_TYPES.QUOTATIONS_CLEAN_ERROR});
    });
  });

  describe('cleanQuotations', () => {
    it('should dispatch QUOTATIONS_CLEAN_QUOTATIONS', () => {
      const result = QuotationsActions.cleanQuotations();

      expect(result).to.deep.equal({type: ACTION_TYPES.QUOTATIONS_CLEAN_QUOTATIONS});
    });
  });

  describe('fetchQuotations', () => {
    const pagination = {page: 5};
    const FIELDS = 'totalElements totalPages content{id name createdAt price}';
    const body = {query: `{quotationPage(pageDataRequest: {page:5}) {${FIELDS}}}`};

    it('should dispatch FETCH_QUOTATIONS_REQUEST and FETCH_QUOTATIONS_SUCCESS', async () => {
      const jsonExpected = {data: {quotationPage: {totalElements: 5, totalPages: 3, content: [{id: 1}, {id: 2}]}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      const result = await QuotationsActions.fetchQuotations(pagination)(dispatchStub);

      expect(result).to.deep.equal(jsonExpected);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(dispatchStub, 2);
      sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.FETCH_QUOTATIONS_REQUEST});
      sinon.assert.calledWithExactly(dispatchStub, {
        type: ACTION_TYPES.FETCH_QUOTATIONS_SUCCESS,
        payload: {
          data: [{id: 1}, {id: 2}],
          metaData: {pagination: {page: 5}, totalElements: 5, totalPages: 3},
        },
      });
      // don't mutate
      expect(pagination).to.deep.equal({page: 5});
    });

    it('should dispatch FETCH_QUOTATIONS_REQUEST and FETCH_QUOTATIONS_ERROR', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

      try {
        await QuotationsActions.fetchQuotations(pagination)(dispatchStub);
        throw new Error('promise should fail but it did not!!!!');
      } catch (error) {
        expect(error).to.deep.equal(errorExpected);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.FETCH_QUOTATIONS_REQUEST});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: ACTION_TYPES.FETCH_QUOTATIONS_ERROR,
          error: true,
          payload: errorExpected,
        });
        // don't mutate
        expect(pagination).to.deep.equal({page: 5});
      }
    });
  });

  describe('fetchQuotation', () => {
    const quotationId = 8;
    const FIELDS = 'id name createdAt price menus{id name quantity courses{id position type{id} dishes{id price}}}';
    const body = {query: `{quotation(id: ${quotationId}) {${FIELDS}}}`};

    it('should dispatch FETCH_QUOTATION_REQUEST and FETCH_QUOTATION_SUCCESS', async () => {
      const overwriteLocalChanges = false;
      const jsonExpected = {data: {quotation: {value: 'test'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      const result = await QuotationsActions.fetchQuotation(quotationId, overwriteLocalChanges)(dispatchStub);

      expect(result).to.deep.equal(jsonExpected);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(dispatchStub, 2);
      sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.FETCH_QUOTATION_REQUEST});
      sinon.assert.calledWithExactly(dispatchStub, {
        type: ACTION_TYPES.FETCH_QUOTATION_SUCCESS,
        payload: {
          data: {value: 'test'},
        },
      });
      // don't mutate
      expect(quotationId).to.deep.equal(8);
      expect(overwriteLocalChanges).to.deep.equal(false);
    });

    it('should dispatch FETCH_QUOTATION_REQUEST, FETCH_QUOTATION_SUCCESS and' +
      ' QUOTATION_OVERWRITE_LOCAL', async () => {
      const jsonExpected = {data: {quotation: {value: 'test'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      const result = await QuotationsActions.fetchQuotation(quotationId)(dispatchStub);

      expect(result).to.deep.equal(jsonExpected);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(dispatchStub, 3);
      sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.FETCH_QUOTATION_REQUEST});
      sinon.assert.calledWithExactly(dispatchStub, {
        type: ACTION_TYPES.FETCH_QUOTATION_SUCCESS,
        payload: {
          data: {value: 'test'},
        },
      });
      sinon.assert.calledWithExactly(dispatchStub, {
        type: ACTION_TYPES.QUOTATION_OVERWRITE_LOCAL,
        payload: {
          data: {value: 'test'},
        },
      });
      // don't mutate
      expect(quotationId).to.deep.equal(8);
    });

    it('should dispatch FETCH_QUOTATION_REQUEST and FETCH_QUOTATION_ERROR ' +
      'with overwriteLocalChanges false', async () => {
      const overwriteLocalChanges = false;
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

      try {
        await QuotationsActions.fetchQuotation(quotationId, overwriteLocalChanges)(dispatchStub);
        throw new Error('promise should fail but it did not!!!!');
      } catch (error) {
        expect(error).to.deep.equal(errorExpected);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.FETCH_QUOTATION_REQUEST});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: ACTION_TYPES.FETCH_QUOTATION_ERROR,
          error: true,
          payload: errorExpected,
        });
        // don't mutate
        expect(quotationId).to.deep.equal(8);
        expect(overwriteLocalChanges).to.deep.equal(false);
      }
    });

    it('should dispatch FETCH_QUOTATION_REQUEST and FETCH_QUOTATION_ERROR ' +
      'with overwriteLocalChanges true', async () => {
      const overwriteLocalChanges = true;
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

      try {
        await QuotationsActions.fetchQuotation(quotationId, overwriteLocalChanges)(dispatchStub);
        throw new Error('promise should fail but it did not!!!!');
      } catch (error) {
        expect(error).to.deep.equal(errorExpected);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.FETCH_QUOTATION_REQUEST});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: ACTION_TYPES.FETCH_QUOTATION_ERROR,
          error: true,
          payload: errorExpected,
        });
        // don't mutate
        expect(quotationId).to.deep.equal(8);
        expect(overwriteLocalChanges).to.deep.equal(true);
      }
    });
  });

  describe('createQuotation', () => {
    const quotation = {id: 8, menus: [{id: 1}, {id: 2}]};
    const body = {query: 'mutation {createQuotation(quotation: {id:8,menus:[{id:1},{id:2}]}) {id}}'};

    it('should dispatch CREATE_QUOTATIONS_REQUEST and CREATE_QUOTATIONS_SUCCESS', async () => {
      const jsonExpected = {data: {createQuotation: {value: 'test'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      const result = await QuotationsActions.createQuotation(quotation)(dispatchStub);

      expect(result).to.deep.equal(jsonExpected);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(dispatchStub, 2);
      sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.CREATE_QUOTATIONS_REQUEST});
      sinon.assert.calledWithExactly(dispatchStub, {
        type: ACTION_TYPES.CREATE_QUOTATIONS_SUCCESS,
        payload: {
          data: {value: 'test'},
        },
      });
      // don't mutate
      expect(quotation).to.deep.equal({id: 8, menus: [{id: 1}, {id: 2}]});
    });

    it('should dispatch CREATE_QUOTATIONS_REQUEST and CREATE_QUOTATIONS_ERROR', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

      try {
        await QuotationsActions.createQuotation(quotation)(dispatchStub);
        throw new Error('promise should fail but it did not!!!!');
      } catch (error) {
        expect(error).to.deep.equal(errorExpected);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.CREATE_QUOTATIONS_REQUEST});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: ACTION_TYPES.CREATE_QUOTATIONS_ERROR,
          error: true,
          payload: errorExpected,
        });
        // don't mutate
        expect(quotation).to.deep.equal({id: 8, menus: [{id: 1}, {id: 2}]});
      }
    });
  });

  describe('editQuotation', () => {
    const quotation = {id: 8, menus: [{id: 1}, {id: 2}]};
    const body = {query: 'mutation {updateQuotation(quotation: {id:8,menus:[{id:1},{id:2}]}) {id}}'};

    it('should dispatch EDIT_QUOTATIONS_REQUEST and EDIT_QUOTATIONS_SUCCESS', async () => {
      const jsonExpected = {data: {updateQuotation: {value: 'test'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      const result = await QuotationsActions.editQuotation(quotation)(dispatchStub);

      expect(result).to.deep.equal(jsonExpected);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(dispatchStub, 2);
      sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.EDIT_QUOTATIONS_REQUEST});
      sinon.assert.calledWithExactly(dispatchStub, {
        type: ACTION_TYPES.EDIT_QUOTATIONS_SUCCESS,
        payload: {
          data: {value: 'test'},
        },
      });
      // don't mutate
      expect(quotation).to.deep.equal({id: 8, menus: [{id: 1}, {id: 2}]});
    });

    it('should dispatch EDIT_QUOTATIONS_REQUEST and EDIT_QUOTATIONS_ERROR', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

      try {
        await QuotationsActions.editQuotation(quotation)(dispatchStub);
        throw new Error('promise should fail but it did not!!!!');
      } catch (error) {
        expect(error).to.deep.equal(errorExpected);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.EDIT_QUOTATIONS_REQUEST});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: ACTION_TYPES.EDIT_QUOTATIONS_ERROR,
          error: true,
          payload: errorExpected,
        });
        // don't mutate
        expect(quotation).to.deep.equal({id: 8, menus: [{id: 1}, {id: 2}]});
      }
    });
  });

  describe('deleteQuotation', () => {
    const quotationId = 5;
    const body = {query: 'mutation {deleteQuotation(id: 5) {id}}'};

    it('should dispatch DELETE_QUOTATIONS_REQUEST and DELETE_QUOTATIONS_SUCCESS', async () => {
      const jsonExpected = {data: {deleteQuotation: {value: 'test'}}};
      graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

      const result = await QuotationsActions.deleteQuotation(quotationId)(dispatchStub);

      expect(result).to.deep.equal(jsonExpected);
      sinon.assert.callCount(graphqlStub, 1);
      sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
      sinon.assert.callCount(dispatchStub, 2);
      sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.DELETE_QUOTATIONS_REQUEST});
      sinon.assert.calledWithExactly(dispatchStub, {
        type: ACTION_TYPES.DELETE_QUOTATIONS_SUCCESS,
        payload: {
          data: {value: 'test'},
        },
      });
      // don't mutate
      expect(quotationId).to.deep.equal(5);
    });

    it('should dispatch DELETE_QUOTATIONS_REQUEST and DELETE_QUOTATIONS_ERROR', async () => {
      const errorExpected = new Error('error 1');
      graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

      try {
        await QuotationsActions.deleteQuotation(quotationId)(dispatchStub);
        throw new Error('promise should fail but it did not!!!!');
      } catch (error) {
        expect(error).to.deep.equal(errorExpected);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: ACTION_TYPES.DELETE_QUOTATIONS_REQUEST});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: ACTION_TYPES.DELETE_QUOTATIONS_ERROR,
          error: true,
          payload: errorExpected,
        });
        // don't mutate
        expect(quotationId).to.deep.equal(5);
      }
    });
  });
});