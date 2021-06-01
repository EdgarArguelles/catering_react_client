/* eslint-disable max-lines */
import quotationsReducer, {
  changeError,
  changeFetching,
  changeIsRemoteProcessing,
} from 'app/data/quotations/QuotationsReducer';

describe('Data -> Quotations -> Reducer/Actions', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state = {
        isRemoteProcessing: false,
        fetching: false,
        error: null,
      };

      const result = quotationsReducer(undefined, { type: 'invalid' });

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        isRemoteProcessing: true,
        fetching: true,
        error: { id: 'error1' },
      };

      const result = quotationsReducer(state, { type: 'invalid' });

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        isRemoteProcessing: true,
        fetching: true,
        error: { id: 'error1' },
      });
    });

    it('should change isRemoteProcessing to true when action is changeIsRemoteProcessing', () => {
      const state = {
        isRemoteProcessing: false,
        fetching: true,
        error: { id: 'error1' },
      };
      const stateExpected = {
        isRemoteProcessing: true,
        fetching: true,
        error: { id: 'error1' },
      };
      const action = { type: changeIsRemoteProcessing.type, payload: true };

      const result = quotationsReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isRemoteProcessing: false,
        fetching: true,
        error: { id: 'error1' },
      });
    });

    it('should change fetching to true when action is changeFetching', () => {
      const state = {
        isRemoteProcessing: true,
        fetching: false,
        error: { id: 'error1' },
      };
      const stateExpected = {
        isRemoteProcessing: true,
        fetching: true,
        error: { id: 'error1' },
      };
      const action = { type: changeFetching.type, payload: true };

      const result = quotationsReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isRemoteProcessing: true,
        fetching: false,
        error: { id: 'error1' },
      });
    });

    it('should change error to null when action is changeError', () => {
      const state = {
        isRemoteProcessing: true,
        fetching: true,
        error: { id: 'error1' },
      };
      const stateExpected = {
        isRemoteProcessing: true,
        fetching: true,
        error: null,
      };
      const action = { type: changeError.type, payload: null };

      const result = quotationsReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isRemoteProcessing: true,
        fetching: true,
        error: { id: 'error1' },
      });
    });
  });
});