/* eslint-disable max-lines */
import sinon from 'sinon';
import { act } from 'react-test-renderer';
import { waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import { renderReduxComponent } from 'app/../../test/TestHelper';
import { useAppTheme, useBrowserNavigation, useIsMobileSize, usePingServer } from 'app/hooks/Common';
import { changeTheme as changeThemeAction } from 'app/AppReducer';
import * as AuthActions from 'app/features/auth/AuthReducer';
import * as NavigationActions from 'app/features/quotations/header/navigation/NavigationReducer';

describe('Hooks -> Common', () => {
  const dispatchStub = sinon.stub();
  let hookResponse, wrapper;

  afterEach(() => {
    dispatchStub.reset();
    hookResponse = undefined;
    wrapper = undefined;
  });

  const fireOnChange = params => {
    const component = wrapper.root.find(el => el.type === 'div');
    act(() => component.props.onChange(params));
  };

  const mountComponent = renderReduxComponent(({ hook }) => {
    const [value, setValue] = useState(null);
    hookResponse = hook(value);
    return <div value={value} onChange={newValue => setValue(newValue)}/>;
  }, dispatchStub);

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
      const { theme, themeIcon } = hookResponse;

      expect(theme).toStrictEqual('light');
      expect(themeIcon).not.toBeNull();
      sinon.assert.callCount(dispatchStub, 0);
    });

    it('should call changeTheme with dark', () => {
      mountComponent(() => useAppTheme(), { app: { theme: 'light' } }, false);
      const { theme, themeIcon, changeTheme } = hookResponse;
      changeTheme();

      expect(theme).toStrictEqual('light');
      expect(themeIcon).not.toBeNull();
      sinon.assert.callCount(dispatchStub, 1);
      sinon.assert.calledWithExactly(dispatchStub, { payload: 'dark', type: changeThemeAction.type });
    });

    it('should call changeTheme with light', () => {
      mountComponent(() => useAppTheme(), { app: { theme: 'dark' } }, false);
      const { theme, themeIcon, changeTheme } = hookResponse;
      changeTheme();

      expect(theme).toStrictEqual('dark');
      expect(themeIcon).not.toBeNull();
      sinon.assert.callCount(dispatchStub, 1);
      sinon.assert.calledWithExactly(dispatchStub, { payload: 'light', type: changeThemeAction.type });
    });
  });

  describe('usePingServer', () => {
    const fetchPingStub = sinon.stub(AuthActions, 'fetchPing');

    beforeEach(() => {
      fetchPingStub.reset();
      fetchPingStub.withArgs().returns({ type: 'TEST' });
      mountComponent(() => usePingServer(), {}, false);
    });

    it('should call fetchPing', async () => {
      // wait until fire fetchPing
      await act(() => waitFor(() => sinon.assert.callCount(fetchPingStub, 1)));

      sinon.assert.callCount(fetchPingStub, 1);
      sinon.assert.calledWithExactly(fetchPingStub);
      sinon.assert.callCount(dispatchStub, 1);
      sinon.assert.calledWithExactly(dispatchStub, { type: 'TEST' });
    });
  });

  describe('useBrowserNavigation', () => {
    const closeNavigationDialogStub = sinon.stub(NavigationActions, 'closeNavigationDialog');

    beforeEach(() => {
      const onClose = 'onClose';
      closeNavigationDialogStub.reset();
      closeNavigationDialogStub.withArgs(onClose).returns({ type: 'TEST 1' });
      closeNavigationDialogStub.withArgs(null).returns({ type: 'TEST 2' });
      const data = mountComponent(open => useBrowserNavigation(open, onClose), {}, false);
      wrapper = data.wrapper;
    });

    it('should not call closeNavigationDialog', () => {
      // call onChange to trigger useEffect
      fireOnChange();

      sinon.assert.callCount(closeNavigationDialogStub, 0);
      sinon.assert.callCount(dispatchStub, 0);
    });

    it('should call closeNavigationDialog', () => {
      jest.useFakeTimers();
      fireOnChange(true);
      jest.runAllTimers();

      sinon.assert.callCount(closeNavigationDialogStub, 1);
      sinon.assert.calledWithExactly(closeNavigationDialogStub, 'onClose');
      sinon.assert.callCount(dispatchStub, 1);
      sinon.assert.calledWithExactly(dispatchStub, { type: 'TEST 1' });
    });

    it('should call closeNavigationDialog twice', () => {
      jest.useFakeTimers();
      fireOnChange(true);
      fireOnChange(false);
      jest.runAllTimers();

      sinon.assert.callCount(closeNavigationDialogStub, 2);
      sinon.assert.calledWithExactly(closeNavigationDialogStub, 'onClose');
      sinon.assert.calledWithExactly(closeNavigationDialogStub, null);
      sinon.assert.callCount(dispatchStub, 2);
      sinon.assert.calledWithExactly(dispatchStub, { type: 'TEST 1' });
      sinon.assert.calledWithExactly(dispatchStub, { type: 'TEST 2' });
    });
  });
});