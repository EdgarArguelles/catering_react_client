/* eslint-disable max-lines */
import dataReducer, {changeVersion} from 'app/data/DataReducer';

describe('Data -> Reducer/Actions', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state = {
        version: null,
        courseTypes: {data: null},
        dishes: {data: null, fetching: {}},
        quotations: {
          fetching: false,
          error: null,
          data: null,
          metaData: null,
        },
      };

      const result = dataReducer(undefined, {type: 'invalid'});

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = {
        version: 'abc',
        courseTypes: {data: {id: 'ID1'}},
        dishes: {data: {id: 'ID2'}, fetching: {a: true, b: false}},
        quotations: {
          fetching: true,
          error: {id: 'error'},
          data: {id: 'ID3'},
          metaData: {id: 'meta'},
        },
      };

      const result = dataReducer(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual({
        version: 'abc',
        courseTypes: {data: {id: 'ID1'}},
        dishes: {data: {id: 'ID2'}, fetching: {a: true, b: false}},
        quotations: {
          fetching: true,
          error: {id: 'error'},
          data: {id: 'ID3'},
          metaData: {id: 'meta'},
        },
      });
    });

    it('should get version when action is changeVersion', () => {
      const state = {
        version: 'abc',
        courseTypes: {data: {id: 'ID1'}},
        dishes: {data: {id: 'ID2'}, fetching: {a: true, b: false}},
        quotations: {
          fetching: true,
          error: {id: 'error'},
          data: {id: 'ID3'},
          metaData: {id: 'meta'},
        },
      };
      const stateExpected = {
        version: '123',
        courseTypes: {data: {id: 'ID1'}},
        dishes: {data: null, fetching: {a: true, b: false}},
        quotations: {
          fetching: true,
          error: {id: 'error'},
          data: {id: 'ID3'},
          metaData: {id: 'meta'},
        },
      };
      const action = {type: changeVersion.type, payload: '123'};

      const result = dataReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        version: 'abc',
        courseTypes: {data: {id: 'ID1'}},
        dishes: {data: {id: 'ID2'}, fetching: {a: true, b: false}},
        quotations: {
          fetching: true,
          error: {id: 'error'},
          data: {id: 'ID3'},
          metaData: {id: 'meta'},
        },
      });
    });
  });
});