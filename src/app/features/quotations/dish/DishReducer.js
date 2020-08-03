import {createSlice} from '@reduxjs/toolkit';
import Utils from 'app/common/Utils';
import dishFilterReducer from './dish_filter/DishFilterReducer';

const SLICE_NAME = 'DISH';

const dishSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    selected: '',
    showActions: true,
    filter: dishFilterReducer(undefined, Utils.INITIAL_ACTION),
  },
  reducers: {
    selectDish(state, {payload: dishId}) {
      state.selected = dishId;
      state.showActions = true;
    },
    selectDishWithoutActions(state, {payload: dishId}) {
      state.selected = dishId;
      state.showActions = false;
    },
  },
  extraReducers: builder => {
    return builder
      .addDefaultCase((state, action) => {
        state.filter = dishFilterReducer(state.filter, action);
      });
  },
});

export default dishSlice.reducer;
export const {selectDish, selectDishWithoutActions} = dishSlice.actions;