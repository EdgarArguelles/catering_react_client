/* eslint-disable max-lines */
import {ACTION_TYPES} from 'app/features/quotations/header/navigation/NavigationActions';
import NavigationReducer from 'app/features/quotations/header/navigation/NavigationReducer';

describe('Quotations -> Header -> Navigation -> Reducer', () => {
  it('should get default state when empty', () => {
    const state = {
      backLink: '',
      title: '',
      closeDialog: null,
    };

    const result = NavigationReducer();

    expect(result).toStrictEqual(state);
  });

  it('should get the same original status when action is not allow', () => {
    const state = {
      backLink: 'abc',
      title: '123',
      closeDialog: {id: 'ID1'},
    };

    const result = NavigationReducer(state, {type: 'invalid'});

    expect(result).toStrictEqual(state);
    // don't mutate
    expect(state).toStrictEqual({
      backLink: 'abc',
      title: '123',
      closeDialog: {id: 'ID1'},
    });
  });

  describe('backLink', () => {
    it('should change backLink value when action is CHANGE_NAVIGATION', () => {
      const state = {
        backLink: 'abc',
        title: '123',
        closeDialog: {id: 'ID1'},
      };
      const stateExpected = {
        backLink: 'abc123',
        title: undefined,
        closeDialog: null,
      };
      const action = {type: ACTION_TYPES.CHANGE_NAVIGATION, payload: {backLink: 'abc123'}};

      const result = NavigationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        backLink: 'abc',
        title: '123',
        closeDialog: {id: 'ID1'},
      });
    });
  });

  describe('title', () => {
    it('should change title value when action is CHANGE_NAVIGATION', () => {
      const state = {
        backLink: 'abc',
        title: '123',
        closeDialog: {id: 'ID1'},
      };
      const stateExpected = {
        backLink: undefined,
        title: '123abc',
        closeDialog: null,
      };
      const action = {type: ACTION_TYPES.CHANGE_NAVIGATION, payload: {title: '123abc'}};

      const result = NavigationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        backLink: 'abc',
        title: '123',
        closeDialog: {id: 'ID1'},
      });
    });
  });

  describe('closeDialog', () => {
    it('should change closeDialog value when action is CLOSE_NAVIGATION_DIALOG', () => {
      const state = {
        backLink: 'abc',
        title: '123',
        closeDialog: {id: 'ID1'},
      };
      const stateExpected = {
        backLink: 'abc',
        title: '123',
        closeDialog: {id: 'ID22'},
      };
      const action = {type: ACTION_TYPES.CLOSE_NAVIGATION_DIALOG, payload: {closeDialog: {id: 'ID22'}}};

      const result = NavigationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        backLink: 'abc',
        title: '123',
        closeDialog: {id: 'ID1'},
      });
    });

    it('should set to null when action is CHANGE_NAVIGATION', () => {
      const state = {
        backLink: 'abc',
        title: '123',
        closeDialog: {id: 'ID1'},
      };
      const stateExpected = {
        backLink: 'a',
        title: 'b',
        closeDialog: null,
      };
      const action = {type: ACTION_TYPES.CHANGE_NAVIGATION, payload: {backLink: 'a', title: 'b'}};

      const result = NavigationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        backLink: 'abc',
        title: '123',
        closeDialog: {id: 'ID1'},
      });
    });
  });
});