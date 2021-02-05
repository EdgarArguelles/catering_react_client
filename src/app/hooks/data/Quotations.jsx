import {useDispatch, useSelector} from 'react-redux';
import {useInfiniteQuery, useQuery} from 'react-query';
import Api from 'app/common/Api';
import Utils from 'app/common/Utils';

export const QUOTATIONS_KEY = 'Quotations';

export const useQuotation = quotationId => {
  const KEY = ['Quotation', quotationId];
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.loggedUser);
  return useQuery(KEY, async () => {
    const FIELDS = 'id name createdAt price menus{id name quantity courses{id position type{id} dishes{id price}}}';
    const body = {query: `{quotation(id: ${quotationId}) {${FIELDS}}}`};
    const json = await Api.graphql(dispatch, body);
    return json.data.quotation;
  }, {enabled: !!quotationId && !!loggedUser});
};

export const useQuotations = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const DEFAULT_PAGE_PARAM = {page: 0, size: 5, sort: ['createdAt'], direction: 'DESC'};
  const results = useInfiniteQuery(QUOTATIONS_KEY, async ({pageParam = DEFAULT_PAGE_PARAM}) => {
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