import dataReducer from 'app/data/DataReducer';

describe('Data -> Reducer/Actions', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state = {
        quotations: {
          data: null,
          metaData: null,
          error: null,
          fetching: false,
        },
      };

      const result = dataReducer(undefined, {type: 'invalid'});

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        quotations: {
          data: {id: 'ID3'},
          metaData: {id: 'meta'},
          error: {id: 'error'},
          fetching: true,
        },
      };

      const result = dataReducer(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        quotations: {
          data: {id: 'ID3'},
          metaData: {id: 'meta'},
          error: {id: 'error'},
          fetching: true,
        },
      });
    });
  });
});