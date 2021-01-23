import {createSlice} from '@reduxjs/toolkit';
import dishesReducer from './dishes/DishesReducer';
import quotationsReducer from './quotations/QuotationsReducer';

const SLICE_NAME = 'DATA';

const dataState = window.localStorage ? window.localStorage.getItem('dataState') : null;
const defaultValues = dataState ? JSON.parse(dataState) : {};

const dataSlice = createSlice({
  name: SLICE_NAME,
  initialState: defaultValues,
  extraReducers: builder => {
    return builder
      .addDefaultCase((state, action) => {
        state.dishes = dishesReducer(state.dishes, action);
        state.quotations = quotationsReducer(state.quotations, action);
      });
  },
});

export default dataSlice.reducer;