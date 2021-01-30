import {useDispatch, useSelector} from 'react-redux';
import {useQuery, useQueryClient} from 'react-query';
import Api from 'app/common/Api';
import {ACTIVE_DISHES_KEY, CACHE as DISH_CACHE, DISH_KEY} from 'app/hooks/data/Dishes';

export const useCourseTypes = () => {
  const KEY = 'CourseTypes';
  const CACHE = 'courseTypesCached';
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const isOnline = useSelector(state => state.app.isOnline);
  const getCache = () => {
    const cache = window.localStorage.getItem(CACHE);
    return cache ? JSON.parse(cache) : undefined;
  };

  return useQuery(KEY, async () => {
    const body = {query: '{activeCourseTypes {id name picture position status}}'};
    const json = await Api.graphql(dispatch, body);
    const courseTypes = json.data.activeCourseTypes;
    window.localStorage.setItem(CACHE, JSON.stringify(courseTypes));
    return courseTypes;
  }, {
    retry: 5,
    retryDelay: 0,
    initialData: isOnline ? undefined : getCache(),
    onError: () => {
      const cache = getCache();
      cache && queryClient.setQueryData(KEY, cache);
    },
  });
};

export const useDBVersion = courseTypes => {
  const KEY = 'DBVersion';
  const CACHE = 'versionCached';
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useQuery(KEY, async () => {
    const body = {query: '{version {version}}'};
    const json = await Api.graphql(dispatch, body);
    const version = json.data.version.version;
    if (version !== parseInt(window.localStorage.getItem(CACHE), 10)) {
      window.localStorage.setItem(CACHE, version);
      window.localStorage.removeItem(DISH_CACHE);
      queryClient.removeQueries(ACTIVE_DISHES_KEY);
      queryClient.removeQueries(DISH_KEY);
    }
    return version;
  }, {enabled: !!courseTypes});
};