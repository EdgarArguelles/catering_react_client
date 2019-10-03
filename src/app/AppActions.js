/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  IS_APP_ONLINE: null,
  CHANGE_APP_THEME: null,
});

export default class AppActions {
  static changeIsOnline(isOnline) {
    return {
      type: ACTION_TYPES.IS_APP_ONLINE,
      payload: {
        isOnline,
      },
    };
  }

  static changeTheme(theme) {
    return {
      type: ACTION_TYPES.CHANGE_APP_THEME,
      payload: {
        theme,
      },
    };
  }
}