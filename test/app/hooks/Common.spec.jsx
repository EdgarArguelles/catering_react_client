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
  useIsMobileSize,
  usePingServer,
  useQuotationsLoader,
} from 'app/hooks/Common';
import {changeTheme as changeThemeAction} from 'app/AppReducer';
import * as DishesActions from 'app/data/dishes/DishesReducer';
import * as QuotationsActions from 'app/data/quotations/QuotationsReducer';
import * as AuthActions from 'app/features/auth/AuthReducer';
import * as NavigationActions from 'app/features/quotations/header/navigation/NavigationReducer';

describe('Hooks -> Common', () => {
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

  describe('useIsMobileSize', () => {
    it('should get false', () => {
      mountComponent(() => useIsMobileSize(), {}, false);

      expect(hookResponse).toBeFalsy();
      sinon.assert.callCount(dispatchStub, 0);
    });
  });

  describe('useAppTheme', () => {
    it('should init default theme value', () => {
      mountComponent(() => useAppTheme(), {}, true);
      const {theme, themeIcon} = hookResponse;

      expect(theme).toStrictEqual('light');
      expect(themeIcon).not.toBeNull();
      sinon.assert.callCount(dispatchStub, 0);
    });

    it('should call changeTheme with dark', () => {
      mountComponent(() => useAppTheme(), {app: {theme: 'light'}}, false);
      const {theme, themeIcon, changeTheme} = hookResponse;
      changeTheme();

      expect(theme).toStrictEqual('light');
      expect(themeIcon).not.toBeNull();
      sinon.assert.callCount(dispatchStub, 1);
      sinon.assert.calledWithExactly(dispatchStub, {payload: 'dark', type: changeThemeAction.type});
    });

    it('should call changeTheme with light', () => {
      mountComponent(() => useAppTheme(), {app: {theme: 'dark'}}, false);
      const {theme, themeIcon, changeTheme} = hookResponse;
      changeTheme();

      expect(theme).toStrictEqual('dark');
      expect(themeIcon).not.toBeNull();
      sinon.assert.callCount(dispatchStub, 1);
      sinon.assert.calledWithExactly(dispatchStub, {payload: 'light', type: changeThemeAction.type});
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
      // call onChange to trigger useEffect
      act(() => component.props.onChange());

      sinon.assert.callCount(fetchPingStub, 2);
      sinon.assert.calledWithExactly(fetchPingStub);
      sinon.assert.callCount(dispatchStub, 2);
      sinon.assert.calledWithExactly(dispatchStub, {type: 'TEST'});
    });
  });

  describe('useBrowserNavigation', () => {
    const closeNavigationDialogStub = sinon.stub(NavigationActions, 'closeNavigationDialog');

    beforeEach(() => {
      const onClose = 'onClose';
      closeNavigationDialogStub.reset();
      closeNavigationDialogStub.withArgs(onClose).returns({type: 'TEST 1'});
      closeNavigationDialogStub.withArgs(null).returns({type: 'TEST 2'});
      mountComponent(open => useBrowserNavigation(open, onClose), {}, false);
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
      sinon.assert.calledWithExactly(dispatchStub, {type: 'TEST 1'});
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
      sinon.assert.calledWithExactly(dispatchStub, {type: 'TEST 1'});
      sinon.assert.calledWithExactly(dispatchStub, {type: 'TEST 2'});
    });
  });

  describe('useQuotationsLoader', () => {
    const fetchQuotationStub = sinon.stub(QuotationsActions, 'fetchQuotation');

    beforeEach(() => {
      fetchQuotationStub.reset();
      fetchQuotationStub.withArgs({quotationId: 'Q1', overwriteLocalChanges: false}).returns({type: 'TEST'});
      mountComponent(() => useQuotationsLoader(), {
        auth: {},
        quotations: {quotation: {id: 'Q1'}},
        data: {quotations: {fetching: false}},
      }, true);
    });

    it('should not call fetchQuotation', () => {
      // call onChange to trigger useEffect
      act(() => component.props.onChange());

      sinon.assert.callCount(fetchQuotationStub, 0);
      sinon.assert.callCount(dispatchStub, 0);
    });

    it('should not call fetchQuotation when dispatch createQuotation.fulfilled', () => {
      act(() => {
        store.dispatch({type: QuotationsActions.createQuotation.fulfilled.type});
      });

      sinon.assert.callCount(fetchQuotationStub, 0);
      sinon.assert.callCount(dispatchStub, 0);
    });

    it('should call fetchQuotation only once', () => {
      act(() => {
        store.dispatch({
          type: AuthActions.login.type,
          payload: {
            loggedUser: {id: 'User 1'},
          },
        });
      });
      act(() => {
        store.dispatch({
          type: AuthActions.login.type,
          payload: {
            loggedUser: {id: 'User 2'},
          },
        });
      });

      sinon.assert.callCount(fetchQuotationStub, 1);
      sinon.assert.calledWithExactly(fetchQuotationStub, {quotationId: 'Q1', overwriteLocalChanges: false});
      sinon.assert.callCount(dispatchStub, 0);
    });
  });

  describe('useAreDishesLoaded', () => {
    const fetchDishStub = sinon.stub(DishesActions, 'fetchDish');

    beforeEach(() => fetchDishStub.reset());

    it('should return true as hook response', () => {
      mountComponent(() => useAreDishesLoaded([]), {data: {dishes: {}}}, false);

      expect(hookResponse).toBeTruthy();
      sinon.assert.callCount(fetchDishStub, 0);
      sinon.assert.callCount(dispatchStub, 0);
    });

    describe('not calling fetchDish', () => {
      beforeEach(() => {
        mountComponent(() => useAreDishesLoaded([{id: 'D1'}, {id: 'D2'}, {id: 'D3'}, {id: 'D4'}]), {
          data: {
            dishes: {
              data: {D2: {id: 'D2'}, D3: {id: 'D3'}, D4: {id: 'D4'}},
              fetching: {D1: true},
            },
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

      it('should not call fetchDish when dispatch createQuotation', () => {
        act(() => store.dispatch({type: QuotationsActions.createQuotation.fulfilled.type}));

        expect(hookResponse).toBeFalsy();
        sinon.assert.callCount(fetchDishStub, 0);
        sinon.assert.callCount(dispatchStub, 1);
      });
    });

    describe('calling fetchDish', () => {
      beforeEach(() => {
        fetchDishStub.withArgs('D1').returns({type: 'TEST 1'});
        fetchDishStub.withArgs('D2').returns({type: 'TEST 2'});
        fetchDishStub.withArgs('D3').returns({type: 'TEST 3'});
        fetchDishStub.withArgs('D4').returns({type: 'TEST 4'});
        mountComponent(() => useAreDishesLoaded([{id: 'D1'}, {id: 'D2'}, {id: 'D3'}, {id: 'D4'}]), {
          data: {dishes: {}},
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
        sinon.assert.calledWithExactly(dispatchStub, {type: 'TEST 1'});
        sinon.assert.calledWithExactly(dispatchStub, {type: 'TEST 2'});
        sinon.assert.calledWithExactly(dispatchStub, {type: 'TEST 3'});
        sinon.assert.calledWithExactly(dispatchStub, {type: 'TEST 4'});
      });
    });
  });
});