/* eslint-disable max-lines */
import {expect} from 'chai';
import {ACTION_TYPES} from '../../../src/app/data/DataActions';
import Data from '../../../src/app/data/DataReducer';

describe('Data -> Reducer', () => {
  it('should get default state when empty', () => {
    const state = {
      version: null,
      fetching: {
        courseTypes: false,
        dishes: false,
        dish: {},
        quotations: false,
        quotationsUpdate: false,
      },
      errors: {
        quotations: null,
      },
      metaData: {
        quotations: null,
      },
      courseTypes: null,
      dishes: null,
      quotations: null,
    };

    const result = Data();

    expect(result).to.deep.equal(state);
  });

  it('should get the same original status when action is not allow', () => {
    const state = {
      version: 'abc',
      fetching: {
        courseTypes: true,
        dishes: true,
        dish: {a: true, b: false},
        quotations: true,
        quotationsUpdate: true,
      },
      errors: {
        quotations: {id: 'error'},
      },
      metaData: {
        quotations: {id: 'meta'},
      },
      courseTypes: {id: 'ID1'},
      dishes: {id: 'ID2'},
      quotations: {id: 'ID3'},
    };

    const result = Data(state, {type: 'invalid'});

    expect(result).to.deep.equal(state);
    // don't mutate
    expect(state).to.deep.equal({
      version: 'abc',
      fetching: {
        courseTypes: true,
        dishes: true,
        dish: {a: true, b: false},
        quotations: true,
        quotationsUpdate: true,
      },
      errors: {
        quotations: {id: 'error'},
      },
      metaData: {
        quotations: {id: 'meta'},
      },
      courseTypes: {id: 'ID1'},
      dishes: {id: 'ID2'},
      quotations: {id: 'ID3'},
    });
  });

  it('should get version when action is DATA_CHANGE_VERSION', () => {
    const state = {
      version: 'abc',
      fetching: {
        courseTypes: true,
        dishes: true,
        dish: {a: true, b: false},
        quotations: true,
        quotationsUpdate: true,
      },
      errors: {
        quotations: {id: 'error'},
      },
      metaData: {
        quotations: {id: 'meta'},
      },
      courseTypes: {id: 'ID1'},
      dishes: {id: 'ID2'},
      quotations: {id: 'ID3'},
    };
    const stateExpected = {
      version: '123',
      fetching: {
        courseTypes: true,
        dishes: true,
        dish: {a: true, b: false},
        quotations: true,
        quotationsUpdate: true,
      },
      errors: {
        quotations: {id: 'error'},
      },
      metaData: {
        quotations: {id: 'meta'},
      },
      courseTypes: {id: 'ID1'},
      dishes: null,
      quotations: {id: 'ID3'},
    };
    const action = {type: ACTION_TYPES.DATA_CHANGE_VERSION, payload: {version: '123'}};

    const result = Data(state, action);

    expect(result).to.deep.equal(stateExpected);
    // don't mutate
    expect(state).to.deep.equal({
      version: 'abc',
      fetching: {
        courseTypes: true,
        dishes: true,
        dish: {a: true, b: false},
        quotations: true,
        quotationsUpdate: true,
      },
      errors: {
        quotations: {id: 'error'},
      },
      metaData: {
        quotations: {id: 'meta'},
      },
      courseTypes: {id: 'ID1'},
      dishes: {id: 'ID2'},
      quotations: {id: 'ID3'},
    });
  });
});