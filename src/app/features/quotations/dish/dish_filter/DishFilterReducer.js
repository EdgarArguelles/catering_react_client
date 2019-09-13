/**
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
import {ACTION_TYPES} from './DishFilterActions';

const isDialogOpen = (state = false, action) => {
  switch (action.type) {
    case ACTION_TYPES.DISH_FILTER_DIALOG_OPEN:
      return true;
    case ACTION_TYPES.DISH_FILTER_DIALOG_CLOSE:
      return false;
    default:
      return state;
  }
};

const search = (state = '', action) => {
  switch (action.type) {
    case ACTION_TYPES.DISH_FILTER_CLEAN_ALL:
      return '';
    case ACTION_TYPES.DISH_FILTER_SEARCH:
      return action.payload.search;
    default:
      return state;
  }
};

const sort = (state = 'name', action) => {
  switch (action.type) {
    case ACTION_TYPES.DISH_FILTER_CLEAN_ALL:
      return 'name';
    case ACTION_TYPES.DISH_FILTER_SORT:
      return action.payload.sort;
    default:
      return state;
  }
};

const categories = (state = null, action) => {
  switch (action.type) {
    case ACTION_TYPES.DISH_FILTER_CLEAN_ALL:
      return null;
    case ACTION_TYPES.DISH_FILTER_SET_CATEGORIES:
      return action.payload.categories;
    case ACTION_TYPES.DISH_FILTER_ADD_CATEGORY:
      return [...state, action.payload.category];
    case ACTION_TYPES.DISH_FILTER_REMOVE_CATEGORY:
      return state.filter(category => category !== action.payload.category);
    default:
      return state;
  }
};

export default (state = {}, action = {}) => {
  return {
    isDialogOpen: isDialogOpen(state.isDialogOpen, action),
    search: search(state.search, action),
    sort: sort(state.sort, action),
    categories: categories(state.categories, action),
  };
};