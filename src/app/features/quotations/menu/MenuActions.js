/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  MENU_CHANGE_NAME: null,
  MENU_CHANGE_QUANTITY: null,
  MENU_ADD_COURSE: null,
  MENU_REMOVE_COURSE: null,
  MENU_INCREASE_PRICE: null,
  MENU_DECREASE_PRICE: null,
  MENU_CHANGE_COURSES_POSITION: null,
});

export default class MenuActions {
  static changeName(name) {
    return {
      type: ACTION_TYPES.MENU_CHANGE_NAME,
      payload: {
        name,
      },
    };
  }

  static changeQuantity(quantity) {
    return {
      type: ACTION_TYPES.MENU_CHANGE_QUANTITY,
      payload: {
        quantity,
      },
    };
  }

  static addCourse(courseTypeId, dishesIds, position) {
    return {
      type: ACTION_TYPES.MENU_ADD_COURSE,
      payload: {
        courseTypeId,
        dishesIds,
        position,
      },
    };
  }

  static removeCourse(courseTypeId, position) {
    return {
      type: ACTION_TYPES.MENU_REMOVE_COURSE,
      payload: {
        courseTypeId,
        position,
      },
    };
  }

  static increasePrice(amount) {
    return {
      type: ACTION_TYPES.MENU_INCREASE_PRICE,
      payload: {
        amount,
      },
    };
  }

  static decreasePrice(amount) {
    return {
      type: ACTION_TYPES.MENU_DECREASE_PRICE,
      payload: {
        amount,
      },
    };
  }

  static changeCoursesPosition(newCourses) {
    return {
      type: ACTION_TYPES.MENU_CHANGE_COURSES_POSITION,
      payload: {
        newCourses,
      },
    };
  }
}