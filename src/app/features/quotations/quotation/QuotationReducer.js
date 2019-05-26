/**
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
import {ACTION_TYPES as DATA_ACTION_TYPES} from 'app/data/quotations/QuotationsActions';
import {ACTION_TYPES} from './QuotationActions';
import menuReducer from 'app/features/quotations/menu/MenuReducer';

const name = (state = '', action) => {
  switch (action.type) {
    case ACTION_TYPES.QUOTATION_CHANGE_NAME:
      return action.payload.name;
    default:
      return state;
  }
};

const menus = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.QUOTATION_ADD_NEW_MENU:
      return [...state, menuReducer({id: action.payload.menuId}, action)];
    case ACTION_TYPES.QUOTATION_ADD_MENU:
      return [...state, action.payload.menu];
    case ACTION_TYPES.QUOTATION_REMOVE_MENU:
      return state.filter(menu => menu.id !== action.payload.menuId);
    case ACTION_TYPES.QUOTATION_SELECT_MENU:
      return state.map(menu => ({...menu, isSelected: menu.id === action.payload.menuId}));
    default:
      const selected = state.find(menu => menu.isSelected);
      if (!selected) {
        return state;
      }

      const noSelected = state.filter(menu => !menu.isSelected);
      return [...noSelected, menuReducer(selected, action)];
  }
};

const price = (state = 0, action) => {
  switch (action.type) {
    case ACTION_TYPES.QUOTATION_SET_PRICE:
      return action.payload.amount;
    default:
      return state;
  }
};

export default (state = {}, action = {}) => {
  switch (action.type) {
    case DATA_ACTION_TYPES.QUOTATION_OVERWRITE_LOCAL:
    case ACTION_TYPES.QUOTATION_REVERT:
      return {
        ...action.payload.data,
        menus: action.payload.data.menus.map(menu => ({
          ...menu,
          price: menu.courses.reduce(
            (accumulator, course) => accumulator + course.dishes.reduce((sum, dish) => sum + dish.price, 0),
            0,
          ),
        })),
      };
    default:
      return {
        ...state,
        name: name(state.name, action),
        menus: menus(state.menus, action),
        price: price(state.price, action),
      };
  }
};