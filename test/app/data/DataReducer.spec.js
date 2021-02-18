import dataReducer from 'app/data/DataReducer';

describe('Data -> Reducer/Actions', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state = {
        quotations: {
          isRemoteProcessing: false,
          fetching: false,
          error: null,
        },
      };

      const result = dataReducer(undefined, {type: 'invalid'});

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        quotations: {
          isRemoteProcessing: true,
          fetching: true,
          error: {id: 'error'},
        },
      };

      const result = dataReducer(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        quotations: {
          isRemoteProcessing: true,
          fetching: true,
          error: {id: 'error'},
        },
      });
    });
  });
});