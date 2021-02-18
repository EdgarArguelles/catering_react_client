import {createSlice} from '@reduxjs/toolkit';

const SLICE_NAME = 'DATA_QUOTATIONS';

const quotationsDataSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isRemoteProcessing: false,
    fetching: false,
    error: null,
  },
  reducers: {
    changeIsRemoteProcessing(state, {payload: isRemoteProcessing}) {
      state.isRemoteProcessing = isRemoteProcessing;
    },
    changeFetching(state, {payload: fetching}) {
      state.fetching = fetching;
    },
    changeError(state, {payload: error}) {
      state.error = error;
    },
  },
});

export default quotationsDataSlice.reducer;
export const {changeIsRemoteProcessing, changeFetching, changeError} = quotationsDataSlice.actions;