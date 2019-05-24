/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  QUOTATIONS_CHANGE_MENU_TAB: null,
  QUOTATIONS_CHANGE_IS_MENU_DIALOG_OPEN: null,
  QUOTATIONS_DELETE_LOCAL: null,
  QUOTATIONS_END_REMOTE_PROCESS: null,
});

export default class QuotationsActions {
  static changeMenuTab(tab) {
    return {
      type: ACTION_TYPES.QUOTATIONS_CHANGE_MENU_TAB,
      payload: {
        tab,
      },
    };
  }

  static changeMenuDialogOpen(isMenuDialogOpen) {
    return {
      type: ACTION_TYPES.QUOTATIONS_CHANGE_IS_MENU_DIALOG_OPEN,
      payload: {
        isMenuDialogOpen,
      },
    };
  }

  static deleteLocal() {
    return {type: ACTION_TYPES.QUOTATIONS_DELETE_LOCAL};
  }

  static endRemoteProcess() {
    return {type: ACTION_TYPES.QUOTATIONS_END_REMOTE_PROCESS};
  }
}