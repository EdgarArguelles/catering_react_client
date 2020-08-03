import authDialogReducer, {
  closeAuthDialog,
  openAuthDialog,
} from 'app/features/quotations/auth_dialog/AuthDialogReducer';

describe('Quotations -> Auth Dialog -> Reducer/Actions', () => {
  describe('Reducer', () => {
    it('should get default state when undefined', () => {
      const state = false;

      const result = authDialogReducer(undefined, {type: 'invalid'});

      expect(result).toStrictEqual(state);
    });

    it('should get the same original status when action is not allow', () => {
      const state = true;

      const result = authDialogReducer(state, {type: 'invalid'});

      expect(result).toStrictEqual(state);
      // don't mutate
      expect(state).toStrictEqual(true);
    });

    it('should change isAuthDialogOpen to true when action is openAuthDialog', () => {
      const state = false;
      const stateExpected = true;
      const action = {type: openAuthDialog.type};

      const result = authDialogReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual(false);
    });

    it('should change isAuthDialogOpen to false when action is closeAuthDialog', () => {
      const state = true;
      const stateExpected = false;
      const action = {type: closeAuthDialog.type};

      const result = authDialogReducer(state, action);

      expect(result).toStrictEqual(stateExpected);
      // don't mutate
      expect(state).toStrictEqual(true);
    });
  });
});