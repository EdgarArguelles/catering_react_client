import {createSlice} from '@reduxjs/toolkit';
import {logout} from 'app/features/auth/AuthReducer';
import authDialogReducer from './auth_dialog/AuthDialogReducer';
import navigationReducer from './header/navigation/NavigationReducer';
import dishReducer from './dish/DishReducer';
import multipleDishesDialogReducer from './course_type/multiple_dishes_dialog/MultipleDishesDialogReducer';
import quotationReducer from './quotation/QuotationReducer';

const SLICE_NAME = 'QUOTATIONS';

const quotationsState = window?.sessionStorage?.getItem('quotationsState');
const defaultValues = quotationsState ? JSON.parse(quotationsState) : {
  selectedTab: 0,
  isMenuDialogOpen: false,
};

const resetData = (state, action) => {
  state.selectedTab = 0;
  state.isMenuDialogOpen = false;
  state.isAuthDialogOpen = authDialogReducer(undefined, action);
  state.navigation = navigationReducer(undefined, action);
  state.dish = dishReducer(undefined, action);
  state.multipleDishesDialog = multipleDishesDialogReducer(undefined, action);
  state.quotation = quotationReducer(undefined, action);
};

const quotationsSlice = createSlice({
  name: SLICE_NAME,
  initialState: defaultValues,
  reducers: {
    changeMenuTab(state, {payload: tab}) {
      state.selectedTab = tab;
    },
    changeMenuDialogOpen(state, {payload: isMenuDialogOpen}) {
      state.isMenuDialogOpen = isMenuDialogOpen;
    },
    deleteLocal(state, action) {
      resetData(state, action);
    },
  },
  extraReducers: builder => {
    return builder
      .addCase(logout, resetData)
      .addDefaultCase((state, action) => {
        state.isAuthDialogOpen = authDialogReducer(state.isAuthDialogOpen, action);
        state.navigation = navigationReducer(state.navigation, action);
        state.dish = dishReducer(state.dish, action);
        state.multipleDishesDialog = multipleDishesDialogReducer(state.multipleDishesDialog, action);
        state.quotation = quotationReducer(state.quotation, action);
      });
  },
});

export default quotationsSlice.reducer;
export const {changeMenuTab, changeMenuDialogOpen, deleteLocal} = quotationsSlice.actions;