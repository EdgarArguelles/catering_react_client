/* eslint-disable max-lines */
import {expect} from 'chai';
import sinon from 'sinon';
import {ACTION_TYPES as API_ACTION_TYPES} from '../../../../src/app/common/Api';
import {ACTION_TYPES as AUTH_ACTION_TYPES} from '../../../../src/app/features/auth/AuthActions';
import {ACTION_TYPES} from '../../../../src/app/data/quotations/QuotationsActions';
import {
  quotations,
  quotationsError,
  quotationsFetching,
  quotationsMetaData,
  quotationsUpdateFetching,
} from '../../../../src/app/data/quotations/QuotationsReducer';
import Utils from '../../../../src/app/common/Utils';

describe('Data -> Quotations -> Reducer', () => {
  describe('quotationsFetching', () => {
    it('should get default state when empty', () => {
      const state = false;

      const result = quotationsFetching();

      expect(result).to.deep.equal(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = true;

      const result = quotationsFetching(state, {type: 'invalid'});

      expect(result).to.deep.equal(state);
      // don't mutate
      expect(state).to.deep.equal(true);
    });

    it('should get true when action is FETCH_QUOTATIONS_REQUEST', () => {
      const state = false;
      const stateExpected = true;
      const action = {type: ACTION_TYPES.FETCH_QUOTATIONS_REQUEST};

      const result = quotationsFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(false);
    });

    it('should get true when action is FETCH_QUOTATION_REQUEST', () => {
      const state = false;
      const stateExpected = true;
      const action = {type: ACTION_TYPES.FETCH_QUOTATION_REQUEST};

      const result = quotationsFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(false);
    });

    it('should get false when action is FETCH_QUOTATIONS_SUCCESS', () => {
      const state = true;
      const stateExpected = false;
      const action = {type: ACTION_TYPES.FETCH_QUOTATIONS_SUCCESS};

      const result = quotationsFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(true);
    });

    it('should get false when action is FETCH_QUOTATIONS_ERROR', () => {
      const state = true;
      const stateExpected = false;
      const action = {type: ACTION_TYPES.FETCH_QUOTATIONS_ERROR};

      const result = quotationsFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(true);
    });

    it('should get false when action is FETCH_QUOTATION_SUCCESS', () => {
      const state = true;
      const stateExpected = false;
      const action = {type: ACTION_TYPES.FETCH_QUOTATION_SUCCESS};

      const result = quotationsFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(true);
    });

    it('should get false when action is FETCH_QUOTATION_ERROR', () => {
      const state = true;
      const stateExpected = false;
      const action = {type: ACTION_TYPES.FETCH_QUOTATION_ERROR};

      const result = quotationsFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(true);
    });
  });

  describe('quotationsUpdateFetching', () => {
    it('should get default state when empty', () => {
      const state = false;

      const result = quotationsUpdateFetching();

      expect(result).to.deep.equal(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = true;

      const result = quotationsUpdateFetching(state, {type: 'invalid'});

      expect(result).to.deep.equal(state);
      // don't mutate
      expect(state).to.deep.equal(true);
    });

    it('should get true when action is CREATE_QUOTATIONS_REQUEST', () => {
      const state = false;
      const stateExpected = true;
      const action = {type: ACTION_TYPES.CREATE_QUOTATIONS_REQUEST};

      const result = quotationsUpdateFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(false);
    });

    it('should get true when action is EDIT_QUOTATIONS_REQUEST', () => {
      const state = false;
      const stateExpected = true;
      const action = {type: ACTION_TYPES.EDIT_QUOTATIONS_REQUEST};

      const result = quotationsUpdateFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(false);
    });

    it('should get true when action is DELETE_QUOTATIONS_REQUEST', () => {
      const state = false;
      const stateExpected = true;
      const action = {type: ACTION_TYPES.DELETE_QUOTATIONS_REQUEST};

      const result = quotationsUpdateFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(false);
    });

    it('should get false when action is CREATE_QUOTATIONS_SUCCESS', () => {
      const state = true;
      const stateExpected = false;
      const action = {type: ACTION_TYPES.CREATE_QUOTATIONS_SUCCESS};

      const result = quotationsUpdateFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(true);
    });

    it('should get false when action is CREATE_QUOTATIONS_ERROR', () => {
      const state = true;
      const stateExpected = false;
      const action = {type: ACTION_TYPES.CREATE_QUOTATIONS_ERROR};

      const result = quotationsUpdateFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(true);
    });

    it('should get false when action is EDIT_QUOTATIONS_SUCCESS', () => {
      const state = true;
      const stateExpected = false;
      const action = {type: ACTION_TYPES.EDIT_QUOTATIONS_SUCCESS};

      const result = quotationsUpdateFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(true);
    });

    it('should get false when action is EDIT_QUOTATIONS_ERROR', () => {
      const state = true;
      const stateExpected = false;
      const action = {type: ACTION_TYPES.EDIT_QUOTATIONS_ERROR};

      const result = quotationsUpdateFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(true);
    });

    it('should get false when action is DELETE_QUOTATIONS_SUCCESS', () => {
      const state = true;
      const stateExpected = false;
      const action = {type: ACTION_TYPES.DELETE_QUOTATIONS_SUCCESS};

      const result = quotationsUpdateFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(true);
    });

    it('should get false when action is DELETE_QUOTATIONS_ERROR', () => {
      const state = true;
      const stateExpected = false;
      const action = {type: ACTION_TYPES.DELETE_QUOTATIONS_ERROR};

      const result = quotationsUpdateFetching(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal(true);
    });
  });

  describe('quotationsError', () => {
    it('should get default state when empty', () => {
      const state = null;

      const result = quotationsError();

      expect(result).to.deep.equal(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {id: 'error1'};

      const result = quotationsError(state, {type: 'invalid'});

      expect(result).to.deep.equal(state);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should get null when action is QUOTATIONS_CLEAN_ERROR', () => {
      const state = {id: 'error1'};
      const stateExpected = null;
      const action = {type: ACTION_TYPES.QUOTATIONS_CLEAN_ERROR};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should get null when action is FETCH_QUOTATIONS_REQUEST', () => {
      const state = {id: 'error1'};
      const stateExpected = null;
      const action = {type: ACTION_TYPES.FETCH_QUOTATIONS_REQUEST};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should get null when action is FETCH_QUOTATIONS_SUCCESS', () => {
      const state = {id: 'error1'};
      const stateExpected = null;
      const action = {type: ACTION_TYPES.FETCH_QUOTATIONS_SUCCESS};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should get null when action is FETCH_QUOTATION_REQUEST', () => {
      const state = {id: 'error1'};
      const stateExpected = null;
      const action = {type: ACTION_TYPES.FETCH_QUOTATION_REQUEST};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should get null when action is FETCH_QUOTATION_SUCCESS', () => {
      const state = {id: 'error1'};
      const stateExpected = null;
      const action = {type: ACTION_TYPES.FETCH_QUOTATION_SUCCESS};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should get null when action is CREATE_QUOTATIONS_REQUEST', () => {
      const state = {id: 'error1'};
      const stateExpected = null;
      const action = {type: ACTION_TYPES.CREATE_QUOTATIONS_REQUEST};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should get null when action is CREATE_QUOTATIONS_SUCCESS', () => {
      const state = {id: 'error1'};
      const stateExpected = null;
      const action = {type: ACTION_TYPES.CREATE_QUOTATIONS_SUCCESS};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should get null when action is EDIT_QUOTATIONS_REQUEST', () => {
      const state = {id: 'error1'};
      const stateExpected = null;
      const action = {type: ACTION_TYPES.EDIT_QUOTATIONS_REQUEST};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should get null when action is EDIT_QUOTATIONS_SUCCESS', () => {
      const state = {id: 'error1'};
      const stateExpected = null;
      const action = {type: ACTION_TYPES.EDIT_QUOTATIONS_SUCCESS};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should get null when action is DELETE_QUOTATIONS_REQUEST', () => {
      const state = {id: 'error1'};
      const stateExpected = null;
      const action = {type: ACTION_TYPES.DELETE_QUOTATIONS_REQUEST};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should get null when action is DELETE_QUOTATIONS_SUCCESS', () => {
      const state = {id: 'error1'};
      const stateExpected = null;
      const action = {type: ACTION_TYPES.DELETE_QUOTATIONS_SUCCESS};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should set error when action is FETCH_QUOTATIONS_ERROR', () => {
      const state = {id: 'error1'};
      const stateExpected = {id: 'new error'};
      const action = {type: ACTION_TYPES.FETCH_QUOTATIONS_ERROR, payload: {id: 'new error'}};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should set error when action is FETCH_QUOTATION_ERROR', () => {
      const state = {id: 'error1'};
      const stateExpected = {id: 'new error'};
      const action = {type: ACTION_TYPES.FETCH_QUOTATION_ERROR, payload: {id: 'new error'}};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should set error when action is CREATE_QUOTATIONS_ERROR', () => {
      const state = {id: 'error1'};
      const stateExpected = {id: 'new error'};
      const action = {type: ACTION_TYPES.CREATE_QUOTATIONS_ERROR, payload: {id: 'new error'}};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should set error when action is EDIT_QUOTATIONS_ERROR', () => {
      const state = {id: 'error1'};
      const stateExpected = {id: 'new error'};
      const action = {type: ACTION_TYPES.EDIT_QUOTATIONS_ERROR, payload: {id: 'new error'}};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });

    it('should set error when action is DELETE_QUOTATIONS_ERROR', () => {
      const state = {id: 'error1'};
      const stateExpected = {id: 'new error'};
      const action = {type: ACTION_TYPES.DELETE_QUOTATIONS_ERROR, payload: {id: 'new error'}};

      const result = quotationsError(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'error1'});
    });
  });

  describe('quotationsMetaData', () => {
    it('should get default state when empty', () => {
      const state = null;

      const result = quotationsMetaData();

      expect(result).to.deep.equal(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {id: 'meta1'};

      const result = quotationsMetaData(state, {type: 'invalid'});

      expect(result).to.deep.equal(state);
      // don't mutate
      expect(state).to.deep.equal({id: 'meta1'});
    });

    it('should get null when action is SESSION_EXPIRED', () => {
      const state = {id: 'meta1'};
      const stateExpected = null;
      const action = {type: API_ACTION_TYPES.SESSION_EXPIRED};

      const result = quotationsMetaData(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'meta1'});
    });

    it('should get null when action is PING_USER_ERROR', () => {
      const state = {id: 'meta1'};
      const stateExpected = null;
      const action = {type: AUTH_ACTION_TYPES.PING_USER_ERROR};

      const result = quotationsMetaData(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'meta1'});
    });

    it('should get null when action is LOGOUT', () => {
      const state = {id: 'meta1'};
      const stateExpected = null;
      const action = {type: AUTH_ACTION_TYPES.LOGOUT};

      const result = quotationsMetaData(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'meta1'});
    });

    it('should get null when action is CREATE_QUOTATIONS_SUCCESS', () => {
      const state = {id: 'meta1'};
      const stateExpected = null;
      const action = {type: ACTION_TYPES.CREATE_QUOTATIONS_SUCCESS};

      const result = quotationsMetaData(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'meta1'});
    });

    it('should get null when action is EDIT_QUOTATIONS_SUCCESS', () => {
      const state = {id: 'meta1'};
      const stateExpected = null;
      const action = {type: ACTION_TYPES.EDIT_QUOTATIONS_SUCCESS};

      const result = quotationsMetaData(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'meta1'});
    });

    it('should get null when action is DELETE_QUOTATIONS_SUCCESS', () => {
      const state = {id: 'meta1'};
      const stateExpected = null;
      const action = {type: ACTION_TYPES.DELETE_QUOTATIONS_SUCCESS};

      const result = quotationsMetaData(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'meta1'});
    });

    it('should get null when action is QUOTATIONS_CLEAN_QUOTATIONS', () => {
      const state = {id: 'meta1'};
      const stateExpected = null;
      const action = {type: ACTION_TYPES.QUOTATIONS_CLEAN_QUOTATIONS};

      const result = quotationsMetaData(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'meta1'});
    });

    it('should replace metadata when action is FETCH_QUOTATIONS_SUCCESS', () => {
      const state = {id: 'meta1', old: 'old1'};
      const stateExpected = {id: 'meta2', extra: 5};
      const action = {
        type: ACTION_TYPES.FETCH_QUOTATIONS_SUCCESS,
        payload: {metaData: {id: 'meta2', extra: 5}},
      };

      const result = quotationsMetaData(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({id: 'meta1', old: 'old1'});
    });
  });

  describe('quotations', () => {
    const arrayToObjectStub = sinon.stub(Utils, 'arrayToObject');

    afterEach(() => {
      arrayToObjectStub.reset();
    });

    it('should get default state when empty', () => {
      const state = null;

      const result = quotations();

      expect(result).to.deep.equal(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        'id-1': {id: 'id-1'},
        'id-2': {id: 'id-2', name: '123'},
        'id-3': {id: 'id-3'},
      };

      const result = quotations(state, {type: 'invalid'});

      expect(result).to.deep.equal(state);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1'},
        'id-2': {id: 'id-2', name: '123'},
        'id-3': {id: 'id-3'},
      });
    });

    it('should set to null when action is SESSION_EXPIRED', () => {
      const state = {
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      };
      const stateExpected = null;
      const data = [{id: 'id-3', name: 'abc'}, {id: 'id-5', name: 'abc2'}, {id: 'id-6', name: 'abc3'}];
      const action = {type: API_ACTION_TYPES.SESSION_EXPIRED, payload: {body: {data: data}}};

      const result = quotations(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      });
    });

    it('should set to null when action is PING_USER_ERROR', () => {
      const state = {
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      };
      const stateExpected = null;
      const data = [{id: 'id-3', name: 'abc'}, {id: 'id-5', name: 'abc2'}, {id: 'id-6', name: 'abc3'}];
      const action = {type: AUTH_ACTION_TYPES.PING_USER_ERROR, payload: {body: {data: data}}};

      const result = quotations(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      });
    });

    it('should set to null when action is LOGOUT', () => {
      const state = {
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      };
      const stateExpected = null;
      const data = [{id: 'id-3', name: 'abc'}, {id: 'id-5', name: 'abc2'}, {id: 'id-6', name: 'abc3'}];
      const action = {type: AUTH_ACTION_TYPES.LOGOUT, payload: {body: {data: data}}};

      const result = quotations(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      });
    });

    it('should set to null when action is CREATE_QUOTATIONS_SUCCESS', () => {
      const state = {
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      };
      const stateExpected = null;
      const data = [{id: 'id-3', name: 'abc'}, {id: 'id-5', name: 'abc2'}, {id: 'id-6', name: 'abc3'}];
      const action = {type: ACTION_TYPES.CREATE_QUOTATIONS_SUCCESS, payload: {body: {data: data}}};

      const result = quotations(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      });
    });

    it('should set to null when action is EDIT_QUOTATIONS_SUCCESS', () => {
      const state = {
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      };
      const stateExpected = null;
      const data = [{id: 'id-3', name: 'abc'}, {id: 'id-5', name: 'abc2'}, {id: 'id-6', name: 'abc3'}];
      const action = {type: ACTION_TYPES.EDIT_QUOTATIONS_SUCCESS, payload: {body: {data: data}}};

      const result = quotations(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      });
    });

    it('should set to null when action is DELETE_QUOTATIONS_SUCCESS', () => {
      const state = {
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      };
      const stateExpected = null;
      const data = [{id: 'id-3', name: 'abc'}, {id: 'id-5', name: 'abc2'}, {id: 'id-6', name: 'abc3'}];
      const action = {type: ACTION_TYPES.DELETE_QUOTATIONS_SUCCESS, payload: {body: {data: data}}};

      const result = quotations(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      });
    });

    it('should set to null when action is QUOTATIONS_CLEAN_QUOTATIONS', () => {
      const state = {
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      };
      const stateExpected = null;
      const data = [{id: 'id-3', name: 'abc'}, {id: 'id-5', name: 'abc2'}, {id: 'id-6', name: 'abc3'}];
      const action = {type: ACTION_TYPES.QUOTATIONS_CLEAN_QUOTATIONS, payload: {body: {data: data}}};

      const result = quotations(state, action);

      expect(result).to.deep.equal(stateExpected);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      });
    });

    it('should load quotations when action is FETCH_QUOTATIONS_SUCCESS', () => {
      const state = {
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      };
      const stateExpected = {
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
        'id-6': {id: 'id-6', name: 'abc3'},
      };
      const stateMocked = {
        'id-1': {id: 'id-1', name: 'ct111'},
        'id-2': {id: 'id-2', name: 'ct222'},
        'id-5': {id: 'id-5'},
        'id-6': {id: 'id-6', name: 'abc3'},
      };
      const data = 'test';
      const action = {type: ACTION_TYPES.FETCH_QUOTATIONS_SUCCESS, payload: {data}};
      arrayToObjectStub.withArgs(data).returns(stateMocked);

      const result = quotations(state, action);

      expect(result).to.deep.equal(stateExpected);
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, data);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5'},
      });
    });

    it('should replace quotation when action is FETCH_QUOTATION_SUCCESS and quotation is present', () => {
      const state = {
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123', extra: '123'},
        'id-4': {id: 'id-4'},
      };
      const stateExpected = {
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: 'abc', more: 'a12'},
        'id-4': {id: 'id-4'},
      };
      const data = 'test';
      const action = {type: ACTION_TYPES.FETCH_QUOTATION_SUCCESS, payload: {data}};
      arrayToObjectStub.withArgs([data]).returns({
        'id-3': {
          id: 'id-3',
          name: 'abc',
          more: 'a12',
        },
      });

      const result = quotations(state, action);

      expect(result).to.deep.equal(stateExpected);
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, [data]);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123', extra: '123'},
        'id-4': {id: 'id-4'},
      });
    });

    it('should add quotation when action is FETCH_QUOTATION_SUCCESS and quotation is not present', () => {
      const state = {
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123', extra: '123'},
        'id-4': {id: 'id-4'},
      };
      const stateExpected = {
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123', extra: '123'},
        'id-4': {id: 'id-4'},
        'id-5': {id: 'id-5', name: 'abc'},
      };
      const data = 'test';
      const action = {type: ACTION_TYPES.FETCH_QUOTATION_SUCCESS, payload: {data}};
      arrayToObjectStub.withArgs([data]).returns({'id-5': {id: 'id-5', name: 'abc'}});

      const result = quotations(state, action);

      expect(result).to.deep.equal(stateExpected);
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, [data]);
      // don't mutate
      expect(state).to.deep.equal({
        'id-1': {id: 'id-1', name: 'ct1'},
        'id-2': {id: 'id-2', name: 'ct2'},
        'id-3': {id: 'id-3', name: '123', extra: '123'},
        'id-4': {id: 'id-4'},
      });
    });
  });
});