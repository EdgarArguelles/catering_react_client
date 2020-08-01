/* eslint-disable max-lines */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Api, {ACTION_TYPES} from 'app/common/Api';
import Utils from 'app/common/Utils';
import {fetchPing, logout} from 'app/features/auth/AuthReducer';

const SLICE_NAME = 'DATA_QUOTATIONS';

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

export const fetchQuotations = createAsyncThunk(
  `${SLICE_NAME}/fetchQuotations`,
  async (pagination, thunkAPI) => {
    const FIELDS = 'totalElements totalPages content{id name createdAt price}';
    const body = {query: `{quotationPage(pageDataRequest: ${Utils.stringifyPageDataRequest(pagination)}) {${FIELDS}}}`};

    const json = await Api.graphql(thunkAPI.dispatch, body);
    const {content, totalElements, totalPages} = json.data.quotationPage;
    return {
      data: content,
      metaData: {pagination: {...pagination}, totalElements, totalPages},
    };
  },
);

export const fetchQuotation = createAsyncThunk(
  `${SLICE_NAME}/fetchQuotation`,
  async ({quotationId, overwriteLocalChanges}, thunkAPI) => {
    const FIELDS = 'id name createdAt price menus{id name quantity courses{id position type{id} dishes{id price}}}';
    const body = {query: `{quotation(id: ${quotationId}) {${FIELDS}}}`};

    const json = await Api.graphql(thunkAPI.dispatch, body);
    return {
      data: json.data.quotation,
      overwriteLocalChanges,
    };
  },
);

export const createQuotation = createAsyncThunk(
  `${SLICE_NAME}/createQuotation`,
  async (quotation, thunkAPI) => {
    const body = {query: `mutation {createQuotation(quotation: ${getQuotationFixed(quotation)}) {id}}`};

    // create a fake delay (ignore it in test cases)
    process.env.NODE_ENV !== 'test' && await new Promise(resolve => setTimeout(resolve, 3000));
    return await Api.graphql(thunkAPI.dispatch, body);
  },
);

export const editQuotation = createAsyncThunk(
  `${SLICE_NAME}/editQuotation`,
  async (quotation, thunkAPI) => {
    const body = {query: `mutation {updateQuotation(quotation: ${getQuotationFixed(quotation)}) {id}}`};

    // create a fake delay (ignore it in test cases)
    process.env.NODE_ENV !== 'test' && await new Promise(resolve => setTimeout(resolve, 3000));
    return await Api.graphql(thunkAPI.dispatch, body);
  },
);

export const deleteQuotation = createAsyncThunk(
  `${SLICE_NAME}/deleteQuotation`,
  async (quotationId, thunkAPI) => {
    const body = {query: `mutation {deleteQuotation(id: ${quotationId}) {id}}`};

    // create a fake delay (ignore it in test cases)
    process.env.NODE_ENV !== 'test' && await new Promise(resolve => setTimeout(resolve, 3000));
    return await Api.graphql(thunkAPI.dispatch, body);
  },
);

const setError = (state, action) => {
  state.fetching = false;
  state.error = action.error;
};

const setFetching = state => {
  state.fetching = true;
  state.error = null;
};

const cleanDataMetaData = state => {
  state.data = null;
  state.metaData = null;
};

const cleanData = state => {
  state.fetching = false;
  state.error = null;
  cleanDataMetaData(state);
};

const quotationsDataSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    data: null,
    metaData: null,
    error: null,
    fetching: false,
  },
  reducers: {
    cleanQuotations(state) {
      state.data = null;
      state.metaData = null;
    },
    cleanError(state) {
      state.error = null;
    },
  },
  extraReducers: {
    [fetchQuotations.pending]: setFetching,
    [fetchQuotations.fulfilled]: (state, action) => {
      state.data = {...Utils.arrayToObject(action.payload.data), ...state.data};
      state.metaData = action.payload.metaData;
      state.fetching = false;
      state.error = null;
    },
    [fetchQuotations.rejected]: setError,
    [fetchQuotation.pending]: setFetching,
    [fetchQuotation.fulfilled]: (state, action) => {
      state.data = {...state.data, ...Utils.arrayToObject([action.payload.data])};
      state.fetching = false;
      state.error = null;
    },
    [fetchQuotation.rejected]: setError,
    [createQuotation.pending]: setFetching,
    [createQuotation.fulfilled]: cleanData,
    [createQuotation.rejected]: setError,
    [editQuotation.pending]: setFetching,
    [editQuotation.fulfilled]: cleanData,
    [editQuotation.rejected]: setError,
    [deleteQuotation.pending]: setFetching,
    [deleteQuotation.fulfilled]: cleanData,
    [deleteQuotation.rejected]: setError,
    [ACTION_TYPES.SESSION_EXPIRED]: cleanDataMetaData,
    [logout.type]: cleanDataMetaData,
    [fetchPing.rejected]: cleanDataMetaData,
  },
});

export default quotationsDataSlice.reducer;
export const {cleanQuotations, cleanError} = quotationsDataSlice.actions;