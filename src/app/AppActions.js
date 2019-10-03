/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  CHANGE_APP_THEME: null,
});

export default class AppActions {
  static changeTheme(theme) {
    return {
      type: ACTION_TYPES.CHANGE_APP_THEME,
      payload: {
        theme,
      },
    };
  }
}