import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Api from 'app/common/Api';
import Utils from 'app/common/Utils';

const SLICE_NAME = 'DATA_DISHES';
const FIELDS = 'id name description picture price status categories{name}';

export const fetchDishes = createAsyncThunk(
  `${SLICE_NAME}/fetchDishes`,
  async (courseTypeId, thunkAPI) => {
    const body = {query: `{courseType(id: ${courseTypeId}) {activeDishes{${FIELDS}}}}`};

    const json = await Api.graphql(thunkAPI.dispatch, body);
    return {
      courseTypeId,
      data: json.data.courseType.activeDishes,
    };
  },
);

export const fetchDish = createAsyncThunk(
  `${SLICE_NAME}/fetchDish`,
  async (dishId, thunkAPI) => {
    const body = {query: `{dish(id: ${dishId}) {${FIELDS}}}`};

    const json = await Api.graphql(thunkAPI.dispatch, body);
    return {
      dishId,
      data: json.data.dish,
    };
  },
);

const dishesDataSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    data: null,
    fetching: {},
  },
  extraReducers: builder => {
    return builder
      .addCase(fetchDishes.fulfilled, (state, action) => {
        const oldData = state.data ? Object.values(state.data)
          .filter(d => d.courseTypeId !== action.payload.courseTypeId) : [];
        const newData = action.payload.data.map(dish => ({...dish, courseTypeId: action.payload.courseTypeId}));
        state.data = Utils.arrayToObject([...oldData, ...newData]);
      })
      .addCase(fetchDish.fulfilled, (state, action) => {
        state.data = state.data && state.data[action.payload.data.id] ? state.data
          : {...state.data, ...Utils.arrayToObject([action.payload.data])};
        delete state.fetching[action.payload.dishId];
      })
      .addCase(fetchDish.rejected, (state, action) => {
        delete state.fetching[action.meta.arg];
      })
      .addCase(fetchDish.pending, (state, action) => {
        state.fetching[action.meta.arg] = true;
      });
  },
});

export default dishesDataSlice.reducer;