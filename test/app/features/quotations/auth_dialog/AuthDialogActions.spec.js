import {expect} from 'chai';
import AuthDialogActions, {ACTION_TYPES}
  from '../../../../../src/app/features/quotations/auth_dialog/AuthDialogActions';

describe('Quotations -> Auth Dialog -> Actions', () => {
  describe('openAuthDialog', () => {
    it('should dispatch CHANGE_IS_AUTH_DIALOG_OPEN', () => {
      const result = AuthDialogActions.openAuthDialog();

      expect(result).to.deep.equal({
        type: ACTION_TYPES.CHANGE_IS_AUTH_DIALOG_OPEN,
        payload: {
          isAuthDialogOpen: true,
        },
      });
    });
  });

  describe('closeAuthDialog', () => {
    it('should dispatch CHANGE_IS_AUTH_DIALOG_OPEN', () => {
      const result = AuthDialogActions.closeAuthDialog();

      expect(result).to.deep.equal({
        type: ACTION_TYPES.CHANGE_IS_AUTH_DIALOG_OPEN,
        payload: {
          isAuthDialogOpen: false,
        },
      });
    });
  });
});