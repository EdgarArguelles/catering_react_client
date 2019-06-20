/* eslint-disable max-lines */
import sinon from 'sinon';
import renderer, {act} from 'react-test-renderer';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {createStore} from 'redux';
import reducers from 'app/Reducers';
import {useAreDishesLoaded, useQuotationsLoader} from 'app/common/Hooks';
import DishesActions from 'app/data/dishes/DishesActions';
import QuotationsActions, {ACTION_TYPES} from 'app/data/quotations/QuotationsActions';
import {ACTION_TYPES as AUTH_TYPES} from 'app/features/auth/AuthActions';

describe('Hooks', () => {
  const dispatchStub = sinon.stub();
  let hookResponse, store, wrapper;

  afterEach(() => dispatchStub.reset());

  const mountComponent = (hook, state, useRealStore) => {
    const Component = () => {
      hookResponse = hook();
      return <div/>;
    };

    store = configureStore()(state);
    store.dispatch = dispatchStub;
    store = useRealStore ? createStore(reducers, state) : store;
    wrapper = renderer.create(<Provider store={store}><Component/></Provider>);
  };

  describe('useQuotationsLoader', () => {
    const fetchQuotationStub = sinon.stub(QuotationsActions, 'fetchQuotation');

    beforeEach(() => {
      fetchQuotationStub.reset();
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
      // call wrapper.update() to call useEffect the first time
      wrapper.update();

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

  describe('useAreDishesLoaded', () => {
    const fetchDishStub = sinon.stub(DishesActions, 'fetchDish');

    beforeEach(() => fetchDishStub.reset());

    it('should return true as hook response', () => {
      mountComponent(() => useAreDishesLoaded([]), {
        data: {
          dishes: {D2: {id: 'D2'}, D3: {id: 'D3'}, D4: {id: 'D4'}},
          fetching: {dish: {D1: true}},
        },
      }, true);

      expect(hookResponse).toBeTruthy();
      sinon.assert.callCount(fetchDishStub, 0);
      sinon.assert.callCount(dispatchStub, 0);
    });

    describe('not calling fetchDish', () => {
      beforeEach(() => {
        mountComponent(() => useAreDishesLoaded([{id: 'D1'}, {id: 'D2'}, {id: 'D3'}, {id: 'D4'}]), {
          data: {
            dishes: {D2: {id: 'D2'}, D3: {id: 'D3'}, D4: {id: 'D4'}},
            fetching: {dish: {D1: true}},
          },
        }, true);
      });

      it('should not call fetchDish', () => {
        // call wrapper.update() to call useEffect the first time
        wrapper.update();

        expect(hookResponse).toBeFalsy();
        sinon.assert.callCount(fetchDishStub, 0);
        sinon.assert.callCount(dispatchStub, 0);
      });

      it('should not call fetchDish when dispatch CREATE_QUOTATIONS_SUCCESS', () => {
        act(() => {
          store.dispatch({type: ACTION_TYPES.CREATE_QUOTATIONS_SUCCESS});
        });

        expect(hookResponse).toBeFalsy();
        sinon.assert.callCount(fetchDishStub, 0);
        sinon.assert.callCount(dispatchStub, 0);
      });
    });

    describe('calling fetchDish', () => {
      beforeEach(() => {
        fetchDishStub.withArgs('D1').returns({type: 'TEST'});
        fetchDishStub.withArgs('D2').returns({type: 'TEST'});
        fetchDishStub.withArgs('D3').returns({type: 'TEST'});
        fetchDishStub.withArgs('D4').returns({type: 'TEST'});
        mountComponent(() => useAreDishesLoaded([{id: 'D1'}, {id: 'D2'}, {id: 'D3'}, {id: 'D4'}]), {
          data: {
            dishes: {},
            fetching: {dish: {}},
          },
        }, true);
      });

      it('should call fetchDish', () => {
        // call wrapper.update() to call useEffect the first time
        wrapper.update();

        expect(hookResponse).toBeFalsy();
        sinon.assert.callCount(fetchDishStub, 4);
        sinon.assert.calledWithExactly(fetchDishStub, 'D1');
        sinon.assert.calledWithExactly(fetchDishStub, 'D2');
        sinon.assert.calledWithExactly(fetchDishStub, 'D3');
        sinon.assert.calledWithExactly(fetchDishStub, 'D4');
        sinon.assert.callCount(dispatchStub, 0);
      });
    });
  });
});