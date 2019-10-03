/**
 * This special reducer collect all reduces that store data from Backend
 *
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
import {ACTION_TYPES} from './AppActions';

const defaultTheme = window.localStorage && window.localStorage.getItem('appTheme') ?
  window.localStorage.getItem('appTheme') : 'light';

const isOnline = (state = navigator.onLine, action) => {
  switch (action.type) {
    case ACTION_TYPES.IS_APP_ONLINE:
      return action.payload.isOnline;
    default:
      return state;
  }
};

const theme = (state = defaultTheme, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_APP_THEME:
      return action.payload.theme;
    default:
      return state;
  }
};

export default (state = {}, action = {}) => {
  return {
    isOnline: isOnline(state.isOnline, action),
    theme: theme(state.theme, action),
  };
};