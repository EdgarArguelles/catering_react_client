import QuotationsActions, {ACTION_TYPES} from 'app/features/quotations/QuotationsActions';

describe('Quotations -> Actions', () => {
  describe('changeMenuTab', () => {
    it('should dispatch QUOTATIONS_CHANGE_MENU_TAB', () => {
      const tab = 5;

      const result = QuotationsActions.changeMenuTab(tab);

      expect(result).toStrictEqual({
        type: ACTION_TYPES.QUOTATIONS_CHANGE_MENU_TAB,
        payload: {
          tab,
        },
      });
      // don't mutate
      expect(tab).toStrictEqual(5);
    });
  });

  describe('changeMenuDialogOpen', () => {
    it('should dispatch QUOTATIONS_CHANGE_IS_MENU_DIALOG_OPEN', () => {
      const isMenuDialogOpen = true;

      const result = QuotationsActions.changeMenuDialogOpen(isMenuDialogOpen);

      expect(result).toStrictEqual({
        type: ACTION_TYPES.QUOTATIONS_CHANGE_IS_MENU_DIALOG_OPEN,
        payload: {
          isMenuDialogOpen,
        },
      });
      // don't mutate
      expect(isMenuDialogOpen).toStrictEqual(true);
    });
  });

  describe('deleteLocal', () => {
    it('should dispatch QUOTATIONS_DELETE_LOCAL', () => {
      const result = QuotationsActions.deleteLocal();

      expect(result).toStrictEqual({type: ACTION_TYPES.QUOTATIONS_DELETE_LOCAL});
    });
  });

  describe('endRemoteProcess', () => {
    it('should dispatch QUOTATIONS_END_REMOTE_PROCESS', () => {
      const result = QuotationsActions.endRemoteProcess();

      expect(result).toStrictEqual({type: ACTION_TYPES.QUOTATIONS_END_REMOTE_PROCESS});
    });
  });
});