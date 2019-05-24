/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  DISH_FILTER_CLEAN_ALL: null,
  DISH_FILTER_SEARCH: null,
  DISH_FILTER_SORT: null,
  DISH_FILTER_SET_CATEGORIES: null,
  DISH_FILTER_ADD_CATEGORY: null,
  DISH_FILTER_REMOVE_CATEGORY: null,
});

export default class DishFilterActions {
  static cleanFilters() {
    return {
      type: ACTION_TYPES.DISH_FILTER_CLEAN_ALL,
    };
  }

  static changeSearch(search) {
    return {
      type: ACTION_TYPES.DISH_FILTER_SEARCH,
      payload: {
        search,
      },
    };
  }

  static changeSort(sort) {
    return {
      type: ACTION_TYPES.DISH_FILTER_SORT,
      payload: {
        sort,
      },
    };
  }

  static setCategories(categories) {
    return {
      type: ACTION_TYPES.DISH_FILTER_SET_CATEGORIES,
      payload: {
        categories,
      },
    };
  }

  static addCategory(category) {
    return {
      type: ACTION_TYPES.DISH_FILTER_ADD_CATEGORY,
      payload: {
        category,
      },
    };
  }

  static removeCategory(category) {
    return {
      type: ACTION_TYPES.DISH_FILTER_REMOVE_CATEGORY,
      payload: {
        category,
      },
    };
  }
}