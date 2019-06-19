import sinon from 'sinon';
import renderer, {act} from 'react-test-renderer';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {createStore} from 'redux';
import reducers from 'app/Reducers';
import {useQuotationsLoader} from 'app/common/Hooks';
import QuotationsActions, {ACTION_TYPES} from 'app/data/quotations/QuotationsActions';
import {ACTION_TYPES as AUTH_TYPES} from 'app/features/auth/AuthActions';

describe('Hooks', () => {
  const dispatchStub = sinon.stub();
  let store;

  afterEach(() => dispatchStub.reset());

  const mountComponent = (hook, state, useRealStore) => {
    const Component = () => {
      hook();
      return <div/>;
    };

    store = configureStore()(state);
    store.dispatch = dispatchStub;
    store = useRealStore ? createStore(reducers, state) : store;
    renderer.create(<Provider store={store}><Component/></Provider>);
  };

  describe('useQuotationsLoader', () => {
    const fetchQuotationStub = sinon.stub(QuotationsActions, 'fetchQuotation');

    afterEach(() => fetchQuotationStub.reset());

    beforeEach(() => {
      fetchQuotationStub.withArgs('Q1', false).returns({type: 'TEST'});
      mountComponent(() => useQuotationsLoader(), {
        auth: {},
        quotations: {quotation: {id: 'Q1'}},
        data: {
          fetching: {quotationsUpdate: false},
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

    it('should call fetchQuotation only once', () => {
      act(() => {
        store.dispatch({
          type: AUTH_TYPES.LOGIN_SUCCESS,
          payload: {
            loggedUser: {id: 'User 1'},
          },
        });
      });
      act(() => {
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
});