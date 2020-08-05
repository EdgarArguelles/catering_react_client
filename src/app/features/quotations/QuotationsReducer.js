import {createSlice} from '@reduxjs/toolkit';
import Utils from 'app/common/Utils';
import {logout} from 'app/features/auth/AuthReducer';
import {createQuotation, deleteQuotation, editQuotation} from 'app/data/quotations/QuotationsReducer';
import authDialogReducer from './auth_dialog/AuthDialogReducer';
import navigationReducer from './header/navigation/NavigationReducer';
import dishReducer from './dish/DishReducer';
import multipleDishesDialogReducer from './course_type/multiple_dishes_dialog/MultipleDishesDialogReducer';
import quotationReducer from './quotation/QuotationReducer';

const SLICE_NAME = 'QUOTATIONS';

const quotationsState = window.sessionStorage ? window.sessionStorage.getItem('quotationsState') : null;
const defaultValues = quotationsState ? JSON.parse(quotationsState) : {
  isRemoteProcessing: false,
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
    endRemoteProcess(state) {
      state.isRemoteProcessing = false;
    },
  },
  extraReducers: builder => {
    return builder
      .addCase(logout, resetData)
      .addMatcher(Utils.anyMatcher(
        createQuotation.pending.type,
        editQuotation.pending.type,
        deleteQuotation.pending.type,
      ), state => {
        state.isRemoteProcessing = true;
      })
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
export const {changeMenuTab, changeMenuDialogOpen, deleteLocal, endRemoteProcess} = quotationsSlice.actions;