/**
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
import {ACTION_TYPES} from './MenuActions';

const name = (state = '', action) => {
  switch (action.type) {
    case ACTION_TYPES.MENU_CHANGE_NAME:
      return action.payload.name;
    default:
      return state;
  }
};

const quantity = (state = 1, action) => {
  switch (action.type) {
    case ACTION_TYPES.MENU_CHANGE_QUANTITY:
      return action.payload.quantity;
    default:
      return state;
  }
};

const price = (state = 0, action) => {
  switch (action.type) {
    case ACTION_TYPES.MENU_INCREASE_PRICE:
      return state + action.payload.amount;
    case ACTION_TYPES.MENU_DECREASE_PRICE:
      return state - action.payload.amount;
    default:
      return state;
  }
};

const dishes = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.MENU_ADD_COURSE:
      return [...state, ...action.payload.dishesIds.map(id => {
        return {id};
      })];
    default:
      return state;
  }
};

const courses = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.MENU_ADD_COURSE:
      return [...state, {
        position: action.payload.position,
        type: {id: action.payload.courseTypeId},
        dishes: dishes([], action),
      }];
    case ACTION_TYPES.MENU_REMOVE_COURSE:
      const newState = state.filter(c => c.type.id !== action.payload.courseTypeId);
      let decrement = 0;
      state.filter(c => c.type.id === action.payload.courseTypeId).sort((a, b) => a.position - b.position)
        .forEach(course => {
          if (course.position === action.payload.position) {
            decrement = 1;
            return;
          }

          newState.push({...course, position: course.position - decrement});
        });
      return newState;
    case ACTION_TYPES.MENU_CHANGE_COURSES_POSITION:
      const courseTypeId = action.payload.newCourses[0] ? action.payload.newCourses[0].type.id : undefined;
      const noSortedState = state.filter(c => c.type.id !== courseTypeId);
      return [...noSortedState, ...action.payload.newCourses];
    default:
      return state;
  }
};

export default (state = {}, action = {}) => {
  return {
    ...state,
    name: name(state.name, action),
    quantity: quantity(state.quantity, action),
    price: price(state.price, action),
    courses: courses(state.courses, action),
  };
};