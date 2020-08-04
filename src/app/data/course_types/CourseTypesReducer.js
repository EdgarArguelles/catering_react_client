import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Api from 'app/common/Api';
import Utils from 'app/common/Utils';

const SLICE_NAME = 'DATA_COURSE_TYPES';

export const fetchCourseTypes = createAsyncThunk(
  `${SLICE_NAME}/fetchCourseTypes`,
  async (arg, thunkAPI) => {
    const body = {query: '{activeCourseTypes {id name picture position status}}'};
    const versionBody = {query: '{version {version}}'};

    const versionJson = await Api.graphql(thunkAPI.dispatch, versionBody);
    const json = await Api.graphql(thunkAPI.dispatch, body);
    return {
      data: json.data.activeCourseTypes,
      metaData: {version: versionJson.data.version.version},
    };
  },
);

const courseTypesDataSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    data: null,
  },
  reducers: {
    setCourseTypesData(state, {payload: courseTypesData}) {
      state.data = courseTypesData;
    },
  },
  extraReducers: builder => {
    return builder
      .addCase(fetchCourseTypes.fulfilled, (state, action) => {
        state.data = Utils.arrayToObject(action.payload.data);
      });
  },
});

export default courseTypesDataSlice.reducer;
export const {setCourseTypesData} = courseTypesDataSlice.actions;