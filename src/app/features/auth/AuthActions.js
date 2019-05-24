/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';
import Api from '../../common/Api';

export const ACTION_TYPES = keyMirror({
  SOCKET_CONNECTED: null,
  LOGOUT: null,
  LOGIN_SUCCESS: null,
  PING_USER_SUCCESS: null,
  PING_USER_ERROR: null,
});

/**
 * Remove "accessToken" and "userImage" from sessionStorage
 *
 * @return {void}
 */
const removeToken = () => {
  window.sessionStorage.removeItem('accessToken');
  window.sessionStorage.removeItem('userImage');
};

/**
 * Store "accessToken" and "userImage" in sessionStorage
 *
 * @param {Object} loggedUser user information
 * @return {void}
 */
const saveToken = loggedUser => {
  window.sessionStorage.setItem('accessToken', loggedUser.token);
  loggedUser.image && window.sessionStorage.setItem('userImage', loggedUser.image);
};

export default class AuthActions {
  static connectSocket() {
    return {
      type: ACTION_TYPES.SOCKET_CONNECTED,
    };
  }

  static logout() {
    removeToken();
    return {
      type: ACTION_TYPES.LOGOUT,
    };
  }

  static login(body) {
    saveToken(body.loggedUser);
    return {
      type: ACTION_TYPES.LOGIN_SUCCESS,
      payload: {
        loggedUser: body.loggedUser,
      },
    };
  }

  static fetchPing() {
    const body = {query: '{ping {id fullName image role token permissions}}'};

    return async dispatch => {
      try {
        const json = await Api.graphql(dispatch, body);
        const loggedUser = json && json.data && json.data.ping && json.data.ping.id ? json.data.ping : null;
        if (loggedUser) {
          saveToken(loggedUser);
          dispatch({
            type: ACTION_TYPES.PING_USER_SUCCESS,
            payload: {
              loggedUser,
            },
          });
        } else {
          removeToken();
          dispatch({type: ACTION_TYPES.PING_USER_ERROR});
        }
        return json;
      } catch (error) {
        removeToken();
        dispatch({type: ACTION_TYPES.PING_USER_ERROR});
        throw error;
      }
    };
  }
}