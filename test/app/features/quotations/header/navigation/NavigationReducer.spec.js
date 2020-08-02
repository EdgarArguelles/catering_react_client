/* eslint-disable max-lines */
import NavigationReducer, {
  changeNavigation,
  closeNavigationDialog,
} from 'app/features/quotations/header/navigation/NavigationReducer';

describe('Quotations -> Header -> Navigation -> Reducer/Actions', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state = {
        backLink: '',
        title: '',
        closeDialog: null,
      };

      const result = NavigationReducer(undefined, {type: 'invalid'});

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

    it('should change backLink value when action is changeNavigation', () => {
      const state = {
        backLink: 'abc',
        title: '123',
        closeDialog: {id: 'ID1'},
      };
      const stateExpected = {
        backLink: 'abc123',
        title: '',
        closeDialog: null,
      };
      const action = {type: changeNavigation.type, payload: {backLink: 'abc123'}};

      const result = NavigationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        backLink: 'abc',
        title: '123',
        closeDialog: {id: 'ID1'},
      });
    });

    it('should change title value when action is changeNavigation', () => {
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
      const action = {type: changeNavigation.type, payload: {title: '123abc'}};

      const result = NavigationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        backLink: 'abc',
        title: '123',
        closeDialog: {id: 'ID1'},
      });
    });

    it('should set closeDialog to null when action is changeNavigation', () => {
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
      const action = {type: changeNavigation.type, payload: {backLink: 'a', title: 'b'}};

      const result = NavigationReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual({
        backLink: 'abc',
        title: '123',
        closeDialog: {id: 'ID1'},
      });
    });

    it('should change closeDialog value when action is closeNavigationDialog', () => {
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
      const action = {type: closeNavigationDialog.type, payload: {id: 'ID22'}};

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