/* eslint-disable max-lines */
export const ACTION_TYPES = { FETCH_FAILURE: 'FETCH_FAILURE', SESSION_EXPIRED: 'SESSION_EXPIRED' };

/**
 * Handle endpoint calls
 *
 * Create fetch headers with authorization
 * @param {Object} headers fetch headers
 * @return {Object} headers created with authorization
 */
const createHeaders = (headers = {}) => {
  const accessToken = window?.sessionStorage?.getItem('accessToken');
  const authorization = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  return { ...headers, ...authorization };
};

/**
 * Call an Api endpoint, process it and return a promise
 * @param {Object} dispatch application dispatch for emitting when error
 * @param {string} endpoint Api endpoint
 * @param {Object} options fetch options
 * @return {Object} resulted promise
 */
const fetchAPI = async (dispatch, endpoint, options = {}) => {
  // Checks for 'http' or '//' at the start to detect of the endpoint
  // has a domain name. If the endpoint already has a domain name do
  // not prefix the api host.
  const prefix = (/^(\/\/|http)/.exec(endpoint)) ? '' : process.env.API_URL;

  try {
    const response = await fetch(prefix + endpoint, options);
    const blobRequested = options.headers.Accept === 'application/octet-stream';
    const payload = blobRequested ? await response.blob() : await response.json();

    if (!response.ok) {
      payload.errorCode = response.status;
      throw payload;
    }

    if (blobRequested) {
      const contentDisposition = response.headers.get('Content-Disposition') || '';
      const fileName = contentDisposition.split('= ')[1];
      return {
        blob: payload,
        fileName: fileName,
      };
    }

    return payload;
  } catch (error) {
    if (error.errorCode === 401 || error.errorCode === 403) {
      // Unauthorized
      window.sessionStorage.removeItem('accessToken');
      window.sessionStorage.removeItem('userImage');

      dispatch({ type: ACTION_TYPES.SESSION_EXPIRED });
    }

    dispatch({
      type: ACTION_TYPES.FETCH_FAILURE,
      error: true,
      payload: error,
    });
    throw error;
  }
};

export default class Api {
  /**
   * Call a graphql endpoint that returns a Json
   * @param {Object} dispatch application dispatch for emitting when error
   * @param {Object} body fetch body
   * @param {Object} options fetch options
   * @return {Object} resulted promise
   */
  static async graphql(dispatch, body, options = {}) {
    const json = await Api.postJSON(dispatch, '/graphql', body, options);

    if (json.errors && json.errors[0]) {
      throw new Error(json.errors[0].message);
    }

    return json;
  }

  /**
   * Call an Api endpoint via GET that returns a Json
   * @param {Object} dispatch application dispatch for emitting when error
   * @param {string} endpoint Api endpoint
   * @param {Object} options fetch options
   * @return {Object} resulted promise
   */
  static getJSON(dispatch, endpoint, options = {}) {
    return fetchAPI(dispatch, endpoint, {
      ...options,
      method: 'GET',
      headers: createHeaders({
        ...options.headers,
        Accept: 'application/json',
      }),
    });
  }

  /**
   * Call an Api endpoint via POST that returns a Json
   * @param {Object} dispatch application dispatch for emitting when error
   * @param {string} endpoint Api endpoint
   * @param {Object} body fetch body
   * @param {Object} options fetch options
   * @return {Object} resulted promise
   */
  static postJSON(dispatch, endpoint, body, options = {}) {
    return fetchAPI(dispatch, endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
      headers: createHeaders({
        ...options.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
  }

  /**
   * Call an Api endpoint via PUT that returns a Json
   * @param {Object} dispatch application dispatch for emitting when error
   * @param {string} endpoint Api endpoint
   * @param {Object} body fetch body
   * @param {Object} options fetch options
   * @return {Object} resulted promise
   */
  static putJSON(dispatch, endpoint, body, options = {}) {
    return fetchAPI(dispatch, endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
      headers: createHeaders({
        ...options.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
  }

  /**
   * Call an Api endpoint via DELETE that returns a Json
   * @param {Object} dispatch application dispatch for emitting when error
   * @param {string} endpoint Api endpoint
   * @param {Object} options fetch options
   * @return {Object} resulted promise
   */
  static deleteJSON(dispatch, endpoint, options = {}) {
    return fetchAPI(dispatch, endpoint, {
      ...options,
      method: 'DELETE',
      headers: createHeaders({
        ...options.headers,
        Accept: 'application/json',
      }),
    });
  }

  /**
   * Call an Api endpoint via GET that returns a Blob
   * @param {Object} dispatch application dispatch for emitting when error
   * @param {string} endpoint Api endpoint
   * @param {Object} options fetch options
   * @return {Object} resulted promise
   */
  static getBLOB(dispatch, endpoint, options = {}) {
    return fetchAPI(dispatch, endpoint, {
      ...options,
      method: 'GET',
      headers: createHeaders({
        ...options.headers,
        Accept: 'application/octet-stream',
      }),
    });
  }
}