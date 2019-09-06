/* eslint-disable max-lines */
import sinon from 'sinon';
import renderer, {act} from 'react-test-renderer';
import React, {useState} from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {createStore} from 'redux';
import reducers from 'app/Reducers';
import {
  useAppTheme,
  useAreDishesLoaded,
  useBrowserNavigation,
  usePingServer,
  useQuotationsLoader,
} from 'app/common/Hooks';
import DishesActions from 'app/data/dishes/DishesActions';
import QuotationsActions, {ACTION_TYPES} from 'app/data/quotations/QuotationsActions';
import AuthActions, {ACTION_TYPES as AUTH_TYPES} from 'app/features/auth/AuthActions';
import NavigationActions from 'app/features/quotations/header/navigation/NavigationActions';

describe('Hooks', () => {
  const dispatchStub = sinon.stub();
  let component, hookResponse, store, wrapper;

  afterEach(() => dispatchStub.reset());

  const mountComponent = (hook, state, useRealStore) => {
    const Component = () => {
      const [value, setValue] = useState(null);
      hookResponse = hook(value);
      return <div value={value} onChange={newValue => setValue(newValue)}/>;
    };

    store = configureStore()(state);
    store.dispatch = dispatchStub;
    store = useRealStore ? createStore(reducers, state) : store;
    wrapper = renderer.create(<Provider store={store}><Component/></Provider>);
    component = wrapper.root.find(el => el.type === 'div');
  };

  describe('useAppTheme', () => {
    it('should init default theme value', () => {
      mountComponent(() => useAppTheme(), {}, true);
      const {theme, themeIcon} = hookResponse;

      expect(theme).toStrictEqual('light');
      expect(themeIcon).not.toBeNull();
      sinon.assert.callCount(dispatchStub, 0);
    });

    it('should call CHANGE_APP_THEME with dark', () => {
      mountComponent(() => useAppTheme(), {theme: 'light'}, false);
      const {theme, themeIcon, changeTheme} = hookResponse;
      changeTheme();

      expect(theme).toStrictEqual('light');
      expect(themeIcon).not.toBeNull();
      sinon.assert.callCount(dispatchStub, 1);
      sinon.assert.calledWithExactly(dispatchStub, {payload: {theme: 'dark'}, type: 'CHANGE_APP_THEME'});
    });

    it('should call CHANGE_APP_THEME with light', () => {
      mountComponent(() => useAppTheme(), {theme: 'dark'}, false);
      const {theme, themeIcon, changeTheme} = hookResponse;
      changeTheme();

      expect(theme).toStrictEqual('dark');
      expect(themeIcon).not.toBeNull();
      sinon.assert.callCount(dispatchStub, 1);
      sinon.assert.calledWithExactly(dispatchStub, {payload: {theme: 'light'}, type: 'CHANGE_APP_THEME'});
    });
  });

  describe('usePingServer', () => {
    const fetchPingStub = sinon.stub(AuthActions, 'fetchPing');

    beforeEach(() => {
      fetchPingStub.reset();
      fetchPingStub.withArgs().returns({type: 'TEST'});
      mountComponent(() => usePingServer(), {}, false);
    });

    it('should call fetchPing twice', () => {
      act(() => component.props.onChange());

      sinon.assert.callCount(fetchPingStub, 2);
      sinon.assert.calledWithExactly(fetchPingStub);
      sinon.assert.callCount(dispatchStub, 2);
    });
  });

  describe('useBrowserNavigation', () => {
    const closeNavigationDialogStub = sinon.stub(NavigationActions, 'closeNavigationDialog');

    beforeEach(() => {
      closeNavigationDialogStub.reset();
      closeNavigationDialogStub.withArgs().returns({type: 'TEST'});
      mountComponent(open => useBrowserNavigation(open, 'onClose'), {}, false);
    });

    it('should not call closeNavigationDialog', () => {
      // call onChange to trigger useEffect
      act(() => component.props.onChange());

      sinon.assert.callCount(closeNavigationDialogStub, 0);
      sinon.assert.callCount(dispatchStub, 0);
    });

    it('should call closeNavigationDialog', () => {
      jest.useFakeTimers();
      act(() => component.props.onChange(true));
      jest.runAllTimers();

      sinon.assert.callCount(closeNavigationDialogStub, 1);
      sinon.assert.calledWithExactly(closeNavigationDialogStub, 'onClose');
      sinon.assert.callCount(dispatchStub, 1);
    });

    it('should call closeNavigationDialog twice', () => {
      jest.useFakeTimers();
      act(() => component.props.onChange(true));
      act(() => component.props.onChange(false));
      jest.runAllTimers();

      sinon.assert.callCount(closeNavigationDialogStub, 2);
      sinon.assert.calledWithExactly(closeNavigationDialogStub, 'onClose');
      sinon.assert.calledWithExactly(closeNavigationDialogStub, null);
      sinon.assert.callCount(dispatchStub, 2);
    });
  });

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
      // call onChange to trigger useEffect
      act(() => component.props.onChange());

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
      }, false);

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
        }, false);
      });

      it('should not call fetchDish', () => {
        // call onChange to trigger useEffect
        act(() => component.props.onChange());

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
        sinon.assert.callCount(dispatchStub, 1);
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
        }, false);
      });

      it('should call fetchDish', () => {
        // call onChange to trigger useEffect
        act(() => component.props.onChange());

        expect(hookResponse).toBeFalsy();
        sinon.assert.callCount(fetchDishStub, 4);
        sinon.assert.calledWithExactly(fetchDishStub, 'D1');
        sinon.assert.calledWithExactly(fetchDishStub, 'D2');
        sinon.assert.calledWithExactly(fetchDishStub, 'D3');
        sinon.assert.calledWithExactly(fetchDishStub, 'D4');
        sinon.assert.callCount(dispatchStub, 4);
      });
    });
  });
});