import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'NAVIGATION';

const navigationSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    backLink: '',
    title: '',
    closeDialog: null,
  },
  reducers: {
    changeNavigation(state, { payload: { backLink, title } }) {
      state.backLink = backLink;
      state.title = title || '';
      state.closeDialog = null;
    },
    closeNavigationDialog(state, { payload: closeDialog }) {
      state.closeDialog = closeDialog;
    },
  },
});

export default navigationSlice.reducer;
export const { changeNavigation, closeNavigationDialog } = navigationSlice.actions;