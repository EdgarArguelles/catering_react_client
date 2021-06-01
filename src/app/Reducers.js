/**
 * Collect all reducers and combine them.
 */
import { combineReducers } from 'redux';
import app from './AppReducer';
import data from './data/DataReducer';
import auth from './features/auth/AuthReducer';
import quotations from './features/quotations/QuotationsReducer';

export default combineReducers({
  app, // app variables
  data, // all data from backend
  auth, // handle security, users and authentications
  quotations, // all quotations feature internal status
});