/**
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
import Utils from 'app/common/Utils';
import {ACTION_TYPES as DATA_ACTION_TYPES} from 'app/data/DataActions';
import {ACTION_TYPES} from './DishesActions';

export const dishesFetching = (state = false, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_DISHES_REQUEST:
      return true;
    case ACTION_TYPES.FETCH_DISHES_SUCCESS:
    case ACTION_TYPES.FETCH_DISHES_ERROR:
      return false;
    default:
      return state;
  }
};

export const dishFetching = (state = {}, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_DISH_REQUEST:
      return {...state, [action.payload.dishId]: true};
    case ACTION_TYPES.FETCH_DISH_SUCCESS:
    case ACTION_TYPES.FETCH_DISH_ERROR:
      const newState = {...state};
      delete newState[action.payload.dishId];
      return newState;
    default:
      return state;
  }
};

export const dishes = (state = null, action = {}) => {
  switch (action.type) {
    case DATA_ACTION_TYPES.DATA_CHANGE_VERSION:
      return null;
    case ACTION_TYPES.FETCH_DISHES_SUCCESS:
      const oldData = state ? Object.values(state).filter(d => d.courseTypeId !== action.payload.courseTypeId) : [];
      const newData = action.payload.data.map(dish => ({...dish, courseTypeId: action.payload.courseTypeId}));
      return Utils.arrayToObject([...oldData, ...newData]);
    case ACTION_TYPES.FETCH_DISH_SUCCESS:
      return state && state[action.payload.data.id] ? state
        : {...state, ...Utils.arrayToObject([action.payload.data])};
    default:
      return state;
  }
};