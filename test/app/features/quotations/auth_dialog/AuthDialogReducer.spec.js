import {expect} from 'chai';
import {ACTION_TYPES} from '../../../../../src/app/features/quotations/auth_dialog/AuthDialogActions';
import {isAuthDialogOpen} from '../../../../../src/app/features/quotations/auth_dialog/AuthDialogReducer';

describe('Quotations -> Auth Dialog -> Reducer', () => {
  it('should get default state when empty', () => {
    const state = false;

    const result = isAuthDialogOpen();

    expect(result).to.deep.equal(state);
  });

  it('should get the same original status when action is not allow', () => {
    const state = true;

    const result = isAuthDialogOpen(state, {type: 'invalid'});

    expect(result).to.deep.equal(state);
    // don't mutate
    expect(state).to.deep.equal(true);
  });

  it('should take isAuthDialogOpen value from payload when action is CHANGE_IS_AUTH_DIALOG_OPEN', () => {
    const state = true;
    const stateExpected = false;
    const action = {type: ACTION_TYPES.CHANGE_IS_AUTH_DIALOG_OPEN, payload: {isAuthDialogOpen: false}};

    const result = isAuthDialogOpen(state, action);

    expect(result).to.deep.equal(stateExpected);
    // don't mutate
    expect(state).to.deep.equal(true);
  });
});