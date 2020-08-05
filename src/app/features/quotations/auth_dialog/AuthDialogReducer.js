import {createSlice} from '@reduxjs/toolkit';

const SLICE_NAME = 'AUTH_DIALOG';

const authDialogSlice = createSlice({
  name: SLICE_NAME,
  initialState: false,
  reducers: {
    openAuthDialog() {
      return true;
    },
    closeAuthDialog() {
      return false;
    },
  },
});

export default authDialogSlice.reducer;
export const {openAuthDialog, closeAuthDialog} = authDialogSlice.actions;