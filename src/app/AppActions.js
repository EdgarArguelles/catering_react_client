/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';
import Api from 'app/common/Api';

export const ACTION_TYPES = keyMirror({
  IS_APP_ONLINE: null,
  CHANGE_APP_THEME: null,
  CHANGE_APP_FACEBOOK_ACCESS_CODE: null,
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

  static getFacebookAccessCode() {
    const body = {query: '{getAccessCode(social: FACEBOOK)}'};

    return async dispatch => {
      const json = await Api.graphql(dispatch, body);
      dispatch({
        type: ACTION_TYPES.CHANGE_APP_FACEBOOK_ACCESS_CODE,
        payload: {
          data: json.data.getAccessCode,
        },
      });
      return json;
    };
  }
}