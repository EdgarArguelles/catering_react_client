/**
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
import {ACTION_TYPES as API_ACTION_TYPES} from '../../common/Api';
import {ACTION_TYPES} from './AuthActions';

const socketConnected = (state = false, action) => {
  switch (action.type) {
    case ACTION_TYPES.SOCKET_CONNECTED:
      return true;
    default:
      return state;
  }
};

const loggedUser = (state = null, action) => {
  switch (action.type) {
    case API_ACTION_TYPES.SESSION_EXPIRED:
    case ACTION_TYPES.PING_USER_ERROR:
    case ACTION_TYPES.LOGOUT:
      return null;
    case ACTION_TYPES.LOGIN_SUCCESS:
    case ACTION_TYPES.PING_USER_SUCCESS:
      return action.payload.loggedUser;
    default:
      return state;
  }
};

export default (state = {}, action = {}) => {
  return {
    socketConnected: socketConnected(state.socketConnected, action),
    loggedUser: loggedUser(state.loggedUser, action),
  };
};