/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  CHANGE_NAVIGATION: null,
  CLOSE_NAVIGATION_DIALOG: null,
});

export default class NavigationActions {
  static changeNavigation(backLink, title = '') {
    return {
      type: ACTION_TYPES.CHANGE_NAVIGATION,
      payload: {
        backLink,
        title,
      },
    };
  }

  static closeNavigationDialog(closeDialog) {
    return {
      type: ACTION_TYPES.CLOSE_NAVIGATION_DIALOG,
      payload: {
        closeDialog,
      },
    };
  }
}