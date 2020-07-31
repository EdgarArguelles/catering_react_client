/* eslint-disable max-lines */
import sinon from 'sinon';
import {ACTION_TYPES} from 'app/common/Api';
import Utils from 'app/common/Utils';
import {fetchPing, logout} from 'app/features/auth/AuthReducer';
import QuotationsReducer, {
  cleanQuotations,
  cleanError,
  fetchQuotations,
  fetchQuotation,
  createQuotation,
  editQuotation,
  deleteQuotation,
} from 'app/data/quotations/QuotationsReducer';

describe('Data -> Quotations -> Reducer/Actions', () => {
  describe('Reducer', () => {
    const arrayToObjectStub = sinon.stub(Utils, 'arrayToObject');

    afterEach(() => {
      arrayToObjectStub.reset();
    });

    it('should get default state when undefined', () => {
      const state = {
        data: null,
        metaData: null,
        error: null,
        fetching: false,
      };

      const result = QuotationsReducer(undefined, {});

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        data: {id: 'data1'},
        metaData: {id: 'meta1'},
        error: {id: 'error1'},
        fetching: true,
      };

      const result = QuotationsReducer(state, {type: 'invalid'});

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

      const result = QuotationsReducer(state, action);

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

      const result = QuotationsReducer(state, action);

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
      const stateMocked = {
        'id-1': {id: 'id-1', name: 'ct111'},
        'id-2': {id: 'id-2', name: 'ct222'},
        'id-5': {id: 'id-5'},
        'id-6': {id: 'id-6', name: 'abc3'},
      };
      const data = 'test';
      const action = {type: fetchQuotations.fulfilled.type, payload: {metaData: {id: 'new meta'}, data}};
      arrayToObjectStub.withArgs(data).returns(stateMocked);

      const result = QuotationsReducer(state, action);

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

      const result = QuotationsReducer(state, action);

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

      const result = QuotationsReducer(state, action);

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
        const result = QuotationsReducer(state, {type, payload: {id: 'new error'}});

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
        const result = QuotationsReducer(state, action);

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
        const result = QuotationsReducer(state, action);

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
        validate({type: fetchPing.rejected});
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
        const result = QuotationsReducer(state, action);

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
});