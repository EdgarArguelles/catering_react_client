/**
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
import Utils from 'app/common/Utils';
import {ACTION_TYPES} from './CourseTypesActions';

export const courseTypesFetching = (state = false, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_COURSE_TYPES_REQUEST:
      return true;
    case ACTION_TYPES.FETCH_COURSE_TYPES_SUCCESS:
    case ACTION_TYPES.FETCH_COURSE_TYPES_ERROR:
      return false;
    default:
      return state;
  }
};

export const courseTypes = (state = null, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.SET_COURSE_TYPES:
      return action.payload.courseTypes;
    case ACTION_TYPES.FETCH_COURSE_TYPES_SUCCESS:
      return Utils.arrayToObject(action.payload.data);
    default:
      return state;
  }
};