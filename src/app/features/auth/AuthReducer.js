import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Api, {ACTION_TYPES} from 'app/common/Api';

const SLICE_NAME = 'AUTH';

/**
 * Remove "accessToken" and "userImage" from sessionStorage
 *
 * @return {void}
 */
const removeToken = () => {
  window.sessionStorage.removeItem('accessToken');
  window.sessionStorage.removeItem('userImage');
};

/**
 * Store "accessToken" and "userImage" in sessionStorage
 *
 * @param {Object} loggedUser user information
 * @return {void}
 */
const saveToken = loggedUser => {
  window.sessionStorage.setItem('accessToken', loggedUser.token);
  loggedUser.image && window.sessionStorage.setItem('userImage', loggedUser.image);
};

export const fetchPing = createAsyncThunk(
  `${SLICE_NAME}/fetchPing`,
  async (arg, thunkAPI) => {
    const body = {query: '{ping {id fullName image role token permissions}}'};

    const json = await Api.graphql(thunkAPI.dispatch, body);
    const loggedUser = json && json.data && json.data.ping && json.data.ping.id ? json.data.ping : null;
    if (!loggedUser) {
      throw new Error('loggedUser not present');
    }
    return loggedUser;
  },
);

const authSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    socketConnected: false,
    loggedUser: null,
  },
  reducers: {
    connectSocket(state) {
      state.socketConnected = true;
    },
    logout(state) {
      removeToken();
      state.loggedUser = null;
    },
    login(state, {payload: {loggedUser}}) {
      saveToken(loggedUser);
      state.loggedUser = loggedUser;
    },
  },
  extraReducers: builder => {
    return builder
      .addCase(fetchPing.fulfilled, (state, action) => {
        saveToken(action.payload);
        state.loggedUser = action.payload;
      })
      .addCase(fetchPing.rejected, state => {
        removeToken();
        state.loggedUser = null;
      })
      .addCase(ACTION_TYPES.SESSION_EXPIRED, state => {
        state.loggedUser = null;
      });
  },
});

export default authSlice.reducer;
export const {connectSocket, logout, login} = authSlice.actions;