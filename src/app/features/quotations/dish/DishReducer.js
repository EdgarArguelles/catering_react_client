/**
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
import {ACTION_TYPES} from './DishActions';
import filter from './dish_filter/DishFilterReducer';

const selected = (state = '', action) => {
  switch (action.type) {
    case ACTION_TYPES.SELECT_DISH:
      return action.payload.dishId;
    default:
      return state;
  }
};

const showActions = (state = true, action) => {
  switch (action.type) {
    case ACTION_TYPES.SELECT_DISH:
      return action.payload.showActions;
    default:
      return state;
  }
};

export default (state = {}, action = {}) => {
  return {
    selected: selected(state.selected, action),
    showActions: showActions(state.showActions, action),
    filter: filter(state.filter, action),
  };
};