import {createSlice} from '@reduxjs/toolkit';

const SLICE_NAME = 'MULTIPLE_DISHES_DIALOG';

const multipleDishesDialogSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isMultipleDishesDialogOpen: false,
    dishes: [],
  },
  reducers: {
    openDialog(state) {
      state.isMultipleDishesDialogOpen = true;
    },
    closeDialog(state) {
      state.isMultipleDishesDialogOpen = false;
    },
    cleanDishes(state) {
      state.dishes = [];
    },
    addDish(state, {payload: dishId}) {
      state.dishes.push({id: dishId});
    },
    removeDish(state, {payload: dishId}) {
      state.dishes = state.dishes.filter(dish => dish.id !== dishId);
    },
  },
});

export default multipleDishesDialogSlice.reducer;
export const {openDialog, closeDialog, cleanDishes, addDish, removeDish} = multipleDishesDialogSlice.actions;