import {createSlice} from '@reduxjs/toolkit';
import {fetchQuotation} from 'app/data/quotations/QuotationsReducer';
import menuReducer, {cleanData} from 'app/features/quotations/menu/MenuReducer';

const SLICE_NAME = 'QUOTATION';

const overwriteLocal = quotation => {
  return {
    ...quotation,
    menus: quotation.menus.map(menu => ({
      ...menu,
      price: menu.courses.reduce(
        (accumulator, course) => accumulator + course.dishes.reduce((sum, dish) => sum + dish.price, 0),
        0,
      ),
    })),
  };
};

const quotationSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    name: '',
    menus: [],
    price: 0,
  },
  reducers: {
    changeName(state, {payload: name}) {
      state.name = name;
    },
    selectMenu(state, {payload: menuId}) {
      state.menus.forEach(menu => (menu.isSelected = menu.id === menuId));
    },
    addNewMenu(state, {payload: menuId}) {
      state.menus.push(menuReducer({id: menuId}, {type: cleanData.type}));
    },
    addMenu(state, {payload: menu}) {
      state.menus.push(menu);
    },
    removeMenu(state, {payload: menuId}) {
      state.menus = state.menus.filter(menu => menu.id !== menuId);
    },
    setPrice(state, {payload: price}) {
      state.price = price;
    },
    revertQuotation(state, {payload: quotation}) {
      return overwriteLocal(quotation);
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchQuotation.fulfilled, (state, action) => {
        if (action.payload.overwriteLocalChanges) {
          return overwriteLocal(action.payload.data);
        }

        return state;
      })
      .addDefaultCase((state, action) => {
        const selected = state.menus.find(menu => menu.isSelected);
        if (selected) {
          const noSelected = state.menus.filter(menu => !menu.isSelected);
          state.menus = [...noSelected, menuReducer(selected, action)];
        }
      }),
});

export default quotationSlice.reducer;
export const {
  changeName, selectMenu, addNewMenu, addMenu, removeMenu, setPrice, revertQuotation,
} = quotationSlice.actions;