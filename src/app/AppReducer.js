import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Api from 'app/common/Api';

const SLICE_NAME = 'APP';

const defaultTheme = window.localStorage && window.localStorage.getItem('appTheme') ?
  window.localStorage.getItem('appTheme') : 'light';

export const getFacebookAccessCode = createAsyncThunk(
  `${SLICE_NAME}/getFacebookAccessCode`,
  async (arg, thunkAPI) => {
    const body = {query: '{getAccessCode(social: FACEBOOK)}'};

    return await Api.graphql(thunkAPI.dispatch, body);
  },
);

const appSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isOnline: navigator.onLine,
    theme: defaultTheme,
    facebookAccessCode: '',
  },
  reducers: {
    changeIsOnline(state, {payload: isOnline}) {
      state.isOnline = isOnline;
    },
    changeTheme(state, {payload: theme}) {
      state.theme = theme;
    },
  },
  extraReducers: {
    [getFacebookAccessCode.fulfilled]: (state, action) => {
      state.facebookAccessCode = action.payload.data.getAccessCode;
    },
  },
});

export default appSlice.reducer;
export const {changeIsOnline, changeTheme} = appSlice.actions;