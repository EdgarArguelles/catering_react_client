/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  CHANGE_IS_AUTH_DIALOG_OPEN: null,
});

export default class AuthDialogActions {
  static openAuthDialog() {
    return {
      type: ACTION_TYPES.CHANGE_IS_AUTH_DIALOG_OPEN,
      payload: {
        isAuthDialogOpen: true,
      },
    };
  }

  static closeAuthDialog() {
    return {
      type: ACTION_TYPES.CHANGE_IS_AUTH_DIALOG_OPEN,
      payload: {
        isAuthDialogOpen: false,
      },
    };
  }
}