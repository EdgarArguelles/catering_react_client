import {useDispatch, useSelector} from 'react-redux';
import {useQuery, useQueryClient} from 'react-query';
import Api from 'app/common/Api';

export const useCourseTypes = () => {
  const KEY = 'CourseTypes';
  const CACHE = 'courseTypesCached';
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const isOnline = useSelector(state => state.app.isOnline);
  const cache = window.localStorage.getItem(CACHE);
  const courseTypesCached = cache ? JSON.parse(cache) : undefined;
  return useQuery(KEY, async () => {
    const body = {query: '{activeCourseTypes {id name picture position status}}'};
    const json = await Api.graphql(dispatch, body);
    const courseTypes = json.data.activeCourseTypes;
    window.localStorage.setItem(CACHE, JSON.stringify(courseTypes));
    return courseTypes;
  }, {
    retry: 5,
    retryDelay: 0,
    initialData: isOnline ? undefined : courseTypesCached,
    onError: () => {
      if (courseTypesCached) {
        queryClient.setQueryData(KEY, courseTypesCached);
      }
    },
  });
};

export const useDBVersion = courseTypes => {
  const KEY = 'DBVersion';
  const CACHE = 'versionCached';
  const dispatch = useDispatch();
  const dataVersion = parseInt(window.localStorage.getItem(CACHE), 10);
  return useQuery(KEY, async () => {
    const body = {query: '{version {version}}'};
    const json = await Api.graphql(dispatch, body);
    const version = json.data.version.version;
    if (version !== dataVersion) {
      window.localStorage.setItem(CACHE, version);
      // TODO: clean dishes from window.localStorage
    }
    return version;
  }, {enabled: !!courseTypes});
};