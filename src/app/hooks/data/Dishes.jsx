import {useDispatch} from 'react-redux';
import {useQueries, useQuery, useQueryClient} from 'react-query';
import Api from 'app/common/Api';

const DISH_KEY = 'Dish';
const CACHE = 'dishesCached';
const FIELDS = 'id name description picture price status categories{name}';

const getCache = () => {
  const cache = window.localStorage.getItem(CACHE);
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
  const KEY = ['ActiveDishes', courseTypeId];
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useQuery(KEY, async () => {
    const body = {query: `{courseType(id: ${courseTypeId}) {activeDishes{${FIELDS}}}}`};
    const json = await Api.graphql(dispatch, body);
    const dishes = json.data.courseType.activeDishes.map(dish => ({...dish, courseTypeId}));
    addDishesCache(dishes);
    return dishes;
  }, {
    initialData: getActiveDishesCacheByCourseType(courseTypeId),
    enabled: !!courseTypeId,
    onError: () => {
      const cache = getActiveDishesCacheByCourseType(courseTypeId);
      cache && queryClient.setQueryData(KEY, cache);
    },
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
  const queryClient = useQueryClient();
  return useQuery(KEY, fetchDishById(dishId, dispatch), {
    initialData: getDishCache(dishId),
    enabled: !!dishId,
    onError: () => {
      const cache = getDishCache(dishId);
      cache && queryClient.setQueryData(KEY, cache);
    },
  });
};

export const useDishesByIds = dishesId => {
  const dispatch = useDispatch();
  const toFetch = [...new Set(dishesId.filter(dishId => dishId))]; // remove invalid and duplicated entries
  return useQueries(toFetch.map(dishId => {
    const cache = getDishCache(dishId);
    return {
      queryKey: [DISH_KEY, dishId],
      queryFn: cache ? () => cache : fetchDishById(dishId, dispatch),
    };
  }));
};