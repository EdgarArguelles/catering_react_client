/* eslint-disable max-lines */
import sinon from 'sinon';
import Api, {ACTION_TYPES} from 'app/common/Api';
import Utils from 'app/common/Utils';
import {fetchPing, logout} from 'app/features/auth/AuthReducer';
import quotationsReducer, {
  cleanError,
  cleanQuotations,
  createQuotation,
  deleteQuotation,
  editQuotation,
  fetchQuotation,
  fetchQuotations,
} from 'app/data/quotations/QuotationsReducer';

describe('Data -> Quotations -> Reducer/Actions', () => {
  describe('Reducer', () => {
    const arrayToObjectStub = sinon.stub(Utils, 'arrayToObject');

    afterEach(() => arrayToObjectStub.reset());

    it('should get default state when undefined', () => {
      const state = {
        data: null,
        metaData: null,
        error: null,
        fetching: false,
      };

      const result = quotationsReducer(undefined, {type: 'invalid'});

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        data: {id: 'data1'},
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      };

      const result = quotationsReducer(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        data: {id: 'data1'},
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      });
    });

    it('should change data and metaData to null when action is cleanQuotations', () => {
      const state = {
        data: {id: 'data1'},
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      };
      const stateExpected = {
        data: null,
        metaData: null,
        error: {id: 'error1'},
        fetching: true,
      };
      const action = {type: cleanQuotations.type};

      const result = quotationsReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        data: {id: 'data1'},
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      });
    });

    it('should change error to null when action is cleanError', () => {
      const state = {
        data: {id: 'data1'},
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      };
      const stateExpected = {
        data: {id: 'data1'},
        metaData: {id: 'meta1'},
        error: null,
        fetching: true,
      };
      const action = {type: cleanError.type};

      const result = quotationsReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        data: {id: 'data1'},
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      });
    });

    it('should set data and metaData values and change fetching to false and error to null ' +
      'when action is fetchQuotations.fulfilled', () => {
      const state = {
        data: {
          'id-1': {id: 'id-1', name: 'ct1'},
          'id-2': {id: 'id-2', name: 'ct2'},
          'id-3': {id: 'id-3', name: '123'},
          'id-4': {id: 'id-4'},
          'id-5': {id: 'id-5'},
        },
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      };
      const stateExpected = {
        data: {
          'id-1': {id: 'id-1', name: 'ct1'},
          'id-2': {id: 'id-2', name: 'ct2'},
          'id-3': {id: 'id-3', name: '123'},
          'id-4': {id: 'id-4'},
          'id-5': {id: 'id-5'},
          'id-6': {id: 'id-6', name: 'abc3'},
        },
        metaData: {id: 'new meta'},
        error: null,
        fetching: false,
      };
      const dataMocked = {
        'id-1': {id: 'id-1', name: 'ct111'},
        'id-2': {id: 'id-2', name: 'ct222'},
        'id-5': {id: 'id-5'},
        'id-6': {id: 'id-6', name: 'abc3'},
      };
      const data = 'test';
      const action = {type: fetchQuotations.fulfilled.type, payload: {metaData: {id: 'new meta'}, data}};
      arrayToObjectStub.withArgs(data).returns(dataMocked);

      const result = quotationsReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, data);
      // don't mutate
      expect(state).toStrictEqual({
        data: {
          'id-1': {id: 'id-1', name: 'ct1'},
          'id-2': {id: 'id-2', name: 'ct2'},
          'id-3': {id: 'id-3', name: '123'},
          'id-4': {id: 'id-4'},
          'id-5': {id: 'id-5'},
        },
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      });
    });

    it('should replace data values and change fetching to false and error to null ' +
      'when action is fetchQuotation.fulfilled and data is present', () => {
      const state = {
        data: {
          'id-1': {id: 'id-1', name: 'ct1'},
          'id-2': {id: 'id-2', name: 'ct2'},
          'id-3': {id: 'id-3', name: '123', extra: '123'},
          'id-4': {id: 'id-4'},
        },
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      };
      const stateExpected = {
        data: {
          'id-1': {id: 'id-1', name: 'ct1'},
          'id-2': {id: 'id-2', name: 'ct2'},
          'id-3': {id: 'id-3', name: 'abc', more: 'a12'},
          'id-4': {id: 'id-4'},
        },
        metaData: {id: 'meta1'},
        error: null,
        fetching: false,
      };
      const data = 'test';
      const action = {type: fetchQuotation.fulfilled.type, payload: {data}};
      arrayToObjectStub.withArgs([data]).returns({
        'id-3': {
          id: 'id-3',
          name: 'abc',
          more: 'a12',
        },
      });

      const result = quotationsReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, [data]);
      // don't mutate
      expect(state).toStrictEqual({
        data: {
          'id-1': {id: 'id-1', name: 'ct1'},
          'id-2': {id: 'id-2', name: 'ct2'},
          'id-3': {id: 'id-3', name: '123', extra: '123'},
          'id-4': {id: 'id-4'},
        },
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      });
    });

    it('should add data values and change fetching to false and error to null ' +
      'when action is fetchQuotation.fulfilled and data is not present', () => {
      const state = {
        data: {
          'id-1': {id: 'id-1', name: 'ct1'},
          'id-2': {id: 'id-2', name: 'ct2'},
          'id-3': {id: 'id-3', name: '123', extra: '123'},
          'id-4': {id: 'id-4'},
        },
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      };
      const stateExpected = {
        data: {
          'id-1': {id: 'id-1', name: 'ct1'},
          'id-2': {id: 'id-2', name: 'ct2'},
          'id-3': {id: 'id-3', name: '123', extra: '123'},
          'id-4': {id: 'id-4'},
          'id-5': {id: 'id-5', name: 'abc'},
        },
        metaData: {id: 'meta1'},
        error: null,
        fetching: false,
      };
      const data = 'test';
      const action = {type: fetchQuotation.fulfilled.type, payload: {data}};
      arrayToObjectStub.withArgs([data]).returns({'id-5': {id: 'id-5', name: 'abc'}});

      const result = quotationsReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      sinon.assert.callCount(arrayToObjectStub, 1);
      sinon.assert.calledWithExactly(arrayToObjectStub, [data]);
      // don't mutate
      expect(state).toStrictEqual({
        data: {
          'id-1': {id: 'id-1', name: 'ct1'},
          'id-2': {id: 'id-2', name: 'ct2'},
          'id-3': {id: 'id-3', name: '123', extra: '123'},
          'id-4': {id: 'id-4'},
        },
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      });
    });

    describe('setError', () => {
      const state = {
        data: {id: 'data1'},
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      };
      const stateExpected = {
        data: {id: 'data1'},
        metaData: {id: 'meta1'},
        error: {id: 'new error'},
        fetching: false,
      };
      const validate = type => {
        const result = quotationsReducer(state, {type, error: {id: 'new error'}});

        expect(result).toStrictEqual(stateExpected);
        // don't mutate
        expect(state).toStrictEqual({
          data: {id: 'data1'},
          metaData: {id: 'meta1'},
          error: {id: 'error1'},
          fetching: true,
        });
      };

      it('should set error value and change fetching to false when action is fetchQuotations.rejected', () => {
        validate(fetchQuotations.rejected.type);
      });

      it('should set error value and change fetching to false when action is fetchQuotation.rejected', () => {
        validate(fetchQuotation.rejected.type);
      });

      it('should set error value and change fetching to false when action is createQuotation.rejected', () => {
        validate(createQuotation.rejected.type);
      });

      it('should set error value and change fetching to false when action is editQuotation.rejected', () => {
        validate(editQuotation.rejected.type);
      });

      it('should set error value and change fetching to false when action is deleteQuotation.rejected', () => {
        validate(deleteQuotation.rejected.type);
      });
    });

    describe('setFetching', () => {
      const state = {
        data: {id: 'data1'},
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: false,
      };
      const stateExpected = {
        data: {id: 'data1'},
        metaData: {id: 'meta1'},
        error: null,
        fetching: true,
      };
      const validate = action => {
        const result = quotationsReducer(state, action);

        expect(result).toStrictEqual(stateExpected);
        // don't mutate
        expect(state).toStrictEqual({
          data: {id: 'data1'},
          metaData: {id: 'meta1'},
          error: {id: 'error1'},
          fetching: false,
        });
      };

      it('should change fetching to true and error to null when action is fetchQuotations.pending', () => {
        validate({type: fetchQuotations.pending.type});
      });

      it('should change fetching to true and error to null when action is fetchQuotation.pending', () => {
        validate({type: fetchQuotation.pending.type});
      });

      it('should change fetching to true and error to null when action is createQuotation.pending', () => {
        validate({type: createQuotation.pending.type});
      });

      it('should change fetching to true and error to null when action is editQuotation.pending', () => {
        validate({type: editQuotation.pending.type});
      });

      it('should change fetching to true and error to null when action is deleteQuotation.pending', () => {
        validate({type: deleteQuotation.pending.type});
      });
    });

    describe('cleanDataMetaData', () => {
      const state = {
        data: {id: 'data1'},
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      };
      const stateExpected = {
        data: null,
        metaData: null,
        error: {id: 'error1'},
        fetching: true,
      };
      const validate = action => {
        const result = quotationsReducer(state, action);

        expect(result).toStrictEqual(stateExpected);
        // don't mutate
        expect(state).toStrictEqual({
          data: {id: 'data1'},
          metaData: {id: 'meta1'},
          error: {id: 'error1'},
          fetching: true,
        });
      };

      it('should change data and metaData to null when action is SESSION_EXPIRED', () => {
        validate({type: ACTION_TYPES.SESSION_EXPIRED});
      });

      it('should change data and metaData to null when action is logout', () => {
        validate({type: logout.type});
      });

      it('should change data and metaData to null when action is fetchPing.rejected', () => {
        validate({type: fetchPing.rejected.type});
      });
    });

    describe('cleanData', () => {
      const state = {
        data: {id: 'data1'},
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      };
      const stateExpected = {
        data: null,
        metaData: null,
        error: null,
        fetching: false,
      };
      const validate = action => {
        const result = quotationsReducer(state, action);

        expect(result).toStrictEqual(stateExpected);
        // don't mutate
        expect(state).toStrictEqual({
          data: {id: 'data1'},
          metaData: {id: 'meta1'},
          error: {id: 'error1'},
          fetching: true,
        });
      };

      it('should change fetching to false and error, data and metaData to null ' +
        'when action is createQuotation.fulfilled', () => {
        validate({type: createQuotation.fulfilled.type});
      });

      it('should change fetching to false and error, data and metaData to null ' +
        'when action is editQuotation.fulfilled', () => {
        validate({type: editQuotation.fulfilled.type});
      });

      it('should change fetching to false and error, data and metaData to null ' +
        'when action is deleteQuotation.fulfilled', () => {
        validate({type: deleteQuotation.fulfilled.type});
      });
    });
  });

  describe('Actions', () => {
    const dispatchStub = sinon.stub();
    const graphqlStub = sinon.stub(Api, 'graphql');

    afterEach(() => {
      dispatchStub.reset();
      graphqlStub.reset();
    });

    describe('fetchQuotations', () => {
      const arg = {page: 5};
      const meta = {arg, requestId: sinon.match.string, requestStatus: sinon.match.string};
      const FIELDS = 'totalElements totalPages content{id name createdAt price}';
      const body = {query: `{quotationPage(pageDataRequest: {page:5}) {${FIELDS}}}`};

      it('should dispatch fetchQuotations.fulfilled', async () => {
        const jsonExpected = {data: {quotationPage: {totalElements: 5, totalPages: 3, content: [{id: 1}, {id: 2}]}}};
        const payload = {data: [{id: 1}, {id: 2}], metaData: {pagination: arg, totalElements: 5, totalPages: 3}};
        graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

        const result = await fetchQuotations(arg)(dispatchStub);

        expect(result.payload).toStrictEqual(payload);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchQuotations.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchQuotations.fulfilled.type, payload, meta});
        // don't mutate
        expect(arg).toStrictEqual({page: 5});
      });

      it('should dispatch fetchQuotations.rejected', async () => {
        const errorExpected = new Error('error 1');
        graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

        const result = await fetchQuotations(arg)(dispatchStub);

        expect(result.error.message).toStrictEqual('error 1');
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchQuotations.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: fetchQuotations.rejected.type,
          error: sinon.match.object,
          payload: undefined,
          meta: {
            arg,
            aborted: false,
            condition: false,
            rejectedWithValue: false,
            requestId: sinon.match.string,
            requestStatus: sinon.match.string,
          },
        });
        // don't mutate
        expect(arg).toStrictEqual({page: 5});
      });
    });

    describe('fetchQuotation', () => {
      const arg = {quotationId: 8, overwriteLocalChanges: true};
      const meta = {arg, requestId: sinon.match.string, requestStatus: sinon.match.string};
      const FIELDS = 'id name createdAt price menus{id name quantity courses{id position type{id} dishes{id price}}}';
      const body = {query: `{quotation(id: ${arg.quotationId}) {${FIELDS}}}`};

      it('should dispatch fetchQuotation.fulfilled', async () => {
        const jsonExpected = {data: {quotation: {value: 'test'}}};
        const payload = {data: {value: 'test'}, overwriteLocalChanges: true};
        graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

        const result = await fetchQuotation(arg)(dispatchStub);

        expect(result.payload).toStrictEqual(payload);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchQuotation.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchQuotation.fulfilled.type, payload, meta});
        // don't mutate
        expect(arg).toStrictEqual({quotationId: 8, overwriteLocalChanges: true});
      });

      it('should dispatch fetchQuotation.rejected', async () => {
        const errorExpected = new Error('error 1');
        graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

        const result = await fetchQuotation(arg)(dispatchStub);

        expect(result.error.message).toStrictEqual('error 1');
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: fetchQuotation.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: fetchQuotation.rejected.type,
          error: sinon.match.object,
          payload: undefined,
          meta: {
            arg,
            aborted: false,
            condition: false,
            rejectedWithValue: false,
            requestId: sinon.match.string,
            requestStatus: sinon.match.string,
          },
        });
        // don't mutate
        expect(arg).toStrictEqual({quotationId: 8, overwriteLocalChanges: true});
      });
    });

    describe('createQuotation', () => {
      const arg = {id: 8, menus: [{id: 1}, {id: 2}]};
      const meta = {arg, requestId: sinon.match.string, requestStatus: sinon.match.string};
      const body = {query: 'mutation {createQuotation(quotation: {id:8,menus:[{id:1},{id:2}]}) {id}}'};

      it('should dispatch createQuotation.fulfilled', async () => {
        const jsonExpected = {data: {createQuotation: {value: 'test'}}};
        graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

        const result = await createQuotation(arg)(dispatchStub);

        expect(result.payload).toStrictEqual(jsonExpected);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: createQuotation.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: createQuotation.fulfilled.type,
          payload: jsonExpected,
          meta,
        });
        // don't mutate
        expect(arg).toStrictEqual({id: 8, menus: [{id: 1}, {id: 2}]});
      });

      it('should dispatch createQuotation.rejected', async () => {
        const errorExpected = new Error('error 1');
        graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

        const result = await createQuotation(arg)(dispatchStub);

        expect(result.error.message).toStrictEqual('error 1');
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: createQuotation.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: createQuotation.rejected.type,
          error: sinon.match.object,
          payload: undefined,
          meta: {
            arg,
            aborted: false,
            condition: false,
            rejectedWithValue: false,
            requestId: sinon.match.string,
            requestStatus: sinon.match.string,
          },
        });
        // don't mutate
        expect(arg).toStrictEqual({id: 8, menus: [{id: 1}, {id: 2}]});
      });
    });

    describe('editQuotation', () => {
      const arg = {id: 8, menus: [{id: 1}, {id: 2}]};
      const meta = {arg, requestId: sinon.match.string, requestStatus: sinon.match.string};
      const body = {query: 'mutation {updateQuotation(quotation: {id:8,menus:[{id:1},{id:2}]}) {id}}'};

      it('should dispatch editQuotation.fulfilled', async () => {
        const jsonExpected = {data: {updateQuotation: {value: 'test'}}};
        graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

        const result = await editQuotation(arg)(dispatchStub);

        expect(result.payload).toStrictEqual(jsonExpected);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: editQuotation.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: editQuotation.fulfilled.type,
          payload: jsonExpected,
          meta,
        });
        // don't mutate
        expect(arg).toStrictEqual({id: 8, menus: [{id: 1}, {id: 2}]});
      });

      it('should dispatch editQuotation.rejected', async () => {
        const errorExpected = new Error('error 1');
        graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

        const result = await editQuotation(arg)(dispatchStub);

        expect(result.error.message).toStrictEqual('error 1');
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: editQuotation.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: editQuotation.rejected.type,
          error: sinon.match.object,
          payload: undefined,
          meta: {
            arg,
            aborted: false,
            condition: false,
            rejectedWithValue: false,
            requestId: sinon.match.string,
            requestStatus: sinon.match.string,
          },
        });
        // don't mutate
        expect(arg).toStrictEqual({id: 8, menus: [{id: 1}, {id: 2}]});
      });
    });

    describe('deleteQuotation', () => {
      const arg = 5;
      const meta = {arg, requestId: sinon.match.string, requestStatus: sinon.match.string};
      const body = {query: 'mutation {deleteQuotation(id: 5) {id}}'};

      it('should dispatch deleteQuotation.fulfilled', async () => {
        const jsonExpected = {data: {deleteQuotation: {value: 'test'}}};
        graphqlStub.withArgs(dispatchStub, body).returns(jsonExpected);

        const result = await deleteQuotation(arg)(dispatchStub);

        expect(result.payload).toStrictEqual(jsonExpected);
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: deleteQuotation.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: deleteQuotation.fulfilled.type,
          payload: jsonExpected,
          meta,
        });
        // don't mutate
        expect(arg).toStrictEqual(5);
      });

      it('should dispatch deleteQuotation.rejected', async () => {
        const errorExpected = new Error('error 1');
        graphqlStub.withArgs(dispatchStub, body).throws(errorExpected);

        const result = await deleteQuotation(arg)(dispatchStub);

        expect(result.error.message).toStrictEqual('error 1');
        sinon.assert.callCount(graphqlStub, 1);
        sinon.assert.calledWithExactly(graphqlStub, dispatchStub, body);
        sinon.assert.callCount(dispatchStub, 2);
        sinon.assert.calledWithExactly(dispatchStub, {type: deleteQuotation.pending.type, payload: undefined, meta});
        sinon.assert.calledWithExactly(dispatchStub, {
          type: deleteQuotation.rejected.type,
          error: sinon.match.object,
          payload: undefined,
          meta: {
            arg,
            aborted: false,
            condition: false,
            rejectedWithValue: false,
            requestId: sinon.match.string,
            requestStatus: sinon.match.string,
          },
        });
        // don't mutate
        expect(arg).toStrictEqual(5);
      });
    });
  });
});