/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  CHANGE_IS_MULTIPLE_DISHES_DIALOG_OPEN: null,
  CLEAN_MULTIPLE_DISHES_DISHES: null,
  ADD_MULTIPLE_DISHES_DISH: null,
  REMOVE_MULTIPLE_DISHES_DISH: null,
});

export default class MultipleDishesDialogActions {
  static openDialog() {
    return {
      type: ACTION_TYPES.CHANGE_IS_MULTIPLE_DISHES_DIALOG_OPEN,
      payload: {
        isMultipleDishesDialogOpen: true,
      },
    };
  }

  static closeDialog() {
    return {
      type: ACTION_TYPES.CHANGE_IS_MULTIPLE_DISHES_DIALOG_OPEN,
      payload: {
        isMultipleDishesDialogOpen: false,
      },
    };
  }

  static cleanDishes() {
    return {type: ACTION_TYPES.CLEAN_MULTIPLE_DISHES_DISHES};
  }

  static addDish(dishId) {
    return {
      type: ACTION_TYPES.ADD_MULTIPLE_DISHES_DISH,
      payload: {
        dishId,
      },
    };
  }

  static removeDish(dishId) {
    return {
      type: ACTION_TYPES.REMOVE_MULTIPLE_DISHES_DISH,
      payload: {
        dishId,
      },
    };
  }
}