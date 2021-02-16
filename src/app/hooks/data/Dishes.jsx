import {useDispatch} from 'react-redux';
import {useQueries, useQuery, useQueryClient} from 'react-query';
import Api from 'app/common/Api';

export const DISH_KEY = 'Dish';
export const ACTIVE_DISHES_KEY = 'ActiveDishes';
export const CACHE = 'dishesCached';
const FIELDS = 'id name description picture price status categories{name}';

const getCache = () => {
  const cache = window?.localStorage?.getItem(CACHE);
  return cache ? JSON.parse(cache) : [];
};

const getActiveDishesCacheByCourseType = courseTypeId => {
  const cache = getCache();
  const filter = cache.filter(dish => dish.courseTypeId === courseTypeId && dish.status > 0);
  return filter.length ? filter : undefined;
};

const getDishCache = dishId => {
  const cache = getCache();
  const found = cache.find(dish => dish.id === dishId);
  return found ? found : undefined;
};

const addDishesCache = newDishes => {
  const cache = getCache();
  const newIds = newDishes.map(dish => dish.id);
  const oldData = cache.filter(dish => !newIds.includes(dish.id));
  window.localStorage.setItem(CACHE, JSON.stringify([...oldData, ...newDishes]));
};

const addDishCache = newDish => {
  const cache = getCache();
  const found = cache.find(dish => dish.id === newDish.id);
  !found && window.localStorage.setItem(CACHE, JSON.stringify([...cache, newDish]));
};

export const useActiveDishesByCourseType = courseTypeId => {
  const KEY = [ACTIVE_DISHES_KEY, courseTypeId];
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useQuery(KEY, async () => {
    const body = {query: `{courseType(id: ${courseTypeId}) {activeDishes{${FIELDS}}}}`};
    const json = await Api.graphql(dispatch, body);
    const dishes = json.data.courseType.activeDishes.map(dish => ({...dish, courseTypeId}));
    addDishesCache(dishes);
    queryClient.removeQueries(DISH_KEY);
    return dishes;
  }, {
    initialData: getActiveDishesCacheByCourseType(courseTypeId),
    enabled: !!courseTypeId,
  });
};

const fetchDishById = (dishId, dispatch) => async () => {
  const body = {query: `{dish(id: ${dishId}) {${FIELDS}}}`};
  const json = await Api.graphql(dispatch, body);
  const dish = json.data.dish;
  addDishCache(dish);
  return dish;
};

export const useDish = dishId => {
  const KEY = [DISH_KEY, dishId];
  const dispatch = useDispatch();
  return useQuery(KEY, fetchDishById(dishId, dispatch), {
    initialData: getDishCache(dishId),
    enabled: !!dishId,
  });
};

export const useDishesByIds = (dishesId = []) => {
  const dispatch = useDispatch();
  const toFetch = [...new Set(dishesId.filter(dishId => dishId))]; // remove invalid and duplicated entries
  const results = useQueries(toFetch.map(dishId => {
    const cache = getDishCache(dishId);
    return {
      queryKey: [DISH_KEY, dishId],
      queryFn: cache ? () => cache : fetchDishById(dishId, dispatch),
    };
  }));
  const dishes = results.filter(result => result.data).map(result => result.data);
  const isAnyFetching = !!results.filter(result => result.isFetching).length;
  return {dishes, isAnyFetching};
};