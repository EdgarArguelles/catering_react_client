/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  SELECT_DISH: null,
});

export default class DishActions {
  static selectDish(dishId, showActions = true) {
    return {
      type: ACTION_TYPES.SELECT_DISH,
      payload: {
        dishId,
        showActions,
      },
    };
  }
}