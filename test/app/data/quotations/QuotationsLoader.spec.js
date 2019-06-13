/* eslint-disable max-lines */
import sinon from 'sinon';
import renderer, {act} from 'react-test-renderer';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {createStore} from 'redux';
import reducers from 'app/Reducers';
import QuotationsLoader from 'app/data/quotations/QuotationsLoader';
import QuotationsActions, {ACTION_TYPES} from 'app/data/quotations/QuotationsActions';
import {ACTION_TYPES as AUTH_TYPES} from 'app/features/auth/AuthActions';

describe('Data -> Quotations -> Loader', () => {
  const dispatchStub = sinon.stub();
  const fetchQuotationStub = sinon.stub(QuotationsActions, 'fetchQuotation');
  let component, store, wrapper;

  afterEach(() => {
    dispatchStub.reset();
    fetchQuotationStub.reset();
  });

  const mountComponent = (state, useRealStore) => {
    store = configureStore()(state);
    store.dispatch = dispatchStub;
    store = useRealStore ? createStore(reducers, state) : store;
    wrapper = renderer.create(<Provider store={store}>
      <QuotationsLoader><h1>Test</h1></QuotationsLoader>
    </Provider>);
    component = wrapper.root.find(el => el.type.name === 'QuotationsLoader');
  };

  describe('load', () => {
    it('should have all props', () => {
      mountComponent({
        auth: {loggedUser: {id: 'user 1'}},
        quotations: {quotation: {id: 'Q1'}},
        data: {
          fetching: {quotations: true},
          quotations: {Q2: {id: 'Q2'}, Q3: {id: 'Q3'}},
        },
      });

      expect(component.props.children).toStrictEqual(<h1>Test</h1>);
    });
  });

  describe('useEffect -> fetchQuotation', () => {
    beforeEach(() => {
      fetchQuotationStub.withArgs('Q1', false).returns({type: 'TEST'});
      mountComponent({
        auth: {},
        quotations: {quotation: {id: 'Q1'}},
        data: {
          fetching: {quotationsUpdate: true},
        },
      }, true);
    });

    it('should not call fetchQuotation', () => {
      sinon.assert.callCount(fetchQuotationStub, 0);
      sinon.assert.callCount(dispatchStub, 0);
    });

    it('should not call fetchQuotation when dispatch CREATE_QUOTATIONS_SUCCESS', () => {
      act(() => {
        store.dispatch({type: ACTION_TYPES.CREATE_QUOTATIONS_SUCCESS});
      });

      sinon.assert.callCount(fetchQuotationStub, 0);
      sinon.assert.callCount(dispatchStub, 0);
    });

    it('should not call fetchQuotation when loggedUser is present', () => {
      act(() => {
        store.dispatch({
          type: AUTH_TYPES.LOGIN_SUCCESS,
          payload: {
            loggedUser: {id: 'User 2'},
          },
        });
        store.dispatch({
          type: AUTH_TYPES.LOGIN_SUCCESS,
          payload: {
            loggedUser: {id: 'User 3'},
          },
        });
      });

      sinon.assert.callCount(fetchQuotationStub, 0);
      sinon.assert.callCount(dispatchStub, 0);
    });

    it('should call fetchQuotation', () => {
      act(() => {
        store.dispatch({type: ACTION_TYPES.CREATE_QUOTATIONS_SUCCESS});
        store.dispatch({
          type: AUTH_TYPES.LOGIN_SUCCESS,
          payload: {
            loggedUser: {id: 'User 2'},
          },
        });
      });

      sinon.assert.callCount(fetchQuotationStub, 1);
      sinon.assert.calledWithExactly(fetchQuotationStub, 'Q1', false);
      sinon.assert.callCount(dispatchStub, 0);
    });
  });

  describe('snapshot', () => {
    it('should render h1 Test', () => {
      fetchQuotationStub.withArgs('Q1', false).returns({type: 'TEST'});
      mountComponent({
        auth: {},
        quotations: {quotation: {id: 'Q1'}},
        data: {
          fetching: {quotationsUpdate: true},
        },
      });

      global.expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });
});