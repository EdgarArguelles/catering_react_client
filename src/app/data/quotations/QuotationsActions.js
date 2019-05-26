/* eslint-disable max-lines */
/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';
import Api from 'app/common/Api';
import Utils from 'app/common/Utils';

export const ACTION_TYPES = keyMirror({
  QUOTATIONS_CLEAN_ERROR: null,
  QUOTATIONS_CLEAN_QUOTATIONS: null,
  QUOTATION_OVERWRITE_LOCAL: null,
  FETCH_QUOTATIONS_REQUEST: null,
  FETCH_QUOTATIONS_SUCCESS: null,
  FETCH_QUOTATIONS_ERROR: null,
  FETCH_QUOTATION_REQUEST: null,
  FETCH_QUOTATION_SUCCESS: null,
  FETCH_QUOTATION_ERROR: null,
  CREATE_QUOTATIONS_REQUEST: null,
  CREATE_QUOTATIONS_SUCCESS: null,
  CREATE_QUOTATIONS_ERROR: null,
  EDIT_QUOTATIONS_REQUEST: null,
  EDIT_QUOTATIONS_SUCCESS: null,
  EDIT_QUOTATIONS_ERROR: null,
  DELETE_QUOTATIONS_REQUEST: null,
  DELETE_QUOTATIONS_SUCCESS: null,
  DELETE_QUOTATIONS_ERROR: null,
});

/**
 * Clean extra information from quotation (not needed in graphql mutation)
 *
 * @param {Object} quotation data to be cleaned
 * @return {String} data cleaned
 */
const getQuotationFixed = quotation => {
  const quotationFixed = {...quotation, menus: []};
  quotation.menus && quotation.menus.forEach(menu => quotationFixed.menus.push({...menu}));
  quotationFixed.menus.forEach(menu => {
    delete menu.price;
    delete menu.isSelected;
  });

  return Utils.stringifyObjectWithNoQuotesOnKeys(quotationFixed);
};

export default class QuotationsActions {
  static cleanError() {
    return {type: ACTION_TYPES.QUOTATIONS_CLEAN_ERROR};
  }

  static cleanQuotations() {
    return {type: ACTION_TYPES.QUOTATIONS_CLEAN_QUOTATIONS};
  }

  static fetchQuotations(pagination) {
    const FIELDS = 'totalElements totalPages content{id name createdAt price}';
    const body = {query: `{quotationPage(pageDataRequest: ${Utils.stringifyPageDataRequest(pagination)}) {${FIELDS}}}`};

    return async dispatch => {
      try {
        dispatch({type: ACTION_TYPES.FETCH_QUOTATIONS_REQUEST});
        const json = await Api.graphql(dispatch, body);
        const {content, totalElements, totalPages} = json.data.quotationPage;
        dispatch({
          type: ACTION_TYPES.FETCH_QUOTATIONS_SUCCESS,
          payload: {
            data: content,
            metaData: {pagination: {...pagination}, totalElements, totalPages},
          },
        });
        return json;
      } catch (error) {
        dispatch({
          type: ACTION_TYPES.FETCH_QUOTATIONS_ERROR,
          error: true,
          payload: error,
        });
        throw error;
      }
    };
  }

  static fetchQuotation(quotationId, overwriteLocalChanges = true) {
    const FIELDS = 'id name createdAt price menus{id name quantity courses{id position type{id} dishes{id price}}}';
    const body = {query: `{quotation(id: ${quotationId}) {${FIELDS}}}`};

    return async dispatch => {
      try {
        dispatch({type: ACTION_TYPES.FETCH_QUOTATION_REQUEST});
        const json = await Api.graphql(dispatch, body);
        dispatch({
          type: ACTION_TYPES.FETCH_QUOTATION_SUCCESS,
          payload: {
            data: json.data.quotation,
          },
        });
        if (overwriteLocalChanges) {
          dispatch({
            type: ACTION_TYPES.QUOTATION_OVERWRITE_LOCAL,
            payload: {
              data: json.data.quotation,
            },
          });
        }
        return json;
      } catch (error) {
        dispatch({
          type: ACTION_TYPES.FETCH_QUOTATION_ERROR,
          error: true,
          payload: error,
        });
        throw error;
      }
    };
  }

  static createQuotation(quotation) {
    const body = {query: `mutation {createQuotation(quotation: ${getQuotationFixed(quotation)}) {id}}`};

    return async dispatch => {
      try {
        dispatch({type: ACTION_TYPES.CREATE_QUOTATIONS_REQUEST});
        // create a fake delay (ignore it in test cases)
        process.env.NODE_ENV !== 'test' && await new Promise(resolve => setTimeout(resolve, 3000));
        const json = await Api.graphql(dispatch, body);
        dispatch({
          type: ACTION_TYPES.CREATE_QUOTATIONS_SUCCESS,
          payload: {
            data: json.data.createQuotation,
          },
        });
        return json;
      } catch (error) {
        dispatch({
          type: ACTION_TYPES.CREATE_QUOTATIONS_ERROR,
          error: true,
          payload: error,
        });
        throw error;
      }
    };
  }

  static editQuotation(quotation) {
    const body = {query: `mutation {updateQuotation(quotation: ${getQuotationFixed(quotation)}) {id}}`};

    return async dispatch => {
      try {
        dispatch({type: ACTION_TYPES.EDIT_QUOTATIONS_REQUEST});
        // create a fake delay (ignore it in test cases)
        process.env.NODE_ENV !== 'test' && await new Promise(resolve => setTimeout(resolve, 3000));
        const json = await Api.graphql(dispatch, body);
        dispatch({
          type: ACTION_TYPES.EDIT_QUOTATIONS_SUCCESS,
          payload: {
            data: json.data.updateQuotation,
          },
        });
        return json;
      } catch (error) {
        dispatch({
          type: ACTION_TYPES.EDIT_QUOTATIONS_ERROR,
          error: true,
          payload: error,
        });
        throw error;
      }
    };
  }

  static deleteQuotation(quotationId) {
    const body = {query: `mutation {deleteQuotation(id: ${quotationId}) {id}}`};

    return async dispatch => {
      try {
        dispatch({type: ACTION_TYPES.DELETE_QUOTATIONS_REQUEST});
        // create a fake delay (ignore it in test cases)
        process.env.NODE_ENV !== 'test' && await new Promise(resolve => setTimeout(resolve, 3000));
        const json = await Api.graphql(dispatch, body);
        dispatch({
          type: ACTION_TYPES.DELETE_QUOTATIONS_SUCCESS,
          payload: {
            data: json.data.deleteQuotation,
          },
        });
        return json;
      } catch (error) {
        dispatch({
          type: ACTION_TYPES.DELETE_QUOTATIONS_ERROR,
          error: true,
          payload: error,
        });
        throw error;
      }
    };
  }
}