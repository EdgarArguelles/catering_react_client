/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';
import Api from '../../common/Api';

export const ACTION_TYPES = keyMirror({
  FETCH_DISHES_REQUEST: null,
  FETCH_DISHES_SUCCESS: null,
  FETCH_DISHES_ERROR: null,
  FETCH_DISH_REQUEST: null,
  FETCH_DISH_SUCCESS: null,
  FETCH_DISH_ERROR: null,
});

const FIELDS = 'id name description picture price status categories{name}';

export default class DishesActions {
  static fetchDishes(courseTypeId) {
    const body = {query: `{courseType(id: ${courseTypeId}) {activeDishes{${FIELDS}}}}`};

    return async dispatch => {
      try {
        dispatch({type: ACTION_TYPES.FETCH_DISHES_REQUEST});
        const json = await Api.graphql(dispatch, body);
        dispatch({
          type: ACTION_TYPES.FETCH_DISHES_SUCCESS,
          payload: {
            courseTypeId,
            data: json.data.courseType.activeDishes,
          },
        });
        return json;
      } catch (error) {
        dispatch({
          type: ACTION_TYPES.FETCH_DISHES_ERROR,
          error: true,
          payload: error,
        });
        throw error;
      }
    };
  }

  static fetchDish(dishId) {
    const body = {query: `{dish(id: ${dishId}) {${FIELDS}}}`};

    return async dispatch => {
      try {
        dispatch({type: ACTION_TYPES.FETCH_DISH_REQUEST, payload: {dishId}});
        const json = await Api.graphql(dispatch, body);
        dispatch({
          type: ACTION_TYPES.FETCH_DISH_SUCCESS,
          payload: {
            dishId,
            data: json.data.dish,
          },
        });
        return json;
      } catch (error) {
        dispatch({
          type: ACTION_TYPES.FETCH_DISH_ERROR,
          error: true,
          payload: {dishId, error},
        });
        throw error;
      }
    };
  }
}