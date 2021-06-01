import { createSlice } from '@reduxjs/toolkit';
import quotationsReducer from './quotations/QuotationsReducer';

const SLICE_NAME = 'DATA';

const dataSlice = createSlice({
  name: SLICE_NAME,
  initialState: {},
  extraReducers: builder => {
    return builder
      .addDefaultCase((state, action) => {
        state.quotations = quotationsReducer(state.quotations, action);
      });
  },
});

export default dataSlice.reducer;