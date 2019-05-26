/**
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
import {ACTION_TYPES as AUTH_ACTION_TYPES} from 'app/features/auth/AuthActions';
import {ACTION_TYPES as DATA_ACTION_TYPES} from 'app/data/quotations/QuotationsActions';
import {ACTION_TYPES} from './QuotationsActions';
import {isAuthDialogOpen} from './auth_dialog/AuthDialogReducer';
import navigation from './header/navigation/NavigationReducer';
import dish from './dish/DishReducer';
import multipleDishesDialog from './course_type/multiple_dishes_dialog/MultipleDishesDialogReducer';
import quotation from './quotation/QuotationReducer';

const quotationsState = window.sessionStorage ? window.sessionStorage.getItem('quotationsState') : null;
const defaultValues = quotationsState ? JSON.parse(quotationsState) : {};

const isRemoteProcessing = (state = false, action) => {
  switch (action.type) {
    case DATA_ACTION_TYPES.CREATE_QUOTATIONS_REQUEST:
    case DATA_ACTION_TYPES.EDIT_QUOTATIONS_REQUEST:
    case DATA_ACTION_TYPES.DELETE_QUOTATIONS_REQUEST:
      return true;
    case ACTION_TYPES.QUOTATIONS_END_REMOTE_PROCESS:
      return false;
    default:
      return state;
  }
};

const selectedTab = (state = 0, action) => {
  switch (action.type) {
    case ACTION_TYPES.QUOTATIONS_CHANGE_MENU_TAB:
      return action.payload.tab;
    default:
      return state;
  }
};

const isMenuDialogOpen = (state = false, action) => {
  switch (action.type) {
    case ACTION_TYPES.QUOTATIONS_CHANGE_IS_MENU_DIALOG_OPEN:
      return action.payload.isMenuDialogOpen;
    default:
      return state;
  }
};

export default (state = defaultValues, action = {}) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.LOGOUT:
    case ACTION_TYPES.QUOTATIONS_DELETE_LOCAL:
      return {
        isRemoteProcessing: isRemoteProcessing(state.isRemoteProcessing, action),
        selectedTab: selectedTab(undefined, action),
        isMenuDialogOpen: isMenuDialogOpen(undefined, action),
        isAuthDialogOpen: isAuthDialogOpen(undefined, action),
        navigation: navigation(undefined, action),
        dish: dish(undefined, action),
        multipleDishesDialog: multipleDishesDialog(undefined, action),
        quotation: quotation(undefined, action),
      };
    default:
      return {
        isRemoteProcessing: isRemoteProcessing(state.isRemoteProcessing, action),
        selectedTab: selectedTab(state.selectedTab, action),
        isMenuDialogOpen: isMenuDialogOpen(state.isMenuDialogOpen, action),
        isAuthDialogOpen: isAuthDialogOpen(state.isAuthDialogOpen, action),
        navigation: navigation(state.navigation, action),
        dish: dish(state.dish, action),
        multipleDishesDialog: multipleDishesDialog(state.multipleDishesDialog, action),
        quotation: quotation(state.quotation, action),
      };
  }
};