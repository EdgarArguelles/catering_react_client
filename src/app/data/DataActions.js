/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  DATA_CHANGE_VERSION: null,
});

export default class DataActions {
  static changeVersion(version) {
    return {
      type: ACTION_TYPES.DATA_CHANGE_VERSION,
      payload: {
        version,
      },
    };
  }
}