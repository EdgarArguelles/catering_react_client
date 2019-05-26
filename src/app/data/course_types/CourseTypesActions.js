/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';
import Api from 'app/common/Api';

export const ACTION_TYPES = keyMirror({
  SET_COURSE_TYPES: null,
  FETCH_COURSE_TYPES_REQUEST: null,
  FETCH_COURSE_TYPES_SUCCESS: null,
  FETCH_COURSE_TYPES_ERROR: null,
});

export default class CourseTypesActions {
  static setCourseTypes(courseTypes) {
    return {
      type: ACTION_TYPES.SET_COURSE_TYPES,
      payload: {
        courseTypes,
      },
    };
  }

  static fetchCourseTypes() {
    const body = {query: '{activeCourseTypes {id name picture position status}}'};
    const versionBody = {query: '{version {version}}'};

    return async dispatch => {
      try {
        dispatch({type: ACTION_TYPES.FETCH_COURSE_TYPES_REQUEST});
        const versionJson = await Api.graphql(dispatch, versionBody);
        const json = await Api.graphql(dispatch, body);
        dispatch({
          type: ACTION_TYPES.FETCH_COURSE_TYPES_SUCCESS,
          payload: {
            data: json.data.activeCourseTypes,
          },
        });
        return {...json, metaData: {version: versionJson.data.version.version}};
      } catch (error) {
        dispatch({
          type: ACTION_TYPES.FETCH_COURSE_TYPES_ERROR,
          error: true,
          payload: error,
        });
        throw error;
      }
    };
  }
}