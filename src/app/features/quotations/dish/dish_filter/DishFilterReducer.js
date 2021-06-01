import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'DISH_FILTER';

const dishFilterSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isDialogOpen: false,
    search: '',
    sort: 'name',
    categories: null,
  },
  reducers: {
    openDishFilterDialog(state) {
      state.isDialogOpen = true;
    },
    closeDishFilterDialog(state) {
      state.isDialogOpen = false;
    },
    cleanFilters(state) {
      state.search = '';
      state.sort = 'name';
      state.categories = null;
    },
    changeSearch(state, { payload: search }) {
      state.search = search;
    },
    changeSort(state, { payload: sort }) {
      state.sort = sort;
    },
    setCategories(state, { payload: categories }) {
      state.categories = categories;
    },
    addCategory(state, { payload: category }) {
      state.categories.push(category);
    },
    removeCategory(state, { payload: category }) {
      state.categories = state.categories.filter(cat => cat !== category);
    },
  },
});

export default dishFilterSlice.reducer;
export const {
  openDishFilterDialog, closeDishFilterDialog, cleanFilters, changeSearch, changeSort, setCategories, addCategory,
  removeCategory,
} = dishFilterSlice.actions;