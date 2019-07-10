/**
 * Collect all reducers and combine them.
 */
import {combineReducers} from 'redux';
import data from './data/DataReducer';
import auth from './features/auth/AuthReducer';
import quotations from './features/quotations/QuotationsReducer';

const defaultTheme = window.localStorage && window.localStorage.getItem('appTheme') ?
  window.localStorage.getItem('appTheme') : 'light';
const theme = (state = defaultTheme, action = {}) => {
  switch (action.type) {
    case 'CHANGE_APP_THEME':
      return action.payload.theme;
    default:
      return state;
  }
};

export const changeTheme = newTheme => ({type: 'CHANGE_APP_THEME', payload: {theme: newTheme}});

export default combineReducers({
  theme, // app theme
  data, // all data from backend
  auth, // handle security, users and authentications
  quotations, // all quotations feature internal status
});