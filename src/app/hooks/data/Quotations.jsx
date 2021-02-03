import {useDispatch, useSelector} from 'react-redux';
import {useInfiniteQuery} from 'react-query';
import Api from 'app/common/Api';
import Utils from 'app/common/Utils';

export const useQuotations = () => {
  const KEY = 'Quotations';
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const DEFAULT_PAGE_PARAM = {page: 0, size: 5, sort: ['createdAt'], direction: 'DESC'};
  const results = useInfiniteQuery(KEY, async ({pageParam = DEFAULT_PAGE_PARAM}) => {
    const FIELDS = 'totalElements totalPages content{id name createdAt price}';
    const body = {query: `{quotationPage(pageDataRequest: ${Utils.stringifyPageDataRequest(pageParam)}) {${FIELDS}}}`};
    const json = await Api.graphql(dispatch, body);
    const {content, totalElements, totalPages} = json.data.quotationPage;
    return {
      quotations: content,
      metaData: {pagination: {...pageParam}, totalElements, totalPages},
    };
  }, {
    enabled: !!loggedUser,
    getNextPageParam: ({metaData: {pagination, totalPages}}) =>
      pagination.page + 1 < totalPages ? {...pagination, page: pagination.page + 1} : undefined,
  });
  const quotations = results.data?.pages.map((page => page.quotations)).flat();
  const metaData = results.data?.pages.map((page => page.metaData)).pop();
  return {...results, quotations, metaData};
};