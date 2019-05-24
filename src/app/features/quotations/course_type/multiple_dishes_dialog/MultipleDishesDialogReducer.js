/**
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
import {ACTION_TYPES} from './MultipleDishesDialogActions';

const isMultipleDishesDialogOpen = (state = false, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_IS_MULTIPLE_DISHES_DIALOG_OPEN:
      return action.payload.isMultipleDishesDialogOpen;
    default:
      return state;
  }
};

const dishes = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.CLEAN_MULTIPLE_DISHES_DISHES:
      return [];
    case ACTION_TYPES.ADD_MULTIPLE_DISHES_DISH:
      return [...state, {id: action.payload.dishId}];
    case ACTION_TYPES.REMOVE_MULTIPLE_DISHES_DISH:
      return state.filter(dish => dish.id !== action.payload.dishId);
    default:
      return state;
  }
};

export default (state = {}, action = {}) => {
  return {
    isMultipleDishesDialogOpen: isMultipleDishesDialogOpen(state.isMultipleDishesDialogOpen, action),
    dishes: dishes(state.dishes, action),
  };
};