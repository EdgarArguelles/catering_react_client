import {createSlice} from '@reduxjs/toolkit';
import courseTypesReducer from './course_types/CourseTypesReducer';
import dishesReducer from './dishes/DishesReducer';
import quotationsReducer from './quotations/QuotationsReducer';

const SLICE_NAME = 'DATA';

const dataState = window.localStorage ? window.localStorage.getItem('dataState') : null;
const defaultValues = dataState ? JSON.parse(dataState) : {version: null};

const dataSlice = createSlice({
  name: SLICE_NAME,
  initialState: defaultValues,
  reducers: {
    changeVersion(state, {payload: version}) {
      state.version = version;
      state.dishes.data = null;
    },
  },
  extraReducers: builder => {
    return builder
      .addDefaultCase((state, action) => {
        state.courseTypes = courseTypesReducer(state.courseTypes, action);
        state.dishes = dishesReducer(state.dishes, action);
        state.quotations = quotationsReducer(state.quotations, action);
      });
  },
});

export default dataSlice.reducer;
export const {changeVersion} = dataSlice.actions;