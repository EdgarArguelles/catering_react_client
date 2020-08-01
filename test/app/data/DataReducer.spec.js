/* eslint-disable max-lines */
import {ACTION_TYPES} from 'app/data/DataActions';
import Data from 'app/data/DataReducer';

describe('Data -> Reducer', () => {
  it('should get default state when empty', () => {
    const state = {
      version: null,
      fetching: {
        courseTypes: false,
        dishes: false,
        dish: {},
      },
      courseTypes: null,
      dishes: null,
      quotations: {
        fetching: false,
        error: null,
        data: null,
        metaData: null,
      },
    };

    const result = Data();

    expect(result).toStrictEqual(state);
  });

  it('should get the same original status when action is not allow', () => {
    const state = {
      version: 'abc',
      fetching: {
        courseTypes: true,
        dishes: true,
        dish: {a: true, b: false},
      },
      courseTypes: {id: 'ID1'},
      dishes: {id: 'ID2'},
      quotations: {
        fetching: true,
        error: {id: 'error'},
        data: {id: 'ID3'},
        metaData: {id: 'meta'},
      },
    };

    const result = Data(state, {type: 'invalid'});

    expect(result).toStrictEqual(state);
    // don't mutate
    expect(state).toStrictEqual({
      version: 'abc',
      fetching: {
        courseTypes: true,
        dishes: true,
        dish: {a: true, b: false},
      },
      courseTypes: {id: 'ID1'},
      dishes: {id: 'ID2'},
      quotations: {
        fetching: true,
        error: {id: 'error'},
        data: {id: 'ID3'},
        metaData: {id: 'meta'},
      },
    });
  });

  it('should get version when action is DATA_CHANGE_VERSION', () => {
    const state = {
      version: 'abc',
      fetching: {
        courseTypes: true,
        dishes: true,
        dish: {a: true, b: false},
      },
      courseTypes: {id: 'ID1'},
      dishes: {id: 'ID2'},
      quotations: {
        fetching: true,
        error: {id: 'error'},
        data: {id: 'ID3'},
        metaData: {id: 'meta'},
      },
    };
    const stateExpected = {
      version: '123',
      fetching: {
        courseTypes: true,
        dishes: true,
        dish: {a: true, b: false},
      },
      courseTypes: {id: 'ID1'},
      dishes: null,
      quotations: {
        fetching: true,
        error: {id: 'error'},
        data: {id: 'ID3'},
        metaData: {id: 'meta'},
      },
    };
    const action = {type: ACTION_TYPES.DATA_CHANGE_VERSION, payload: {version: '123'}};

    const result = Data(state, action);

    expect(result).toStrictEqual(stateExpected);
    // don't mutate
    expect(state).toStrictEqual({
      version: 'abc',
      fetching: {
        courseTypes: true,
        dishes: true,
        dish: {a: true, b: false},
      },
      courseTypes: {id: 'ID1'},
      dishes: {id: 'ID2'},
      quotations: {
        fetching: true,
        error: {id: 'error'},
        data: {id: 'ID3'},
        metaData: {id: 'meta'},
      },
    });
  });
});