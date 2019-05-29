import NavigationActions, {ACTION_TYPES} from 'app/features/quotations/header/navigation/NavigationActions';

describe('Quotations -> Header -> Navigation -> Actions', () => {
  describe('changeNavigation', () => {
    it('should dispatch CHANGE_NAVIGATION and use default title', () => {
      const backLink = 'test';

      const result = NavigationActions.changeNavigation(backLink);

      expect(result).toStrictEqual({
        type: ACTION_TYPES.CHANGE_NAVIGATION,
        payload: {
          backLink,
          title: '',
        },
      });
      // don't mutate
      expect(backLink).toStrictEqual('test');
    });

    it('should dispatch CHANGE_NAVIGATION', () => {
      const backLink = 'test';
      const title = 'title 1';

      const result = NavigationActions.changeNavigation(backLink, title);

      expect(result).toStrictEqual({
        type: ACTION_TYPES.CHANGE_NAVIGATION,
        payload: {
          backLink,
          title,
        },
      });
      // don't mutate
      expect(backLink).toStrictEqual('test');
      expect(title).toStrictEqual('title 1');
    });
  });

  describe('closeNavigationDialog', () => {
    it('should dispatch CLOSE_NAVIGATION_DIALOG', () => {
      const closeDialog = 'test';

      const result = NavigationActions.closeNavigationDialog(closeDialog);

      expect(result).toStrictEqual({
        type: ACTION_TYPES.CLOSE_NAVIGATION_DIALOG,
        payload: {
          closeDialog,
        },
      });
      // don't mutate
      expect(closeDialog).toStrictEqual('test');
    });
  });
});