/**
 * This special reducer collect all reduces that store data from Backend
 *
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
import {courseTypes, courseTypesFetching} from './course_types/CourseTypesReducer';
import {dishes, dishesFetching, dishFetching} from './dishes/DishesReducer';
import {
  quotations,
  quotationsError,
  quotationsFetching,
  quotationsMetaData,
  quotationsUpdateFetching,
} from './quotations/QuotationsReducer';
import {ACTION_TYPES} from './DataActions';

const dataState = window.localStorage ? window.localStorage.getItem('dataState') : null;
const defaultValues = dataState ? JSON.parse(dataState) : {};

const version = (state = null, action) => {
  switch (action.type) {
    case ACTION_TYPES.DATA_CHANGE_VERSION:
      return action.payload.version;
    default:
      return state;
  }
};

const fetching = (state = {}, action) => {
  return {
    courseTypes: courseTypesFetching(state.courseTypes, action),
    dishes: dishesFetching(state.dishes, action),
    dish: dishFetching(state.dish, action),
    quotations: quotationsFetching(state.quotations, action),
    quotationsUpdate: quotationsUpdateFetching(state.quotationsUpdate, action),
  };
};

const errors = (state = {}, action) => {
  return {
    quotations: quotationsError(state.quotations, action),
  };
};

const metaData = (state = {}, action) => {
  return {
    quotations: quotationsMetaData(state.quotations, action),
  };
};

export default (state = defaultValues, action = {}) => {
  return {
    version: version(state.version, action),
    fetching: fetching(state.fetching, action),
    errors: errors(state.errors, action),
    metaData: metaData(state.metaData, action),
    courseTypes: courseTypes(state.courseTypes, action),
    dishes: dishes(state.dishes, action),
    quotations: quotations(state.quotations, action),
  };
};