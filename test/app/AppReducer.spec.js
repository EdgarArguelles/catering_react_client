/* eslint-disable max-lines */
import {ACTION_TYPES} from 'app/AppActions';
import AppReducer from 'app/AppReducer';

describe('App -> Reducer', () => {
  it('should get default state when empty', () => {
    const state = {
      isOnline: true,
      theme: 'light',
      facebookAccessCode: '',
    };

    const result = AppReducer();

    expect(result).toStrictEqual(state);
  });

  it('should get the same original status when action is not allow', () => {
    const state = {
      isOnline: false,
      theme: 'test',
      facebookAccessCode: '123',
    };

    const result = AppReducer(state, {type: 'invalid'});

    expect(result).toStrictEqual(state);
    // don't mutate
    expect(state).toStrictEqual({
      isOnline: false,
      theme: 'test',
      facebookAccessCode: '123',
    });
  });

  describe('isOnline', () => {
    it('should change isOnline value to true when action is IS_APP_ONLINE', () => {
      const state = {
        isOnline: false,
        theme: 'test',
        facebookAccessCode: '123',
      };
      const stateExpected = {
        isOnline: true,
        theme: 'test',
        facebookAccessCode: '123',
      };
      const action = {type: ACTION_TYPES.IS_APP_ONLINE, payload: {isOnline: true}};

      const result = AppReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isOnline: false,
        theme: 'test',
        facebookAccessCode: '123',
      });
    });
  });

  describe('theme', () => {
    it('should change theme value to "dark" when action is CHANGE_APP_THEME', () => {
      const state = {
        isOnline: false,
        theme: 'test',
        facebookAccessCode: '123',
      };
      const stateExpected = {
        isOnline: false,
        theme: 'dark',
        facebookAccessCode: '123',
      };
      const action = {type: ACTION_TYPES.CHANGE_APP_THEME, payload: {theme: 'dark'}};

      const result = AppReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isOnline: false,
        theme: 'test',
        facebookAccessCode: '123',
      });
    });
  });

  describe('facebookAccessCode', () => {
    it('should change facebookAccessCode value to "456" when action is CHANGE_APP_FACEBOOK_ACCESS_CODE', () => {
      const state = {
        isOnline: false,
        theme: 'test',
        facebookAccessCode: '123',
      };
      const stateExpected = {
        isOnline: false,
        theme: 'test',
        facebookAccessCode: '456',
      };
      const action = {type: ACTION_TYPES.CHANGE_APP_FACEBOOK_ACCESS_CODE, payload: {data: '456'}};

      const result = AppReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        isOnline: false,
        theme: 'test',
        facebookAccessCode: '123',
      });
    });
  });
});