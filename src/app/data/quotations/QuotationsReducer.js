/**
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
import Utils from 'app/common/Utils';
import {ACTION_TYPES as API_ACTION_TYPES} from 'app/common/Api';
import {ACTION_TYPES as AUTH_ACTION_TYPES} from 'app/features/auth/AuthActions';
import {ACTION_TYPES} from './QuotationsActions';

export const quotationsFetching = (state = false, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_QUOTATIONS_REQUEST:
    case ACTION_TYPES.FETCH_QUOTATION_REQUEST:
      return true;
    case ACTION_TYPES.FETCH_QUOTATIONS_SUCCESS:
    case ACTION_TYPES.FETCH_QUOTATIONS_ERROR:
    case ACTION_TYPES.FETCH_QUOTATION_SUCCESS:
    case ACTION_TYPES.FETCH_QUOTATION_ERROR:
      return false;
    default:
      return state;
  }
};

export const quotationsUpdateFetching = (state = false, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.CREATE_QUOTATIONS_REQUEST:
    case ACTION_TYPES.EDIT_QUOTATIONS_REQUEST:
    case ACTION_TYPES.DELETE_QUOTATIONS_REQUEST:
      return true;
    case ACTION_TYPES.CREATE_QUOTATIONS_SUCCESS:
    case ACTION_TYPES.CREATE_QUOTATIONS_ERROR:
    case ACTION_TYPES.EDIT_QUOTATIONS_SUCCESS:
    case ACTION_TYPES.EDIT_QUOTATIONS_ERROR:
    case ACTION_TYPES.DELETE_QUOTATIONS_SUCCESS:
    case ACTION_TYPES.DELETE_QUOTATIONS_ERROR:
      return false;
    default:
      return state;
  }
};

export const quotationsError = (state = null, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.QUOTATIONS_CLEAN_ERROR:
    case ACTION_TYPES.FETCH_QUOTATIONS_REQUEST:
    case ACTION_TYPES.FETCH_QUOTATIONS_SUCCESS:
    case ACTION_TYPES.FETCH_QUOTATION_REQUEST:
    case ACTION_TYPES.FETCH_QUOTATION_SUCCESS:
    case ACTION_TYPES.CREATE_QUOTATIONS_REQUEST:
    case ACTION_TYPES.CREATE_QUOTATIONS_SUCCESS:
    case ACTION_TYPES.EDIT_QUOTATIONS_REQUEST:
    case ACTION_TYPES.EDIT_QUOTATIONS_SUCCESS:
    case ACTION_TYPES.DELETE_QUOTATIONS_REQUEST:
    case ACTION_TYPES.DELETE_QUOTATIONS_SUCCESS:
      return null;
    case ACTION_TYPES.FETCH_QUOTATIONS_ERROR:
    case ACTION_TYPES.FETCH_QUOTATION_ERROR:
    case ACTION_TYPES.CREATE_QUOTATIONS_ERROR:
    case ACTION_TYPES.EDIT_QUOTATIONS_ERROR:
    case ACTION_TYPES.DELETE_QUOTATIONS_ERROR:
      return action.payload;
    default:
      return state;
  }
};

export const quotationsMetaData = (state = null, action = {}) => {
  switch (action.type) {
    case API_ACTION_TYPES.SESSION_EXPIRED:
    case AUTH_ACTION_TYPES.PING_USER_ERROR:
    case AUTH_ACTION_TYPES.LOGOUT:
    case ACTION_TYPES.CREATE_QUOTATIONS_SUCCESS:
    case ACTION_TYPES.EDIT_QUOTATIONS_SUCCESS:
    case ACTION_TYPES.DELETE_QUOTATIONS_SUCCESS:
    case ACTION_TYPES.QUOTATIONS_CLEAN_QUOTATIONS:
      return null;
    case ACTION_TYPES.FETCH_QUOTATIONS_SUCCESS:
      return action.payload.metaData;
    default:
      return state;
  }
};

export const quotations = (state = null, action = {}) => {
  switch (action.type) {
    case API_ACTION_TYPES.SESSION_EXPIRED:
    case AUTH_ACTION_TYPES.PING_USER_ERROR:
    case AUTH_ACTION_TYPES.LOGOUT:
    case ACTION_TYPES.CREATE_QUOTATIONS_SUCCESS:
    case ACTION_TYPES.EDIT_QUOTATIONS_SUCCESS:
    case ACTION_TYPES.DELETE_QUOTATIONS_SUCCESS:
    case ACTION_TYPES.QUOTATIONS_CLEAN_QUOTATIONS:
      return null;
    case ACTION_TYPES.FETCH_QUOTATIONS_SUCCESS:
      return {...Utils.arrayToObject(action.payload.data), ...state};
    case ACTION_TYPES.FETCH_QUOTATION_SUCCESS:
      return {...state, ...Utils.arrayToObject([action.payload.data])};
    default:
      return state;
  }
};