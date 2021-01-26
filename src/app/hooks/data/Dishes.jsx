import {useDispatch, useSelector} from 'react-redux';
import {useQuery, useQueryClient} from 'react-query';
import Api from 'app/common/Api';

const CACHE = 'dishesCached';
const FIELDS = 'id name description picture price status categories{name}';

const getCache = () => {
  const cache = window.localStorage.getItem(CACHE);
  return cache ? JSON.parse(cache) : undefined;
};

const getActiveDishesCacheByCourseType = courseTypeId => {
  const cache = getCache();
  return cache ? cache.filter(dish => dish.courseTypeId === courseTypeId && dish.status > 0) : undefined;
};

const addDishesCache = (courseTypeId, newDishes) => {
  const cache = getCache();
  const oldData = cache ? cache.filter(dish => dish.courseTypeId !== courseTypeId) : [];
  window.localStorage.setItem(CACHE, JSON.stringify([...oldData, ...newDishes]));
};

/* const addDishCache = (dishId, newDish) => {
  // TODO: uncomment
  const cache = getCache();
  const oldData = cache ? cache.filter(dish => dish.id !== dishId) : [];
  window.localStorage.setItem(CACHE, JSON.stringify([...oldData, newDish]));
}; */

export const useActiveDishesByCourseType = courseTypeId => {
  const KEY = ['ActiveDishes', courseTypeId];
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const isOnline = useSelector(state => state.app.isOnline);
  const setQueryData = () => {
    const cache = getActiveDishesCacheByCourseType(courseTypeId);
    cache && cache.length > 0 && queryClient.setQueryData(KEY, cache);
  };

  return useQuery(KEY, async () => {
    const body = {query: `{courseType(id: ${courseTypeId}) {activeDishes{${FIELDS}}}}`};
    const json = await Api.graphql(dispatch, body);
    const dishes = json.data.courseType.activeDishes.map(dish => ({...dish, courseTypeId}));
    addDishesCache(courseTypeId, dishes);
    return dishes;
  }, {
    retry: 5,
    retryDelay: 0,
    initialData: isOnline ? undefined : getActiveDishesCacheByCourseType(courseTypeId),
    enabled: !!courseTypeId,
    onError: setQueryData,
  });
};